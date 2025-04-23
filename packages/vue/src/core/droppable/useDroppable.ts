import type {Data} from '@dnd-kit/abstract';
import type {DroppableInput} from '@dnd-kit/dom';
import {Droppable} from '@dnd-kit/dom';
import {
  computed,
  MaybeRefOrGetter,
  shallowReadonly,
  shallowRef,
  toValue,
  watch,
  watchEffect,
} from 'vue';
import type {MaybeRefsOrGetters, MaybeElement} from '../../types.ts';
import {toValueDeep, unrefElement} from '@dnd-kit/vue/utilities';
import {useDeepSignal} from '@dnd-kit/vue/composables';
import {useDragDropManager} from '../composables/useDragDropManager.ts';

export interface UseDroppableInput<T extends Data = Data>
  extends MaybeRefsOrGetters<Omit<DroppableInput<T>, 'element'>> {
  element?: MaybeRefOrGetter<MaybeElement>;
}

export function useDroppable<T extends Data = Data>(
  input: UseDroppableInput<T>
) {
  const manager = useDragDropManager();

  const droppable = shallowRef(createDroppable());
  const trackedDroppable = useDeepSignal(droppable);

  watch(manager, () => {
    droppable.value = createDroppable();
  });

  watchEffect(() => {
    droppable.value.element = unrefElement(input.element) ?? undefined;

    droppable.value.id = toValue(input.id);
    droppable.value.accept = toValue(input.accept);
    droppable.value.type = toValue(input.type);
    droppable.value.disabled = toValue(input.disabled) ?? false;

    if (toValue(input.collisionDetector)) {
      droppable.value.collisionDetector = toValue(input.collisionDetector)!;
    }

    if (toValue(input.data)) {
      droppable.value.data = toValue(input.data)!;
    }
  });

  return {
    droppable: shallowReadonly(droppable),
    isDropTarget: computed(() => trackedDroppable.value.isDropTarget),
  };

  function createDroppable() {
    return new Droppable(
      {
        ...toValueDeep(input),
        element: unrefElement(input.element) ?? undefined,
      },
      manager.value
    );
  }
}

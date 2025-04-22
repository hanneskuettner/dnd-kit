import type {Data} from '@dnd-kit/abstract';
import type {DraggableInput} from '@dnd-kit/dom';
import {Draggable} from '@dnd-kit/dom';
import type {MaybeRefOrGetter} from 'vue';
import {
  computed,
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

export interface UseDraggableInput<T extends Data = Data>
  extends MaybeRefsOrGetters<
    Omit<DraggableInput<T>, 'effects' | 'handle' | 'element'>
  > {
  handle?: MaybeRefOrGetter<MaybeElement>;
  element?: MaybeRefOrGetter<MaybeElement>;
}

export function useDraggable<T extends Data = Data>(
  input: UseDraggableInput<T>
) {
  const manager = useDragDropManager();

  const draggable = shallowRef(createDraggable());
  const trackedDraggable = useDeepSignal(draggable);

  watch(manager, () => {
    draggable.value = createDraggable();
  });

  watchEffect(() => {
    draggable.value.element = unrefElement(input.element) ?? undefined;
    draggable.value.handle = unrefElement(input.handle) ?? undefined;

    draggable.value.id = toValue(input.id);
    draggable.value.disabled = toValue(input.disabled) ?? false;
    draggable.value.feedback = toValue(input.feedback) ?? 'default';
    draggable.value.alignment = toValue(input.alignment);
    draggable.value.modifiers = toValue(input.modifiers);
    draggable.value.sensors = toValue(input.sensors);

    if (toValue(input.data)) {
      draggable.value.data = toValue(input.data)!;
    }
  });

  return {
    draggable: shallowReadonly(draggable),
    isDragging: computed(() => trackedDraggable.value.isDragging),
    isDropping: computed(() => trackedDraggable.value.isDropping),
    isDragSource: computed(() => trackedDraggable.value.isDragSource),
  };

  function createDraggable() {
    return new Draggable(
      {
        ...toValueDeep(input),
        element: unrefElement(input.element) ?? undefined,
        handle: unrefElement(input.handle) ?? undefined,
      },
      manager.value
    );
  }
}

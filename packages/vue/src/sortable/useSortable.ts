import {type Data} from '@dnd-kit/abstract';
import type {SortableInput} from '@dnd-kit/dom/sortable';
import {defaultSortableTransition, Sortable} from '@dnd-kit/dom/sortable';
import {batch} from '@dnd-kit/state';
import {useDragDropManager} from '@dnd-kit/vue';
import {useDeepSignal} from '@dnd-kit/vue/composables';
import {toValueDeep, unrefElement} from '@dnd-kit/vue/utilities';
import {MaybeRefOrGetter, triggerRef} from 'vue';
import {
  computed,
  shallowReadonly,
  shallowRef,
  toValue,
  watch,
  watchEffect,
} from 'vue';
import type {MaybeElement, MaybeRefsOrGetters} from '../types.ts';

export interface UseSortableInput<T extends Data = Data>
  extends MaybeRefsOrGetters<
    Omit<SortableInput<T>, 'handle' | 'element' | 'source' | 'target'>
  > {
  handle?: MaybeRefOrGetter<MaybeElement>;
  element?: MaybeRefOrGetter<MaybeElement>;
  source?: MaybeRefOrGetter<MaybeElement>;
  target?: MaybeRefOrGetter<MaybeElement>;
}

export function useSortable<T extends Data = Data>(input: UseSortableInput<T>) {
  const manager = useDragDropManager();

  const sortable = shallowRef(createSortable());
  const trackedSortable = useDeepSignal(sortable);

  watch(manager, () => {
    sortable.value = createSortable();
  });

  watchEffect(() => {
    sortable.value.element = unrefElement(input.element);
    sortable.value.handle = unrefElement(input.handle);

    if (unrefElement(input.source)) {
      sortable.value.source = unrefElement(input.source);
    }
    if (unrefElement(input.target)) {
      sortable.value.target = unrefElement(input.target);
    }

    sortable.value.id = toValue(input.id);
    sortable.value.disabled = toValue(input.disabled) ?? false;
    sortable.value.feedback = toValue(input.feedback) ?? 'default';
    sortable.value.alignment = toValue(input.alignment);
    sortable.value.modifiers = toValue(input.modifiers);
    sortable.value.sensors = toValue(input.sensors);
    sortable.value.accept = toValue(input.accept);
    sortable.value.type = toValue(input.type);
    sortable.value.collisionPriority = toValue(input.collisionPriority);
    sortable.value.transition = {
      ...defaultSortableTransition,
      ...toValue(input.transition),
    };

    if (toValue(input.data)) {
      sortable.value.data = toValue(input.data)!;
    }
  });

  watch(
    [() => toValue(input.group), () => toValue(input.index), sortable],
    () => {
      batch(() => {
        sortable.value.group = toValue(input.group);
        sortable.value.index = toValue(input.index);
      });
    },
    {
      flush: 'post',
    }
  );

  watch(
    () => toValue(input.index),
    () => {
      if (
        sortable.value.manager?.dragOperation.status.idle &&
        sortable.value.transition?.idle
      ) {
        sortable.value.refreshShape();
      }
    },
    {
      immediate: true,
    }
  );

  return {
    sortable: shallowReadonly(sortable),
    isDragging: computed(() => trackedSortable.value.isDragging),
    isDropping: computed(() => trackedSortable.value.isDropping),
    isDragSource: computed(() => trackedSortable.value.isDragSource),
    isDropTarget: computed(() => trackedSortable.value.isDropTarget),
  };

  function createSortable() {
    const _input = toValueDeep(input);

    return new Sortable(
      {
        ..._input,
        transition: {...defaultSortableTransition, ..._input.transition},
        element: unrefElement(input.element),
        handle: unrefElement(input.handle),
        target: unrefElement(input.target),
      },
      manager.value
    );
  }
}

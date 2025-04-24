import {DragDropManager} from '@dnd-kit/dom';
import {ShallowRef} from 'vue';
import {createContext} from '../../utilities/index.ts';

export const [injectDragDropContext, provideDragDropContext] =
  createContext<ShallowRef<DragDropManager>>('DragDropProvider');

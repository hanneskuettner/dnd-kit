import draggableIcon from '../../assets/draggableIcon.svg';

export class DraggableIcon extends HTMLElement {
  connectedCallback() {
    // Only add img once to avoid duplication on re-attach/clone
    if (this.querySelector('img')) return;

    const img = document.createElement('img');
    img.src = draggableIcon;
    img.width = 140;
    img.alt = 'Draggable';
    img.draggable = false;
    img.style.pointerEvents = 'none';
    this.appendChild(img);
  }
}

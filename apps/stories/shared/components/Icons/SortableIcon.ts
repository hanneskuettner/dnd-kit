import sortableIcon from '../../assets/sortableIcon.svg';

export class SortableIcon extends HTMLElement {
  static get observedAttributes() {
    return ['width'];
  }

  private img: HTMLImageElement | null = null;

  connectedCallback() {
    // Only add img once to avoid duplication on re-attach/clone
    const existingImg = this.querySelector('img');
    if (existingImg) {
      this.img = existingImg;
      return;
    }

    this.img = document.createElement('img');
    this.img.src = sortableIcon;
    this.img.width = parseInt(this.getAttribute('width') || '90', 10);
    this.img.alt = 'Sortable';
    this.img.draggable = false;
    this.appendChild(this.img);
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'width' && this.img) {
      this.img.width = parseInt(newValue || '90', 10);
    }
  }
}

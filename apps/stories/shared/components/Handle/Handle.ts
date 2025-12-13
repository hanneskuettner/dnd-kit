import '../Action/Action.css';
import './Handle.css';

const HANDLE_SVG = `<svg viewBox="0 0 20 20" width="12">
  <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
</svg>`;

export class Handle extends HTMLElement {
  private initialized = false;

  connectedCallback() {
    this.classList.add('Action');
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('data-cypress', 'draggable-handle');
    this.style.setProperty('--cursor', 'grab');

    // Only set innerHTML once to avoid duplication on re-attach/clone
    if (!this.initialized && !this.querySelector('svg')) {
      this.innerHTML = HANDLE_SVG;
      this.initialized = true;
    }
  }
}

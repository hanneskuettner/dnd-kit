import './Action.css';

export class Action extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'cursor'];
  }

  connectedCallback() {
    this.classList.add('Action');
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
    if (name === 'cursor') {
      this.style.setProperty('--cursor', newValue);
    }
  }
}

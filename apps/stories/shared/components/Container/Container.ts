import './Container.css';

export class Container extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'label', 'scrollable', 'shadow'];
  }

  private header: HTMLDivElement | null = null;
  private list: HTMLUListElement | null = null;

  connectedCallback() {
    this.classList.add('Container');
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  private render() {
    const label = this.getAttribute('label');
    const columns = this.getAttribute('columns') || '1';

    this.style.setProperty('--columns', columns);

    // Create or update header
    if (label) {
      if (!this.header) {
        this.header = document.createElement('div');
        this.header.className = 'Header';
        this.prepend(this.header);
      }
      // Update header content with label and slot for actions
      const actionsSlot = this.header.querySelector('slot[name="actions"]');
      this.header.innerHTML = label;
      if (actionsSlot) {
        this.header.appendChild(actionsSlot);
      } else {
        const slot = document.createElement('slot');
        slot.name = 'actions';
        this.header.appendChild(slot);
      }
    } else if (this.header) {
      this.header.remove();
      this.header = null;
    }

    // Ensure list exists
    if (!this.list) {
      this.list = this.querySelector('ul');
      if (!this.list) {
        this.list = document.createElement('ul');
        this.appendChild(this.list);
      }
    }

    // Set list id for accessibility
    if (label && this.list) {
      this.list.id = label;
    }
  }
}

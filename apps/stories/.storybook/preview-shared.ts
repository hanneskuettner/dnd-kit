import {
  Action,
  Button,
  Container,
  Dropzone,
  Handle,
  DraggableIcon,
  SortableIcon,
  Item,
} from '../shared/components';

/**
 * Register shared web components.
 * Call this in your preview file.
 */
export function registerWebComponents(): void {
  if (typeof customElements === 'undefined') {
    return;
  }

  if (!customElements.get('action-component')) {
    customElements.define('action-component', Action);
  }
  if (!customElements.get('button-component')) {
    customElements.define('button-component', Button);
  }
  if (!customElements.get('container-component')) {
    customElements.define('container-component', Container);
  }
  if (!customElements.get('dropzone-component')) {
    customElements.define('dropzone-component', Dropzone);
  }
  if (!customElements.get('handle-component')) {
    customElements.define('handle-component', Handle);
  }
  if (!customElements.get('draggable-icon')) {
    customElements.define('draggable-icon', DraggableIcon);
  }
  if (!customElements.get('sortable-icon')) {
    customElements.define('sortable-icon', SortableIcon);
  }
  if (!customElements.get('item-component')) {
    customElements.define('item-component', Item);
  }
}

// Track if we've already set up the dark mode listener
let darkModeListenerInitialized = false;

/**
 * Initialize the dark mode message listener.
 * This should be called as early as possible (at module load time).
 */
export function initDarkModeListener(): void {
  if (typeof window === 'undefined' || darkModeListenerInitialized) {
    return;
  }
  darkModeListenerInitialized = true;

  // Listen for dark mode changes from composition host
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'storybook-dark-mode') {
      if (event.data.isDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  });
}

/**
 * Setup dark mode based on URL parameters.
 * Call this on mount in your preview decorator.
 */
export function setupDarkMode(): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const dark = params.get('dark');
    const hero = params.get('hero');

    if (dark === 'false') {
      document.body.classList.remove('dark');
    } else if (dark === 'true') {
      document.body.classList.add('dark');
    }

    if (hero === 'true') {
      document.body.classList.add('hero');
    }
  }
}

/**
 * Shared dark mode parameters for Storybook.
 */
export const sharedParameters = {
  darkMode: {
    stylePreview: true,
  },
};

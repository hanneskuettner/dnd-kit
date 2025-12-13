import {addons} from 'storybook/manager-api';
import type {API_PreparedIndexEntry} from 'storybook/internal/types';
import {DARK_MODE_EVENT_NAME} from '@vueless/storybook-dark-mode';

import {theme} from './theme';

addons.setConfig({
  theme,
  showPanel: false,
});

// Broadcast dark mode changes to composed Storybook iframes
addons.register('dark-mode-composition-sync', () => {
  const channel = addons.getChannel();

  // Helper to send dark mode state to a specific iframe
  const sendDarkModeToIframe = (iframe: HTMLIFrameElement, isDark: boolean) => {
    iframe.contentWindow?.postMessage(
      {type: 'storybook-dark-mode', isDark},
      '*'
    );
  };

  // Helper to send dark mode state to all composed iframes
  const broadcastDarkMode = (isDark: boolean) => {
    const iframes = document.querySelectorAll<HTMLIFrameElement>(
      'iframe[data-is-storybook="true"]'
    );
    iframes.forEach((iframe) => sendDarkModeToIframe(iframe, isDark));
  };

  channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
    broadcastDarkMode(isDark);
  });
});

addons.setConfig({
  sidebar: {
    filters: {
      patterns: (item: API_PreparedIndexEntry): boolean => {
        return !(item.tags ?? []).includes('hidden');
      },
    },
  },
});

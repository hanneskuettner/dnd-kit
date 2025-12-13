import {getAbsolutePath, getAddons, sharedViteFinal} from './shared';

export default {
  // Vanilla (DOM) stories and MDX docs in the composition host
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],

  addons: getAddons(),

  // Composition: reference other framework-specific Storybooks
  refs: (config, {configType}) => {
    const isDev = configType === 'DEVELOPMENT';
    return {
      react: {
        title: 'React',
        url: isDev ? 'http://localhost:6007' : '/react',
      },
      vue: {
        title: 'Vue',
        url: isDev ? 'http://localhost:6008' : '/vue',
      },
      // Future frameworks can be added here:
      // svelte: {
      //   title: 'Svelte',
      //   url: isDev ? 'http://localhost:6009' : '/svelte',
      // },
    };
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      strictMode: true,
    },
  },

  viteFinal: sharedViteFinal,
};

import {getAbsolutePath, getAddons, sharedViteFinal} from './shared';

export default {
  // Vanilla stories and MDX docs in the composition host
  stories: ['../stories/**/*.stories.@(ts|tsx|mdx)'],

  addons: getAddons(),

  // Composition: reference other framework-specific Storybooks
  // Uses proxy paths to avoid CORS issues - the proxy is configured in viteFinal
  refs: (_, {configType}) => {
    const isDev = configType === 'DEVELOPMENT';
    return {
      react: {
        title: 'React',
        url: isDev ? 'http://localhost:6007' : '/react',
      },
      // Future frameworks can be added here:
      // vue: {
      //   title: 'Vue',
      //   url: '/vue',
      // },
      // svelte: {
      //   title: 'Svelte',
      //   url: '/svelte',
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

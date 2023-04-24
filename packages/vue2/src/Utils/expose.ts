import { getCurrentInstance, onBeforeUnmount } from '@vue/composition-api';
export const expose = (exposing: Record<string, any>) => {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error('expose should be called in setup().');
  }

  const keys = Object.keys(exposing);

  keys.forEach((key) => {
    instance.proxy[key] = exposing[key];
  });

  onBeforeUnmount(() => {
    keys.forEach((key) => {
      instance.proxy[key] = undefined;
    });
  });
};

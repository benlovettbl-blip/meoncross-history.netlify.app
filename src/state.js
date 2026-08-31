import { appStore } from './engine/store.js';

// Backward compatibility for components importing state directly
export const state = appStore.state;
export const store = appStore;

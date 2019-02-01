import App from './App.html';
import store from './store/store.js';

const app = new App({
  target: document.querySelector('#app'),
  store
});

export default app;

import './style/style.css';
import App from './App.js';
import ModelStore from './ModelStore.js';
import PageModel from './models/PageModel.js';

// Models
export const modelStore = new ModelStore();

modelStore.set({
  pageModel: new PageModel(),
});

// Do mount
const $root = document.querySelector('#root');

const app = new App();

$root.appendChild(app.$target);

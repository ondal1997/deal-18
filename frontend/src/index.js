import App from './App.js';

const $root = document.querySelector('#root');

const app = new App();

$root.appendChild(app.$target);

import './style/style.scss';
import App from './App.js';
import Router from './lib/route';
import { pageState } from './store/page';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LocationEditPage from './pages/LocationEditPage';
import ProductDetailPage from './pages/ProductDetailPage';

const $root = document.querySelector('#root');

const routes = {
  '/': HomePage,
  '/categories': CategoryPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/location': LocationEditPage,
  '/items/id': ProductDetailPage,
};

export const router = new Router({ routes, pageState });

const app = new App();

$root.appendChild(app.$target);

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
import Postpage from './pages/PostPage';
import MenuPage from './pages/MenuPage';
import ChatListPage from './pages/ChatListPage';
import ChatPage from './pages/ChatPage';

const $root = document.querySelector('#root');

const routes = {
  '/': HomePage,
  '/categories': CategoryPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/location': LocationEditPage,
  '/products/:productId': ProductDetailPage,
  '/post': Postpage,
  '/menu': MenuPage,
  '/chat-list': ChatListPage,
  '/chat': ChatPage,
};

export const router = new Router({ routes, pageState });

const app = new App();

$root.appendChild(app.$target);

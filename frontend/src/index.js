import './style/style.scss';
import App from './App.js';
import Router from './lib/route';
import { pageState } from './store/page';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import LocationEditPage from './pages/LocationEditPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Postpage from './pages/PostPage';
import MenuPage from './pages/MenuPage';
import ChatListPage from './pages/ChatListPage';
import ChatPage from './pages/ChatPage';
import { fetchMe } from './API/userAPI';
import { setState } from './utils/globalObserver';
import { userState } from './store/user';

const $root = document.querySelector('#root');

const routes = {
  '/': HomePage,
  '/categories': CategoryPage,
  '/login': LoginPage,
  '/me': LogoutPage,
  '/register': RegisterPage,
  '/location': LocationEditPage,
  '/products/:productId': ProductDetailPage,
  '/post': Postpage,
  '/menu': MenuPage,
  '/chat-list': ChatListPage,
  '/chat/:chatId': ChatPage,
};

// init userState and render
const setUserState = setState(userState);
fetchMe()
  .then(setUserState)
  .finally(() => {
    const app = new App();
    $root.appendChild(app.$target);
  });

export const router = new Router({ routes, pageState });

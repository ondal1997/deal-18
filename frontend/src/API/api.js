//env로 빼낼것
const BASE_URL = 'http://localhost:3000';

const API = {
  GET_IMG_URL: BASE_URL + '/upload',
  PRODUCT: '/api/products',
  LIKE_PRODUCT: '/api/like-products',
  LIKE: '/api/like',
  TOWN: '/api/towns',
  USER: '/api/user',
  CHAT: '/api/chats',
};

export default API;

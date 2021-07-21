import { initState } from '../utils/globalObserver.js';

export const userState = initState({
  userId: null,
  primaryTown: '역삼동',
  towns: ['역삼동'],
});

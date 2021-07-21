import { initState } from '../utils/globalObserver.js';

export const userState = initState({
  key: 'userState',
  defaultValue: {
    userId: null,
    primaryTown: '역삼동',
    towns: ['역삼동'],
  },
});

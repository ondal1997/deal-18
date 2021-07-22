import { initState } from '../utils/globalObserver';

export const townState = initState({
  key: 'townState',
  defaultValue: {
    primaryTown: '역삼동',
    towns: ['역삼동'],
  },
});

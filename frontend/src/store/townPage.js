import { initState } from '../utils/globalObserver';

export const locationState = initState({
  key: 'locationState',
  defaultValue: {
    primaryLocation: '역삼동',
    locations: ['역삼동'],
  },
});

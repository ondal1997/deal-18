import HomePage from '../pages/HomePage';
import { initState } from '../utils/globalObserver.js';

export const pageState = initState({
  key: 'page',
  defaultValue: { Page: HomePage, direction: '' },
});

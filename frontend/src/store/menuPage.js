import { initState } from '../utils/globalObserver';

//TODO: API나오면 그 pathname 이름으로 type을 결정하면 될 듯
//sell / chat / like
export const menuTabState = initState({
  key: 'menuTabState',
  defaultValue: { type: 'sell' },
});

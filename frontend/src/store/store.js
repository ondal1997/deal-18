import { initState } from '../utils/globalObserver.js';

export const locationDropdownState = initState({
  key: 'locationDropdownState',
  defaultValue: false,
});

export const locationInputPopupState = initState({
  key: 'locationInputPopupState',
  defaultValue: false,
});

export const chattingDeletePopupState = initState({
  key: 'chattingDeletePopupState',
  defaultValue: false,
});

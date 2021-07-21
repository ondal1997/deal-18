import { initState } from '../utils/globalObserver';

//목데이터
/**
 * 서버로 등록하고 url을 받은 뒤에 작업해야 될 듯!
 */

export const uploadedImgState = initState({
  key: 'uploadedImgState',
  defaultValue: [],
});

export const selectedCategoryState = initState({
  key: 'selectedCategoryState',
  defaultValue: '',
});

export const isAblePostSubmit = initState({
  key: 'isAblePostSubmit',
  defaultValue: false,
});

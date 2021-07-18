import { initState } from '../utils/globalObserver';

//목데이터
/**
 * 서버로 등록하고 url을 받은 뒤에 작업해야 될 듯!
 */
import testImg0 from '../../public/img/ImageLarge-0.png';
import testImg1 from '../../public/img/ImageLarge-1.png';
import testImg2 from '../../public/img/ImageLarge-2.png';

export const uploadedImgState = initState({
  key: 'uploadedImgState',
  defaultValue: [testImg0, testImg1, testImg2],
});

export const formCategoryState = initState({
  key: 'formCategoryState',
  defaultValue: '',
});

import API from './api';

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

// 상품 등록
export function fetchPostProduct(productInfo) {
  fetch(API.PRODUCT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .catch(checkErrorFetchedJson);
}

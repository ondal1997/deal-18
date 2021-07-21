import API from './api';

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

// 상품 등록
export function fetchPostProduct(productInfo) {
  return fetch(API.PRODUCT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productInfo),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchProductDetail(productId) {
  return fetch(`/api/products/${productId}`)
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchToggleLike(productId, currentIsLiked) {
  let method = currentIsLiked ? 'delete' : 'post';

  return fetch(`/api/like/${productId}`, { method })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchUpdateProductState(product, state) {
  const json = Object.assign(product, { state });
  return fetch(`/products/${product.id}`, {
    method: 'PUT',
    body: JSON.stringify(json),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchDeleteProduct(productId) {
  return fetch(`/products/${productId}`, { method: 'delete' }).then(((res) => res.json()).then(checkErrorFetchedJson));
}

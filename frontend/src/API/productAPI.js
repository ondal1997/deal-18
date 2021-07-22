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

//상품 상태 변경하기
export function fetchUpdateProductState(product, state) {
  const json = Object.assign(product, { state });
  return fetch(`/api/products/${product.id}`, {
    method: 'PUT',
    body: JSON.stringify(json),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//상품 상세 정보 수정하기
export function fetchUpdateProduct(productId, productInfo) {
  return fetch(API.PRODUCT + `/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productInfo),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//상품 삭제하기
export function fetchDeleteProduct(productId) {
  return fetch(`/api/products/${productId}`, { method: 'delete' })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//좋아요 상품 가져오기
export function fetchGetLikeProduct() {
  return fetch(API.LIKE_PRODUCT)
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//자신의 상품 가져오기
export function fetchGetOwnProduct(id) {
  return fetch(API.PRODUCT + `?ownerId=${id}`)
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//상품 리스트 가져오기
export function fetchProducts(town, category, state) {
  return fetch(API.PRODUCT + `?town=${town}&category=${category}&state=${state}`)
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

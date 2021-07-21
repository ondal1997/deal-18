function checkErrorFetchedJson(json) {
  if (json.error) {
    throw new Error(json.error);
  }
  return json;
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

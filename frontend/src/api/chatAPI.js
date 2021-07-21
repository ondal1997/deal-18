function checkErrorFetchedJson(json) {
  if (json.error) {
    throw new Error(json.error);
  }
  return json.error;
}

export function fetchCreateChat(productId) {
  return fetch(`/api/products/${productId}/chats`, { method: 'post' })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

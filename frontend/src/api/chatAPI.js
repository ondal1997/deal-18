export function fetchCreateChat(productId) {
  return fetch(`/api/products/${productId}/chats`, { method: 'post' })
    .then((res) => res.json())
    .then((res) => {
      if (res.error && res.error !== '이미 채팅방이 존재합니다.') {
        throw res.error;
      }

      return res;
    });
}

export function fetchProductDetail(productId) {
  return fetch(`/api/products/${productId}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      return res;
    });
}

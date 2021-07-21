function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

export function fetchGetImg(formData) {
  return fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

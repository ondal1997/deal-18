import API from './api';

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

export function fetchGetImg(formData) {
  return fetch(API.GET_IMG_URL, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

import API from './api';

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

export function fetchGetImg(formData) {
  fetch(API.uploadImg, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

import API from './api';

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

//동네 변경 {towns:~~~}
export function fetchPutPrimaryTown(town) {
  return fetch(API.USER, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(town),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//동네 등록 {towns:~~~}
export function fetchPostTown(town) {
  return fetch(API.TOWN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(town),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//동네 삭제 {towns:~~~}
export function fetchDeleteTown(town) {
  return fetch(API.TOWN, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(town),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

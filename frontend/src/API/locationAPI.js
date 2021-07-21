import API from './api';
기;

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

//동네 변경 {towns:~~~}
export const fetchPutPrimaryLocation = (location) => {
  fetch(API.USER, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

//동네 등록 {towns:~~~}
export const fetchPostLocations = (location) => {
  fetch(API.TOWN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

//동네 삭제 {towns:~~~}
export const fetchDeleteLocations = (location) => {
  fetch(API.TOWN, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(location),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

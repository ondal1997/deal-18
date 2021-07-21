import API from './api';
기;

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

//동네 등록
export const fetchPostLocations = (locations) => {
  fetch(API.TOWN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locations),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

//동네 삭제
export const fetchDeleteLocations = (locations) => {
  fetch(API.TOWN, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(locations),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

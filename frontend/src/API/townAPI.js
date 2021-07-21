import API from './api';
기;

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

//동네 등록하
export const fetchPostTowns = (towns) => {
  fetch(API.TOWN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(towns),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

//동네 등록하
export const fetchDeleteTowns = (towns) => {
  fetch(API.TOWN, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(towns),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
};

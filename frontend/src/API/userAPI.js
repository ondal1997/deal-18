function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

export function fetchLogin(userId) {
  return fetch('/api/login', {
    method: 'post',
    body: JSON.stringify({ userId }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchMe() {
  return fetch('/api/me')
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchLogout() {
  return fetch('/api/logout', {
    method: 'post',
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

export function fetchSignUp(userId, town) {
  return fetch('/api/sign-up', {
    method: 'post',
    body: JSON.stringify({ userId, town }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

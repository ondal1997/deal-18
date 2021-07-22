import API from './api';

function checkErrorFetchedJson(json) {
  if (json.error) {
    throw json.error;
  }
  return json;
}

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

//내 채팅 목록 조회
export function fetchGetOwnChatList() {
  return fetch(API.CHAT)
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//채팅 디테일 조회
export function fetchGetChatDetail(chatId) {
  return fetch(API.CHAT + `/${chatId}`)
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//채팅방 나가기
export function fetchDeleteChat(chatId) {
  return fetch(API.CHAT + `/${chatId}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

//채팅 메세지 보내기
export function fetchSendChatting(chatId, message) {
  message = { message };

  return fetch(API.CHAT + `/${chatId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })
    .then((res) => res.json())
    .then(checkErrorFetchedJson);
}

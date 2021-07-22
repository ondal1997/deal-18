export const getPassedTime = (timeString) => {
  const utcDate = new Date(timeString);
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const date = new Date(utcDate.getTime() + KR_TIME_DIFF);

  const today = new Date();
  const diff = Math.ceil((today.getTime() - date.getTime()) / 1000); // 초 단위 날짜차이값

  const OneMinute = 60;
  const OneHour = OneMinute * 60;
  const OneDay = OneHour * 24;
  const OneMonth = OneDay * 30.4368498983; // 태양년 / 12
  const OneYear = OneDay * 365.24219878; // 태양년

  if (diff < OneMinute) {
    return '방금 전';
  }

  if (diff < OneHour) {
    return `${Math.floor(diff / OneMinute)}분 전`;
  }

  if (diff < OneDay) {
    return `${Math.floor(diff / OneHour)}시간 전`;
  }

  if (diff < OneMonth) {
    return `${Math.floor(diff / OneDay)}일 전`;
  }

  if (diff < OneYear) {
    return `${Math.floor(diff / OneMonth)}달 전`;
  }

  return `${Math.floor(diff / OneYear)}년 전`;
};

export const getWon = (price) => {
  if (price === null) {
    return '가격 미정';
  }

  let res = [];
  let p = price;
  let count = 0;

  while (p) {
    if (count && count % 3 === 0) {
      res.push(',');
    }
    count++;
    res.push((p % 10).toString());
    p = Math.floor(p / 10);
  }

  return res.reverse().join('') + '원';
};

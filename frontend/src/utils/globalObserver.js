const globalState = {};

const subscribe = (key, className, observer) => globalState[key]._observers.set(className, observer);

const _notify = (key) => globalState[key]._observers.forEach((observer) => observer());

const initState = ({ key, defaultValue }) => {
  if (key in globalState) throw Error('이미 존재하는 key값 입니다.');
  globalState[key] = {
    _state: defaultValue,
    _observers: new Map(),
  };
  return key;
};

const getState = (key) => {
  if (!(key in globalState)) throw Error('존재하지 않는 key값 입니다.');
  return globalState[key]._state;
};

const setState = (key) => (newState) => {
  if (!(key in globalState)) throw Error('존재하지 않는 key값 입니다.');

  if (typeof newState === 'function') {
    const state = getState(key);
    globalState[key]._state = newState(state);
  } else {
    globalState[key]._state = newState;
  }

  _notify(key);
};

export { subscribe, initState, getState, setState };

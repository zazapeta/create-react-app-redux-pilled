const LS_KEY = 'SYMENT:state';

export function loadState() {
  try {
    const serializedState = localStorage.getItem(LS_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LS_KEY, serializedState);
  } catch (e) {}
}

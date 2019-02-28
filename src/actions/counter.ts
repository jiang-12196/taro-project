import { ADD, MINUS } from '../constants/counter';

export const add = dispatch => () => {
  return dispatch({
    type: ADD
  });
};

export const minus = dispatch => () => {
  return dispatch({
    type: MINUS
  });
};

export const asyncAdd = dispatch => () => {
  setTimeout(() => {
    add(dispatch)();
  }, 1000);
};

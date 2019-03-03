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
export const getOpenId = dispatch => openId => {
  return dispatch({
    type: 'initOpenId',
    openId
  });
};

export const asyncAdd = dispatch => () => {
  setTimeout(() => {
    add(dispatch)();
  }, 1000);
};

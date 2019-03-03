import { ADD, MINUS } from '../constants/counter';

const INITIAL_STATE = {
  num: 0,
  openId: ''
};

export default function counter(state = INITIAL_STATE, action) {
  console.log('action: ========>', action);
  switch (action.type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      };
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      };
    case 'initOpenId':
      return {
        ...state,
        openId: action.openId
      };
    default:
      return state;
  }
}

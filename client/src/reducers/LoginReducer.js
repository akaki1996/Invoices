import initialState from './initialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function loginReducer(state=[], action) {
  switch(action.type) {
    case ActionTypes.LOG_IN_SUCCESS:
      return {'data': 'success'};

    case ActionTypes.LOG_IN_FAILED:
      return {'data': 'failed'};
    case ActionTypes.LOG_OUT_SUCCESS:
      return state;

    default:
      return state;
  }
}
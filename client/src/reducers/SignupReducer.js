import initialState from './initialState';
import * as ActionTypes from '../actions/ActionTypes';

export default function SignupReducer(state=[], action) {
  switch(action.type) {
    case ActionTypes.SIGN_UP_SUCCESS:
      return {'data': 'success'};

    case ActionTypes.SIGN_UP_FAILED:
      return {'message': action.data.info};

    default:
      return state;
  }
}
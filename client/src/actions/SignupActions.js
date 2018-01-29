import * as ActionTypes from './ActionTypes';
import SignupApi from '../api/SignupApi';

export function SignupSuccess(data) {
  return {
    type: ActionTypes.SIGN_UP_SUCCESS,
    data
  };
}

export function SignupFailed(data) {
  return {
    type: ActionTypes.SIGN_UP_FAILED,
    data
  };
}

export function Signup(dispatch, data) {
  return {
    type: ActionTypes.SIGN_UP,
    dispatch,
    data
  };
}
import * as ActionTypes from './ActionTypes';
import LoginApi from '../api/LoginApi';

export function loginSuccess(history) {
  return {
    type: ActionTypes.LOG_IN_SUCCESS,
    history
  };
}

export function loginFailed(history) {
  return {
    type: ActionTypes.LOG_IN_FAILED,
    history
  };
}

export function login(dispatch, history, creds) {
  return {
    type: ActionTypes.LOG_IN,
    dispatch,
    history,
    creds
  };
}

export function logout(dispatch, history) {
  return {
    type: ActionTypes.LOG_OUT,
    dispatch,
    history
  };
}

export function logoutSuccess(history) {
  return {
    type: ActionTypes.LOG_OUT_SUCCESS,
    history
  };
}
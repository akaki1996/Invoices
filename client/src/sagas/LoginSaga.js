import { all, call, takeEvery } from 'redux-saga/effects';

import * as ActionTypes from '../actions/ActionTypes';
import * as LoginActions from '../actions/LoginActions';
import LoginApi from '../api/LoginApi';

function* login(action) {
  const { dispatch, history, creds } = action;

  let auth = yield call(LoginApi.login, creds);

  if (auth.data.res === 'success')
  {
    sessionStorage.setItem('token', auth.data.token);

    yield dispatch(LoginActions.loginSuccess(history));
  }
  else
  {
    yield dispatch(LoginActions.loginFailed(history));
  }
}

function* logout(action) {
  const { dispatch, history } = action;

  let auth = yield call(LoginApi.logout);

  if (auth.data.res === 'success')
  {
    sessionStorage.removeItem('token');

    yield dispatch(LoginActions.logoutSuccess(history));
  }
}

export default function *LoginSaga() {
  yield all([
    takeEvery(ActionTypes.LOG_IN, login),
    takeEvery(ActionTypes.LOG_OUT, logout)
  ]);
}
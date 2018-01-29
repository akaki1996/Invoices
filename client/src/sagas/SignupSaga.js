import { all, call, takeEvery } from 'redux-saga/effects';

import * as ActionTypes from '../actions/ActionTypes';
import * as SignupActions from '../actions/SignupActions';
import SignupApi from '../api/SignupApi';

function* signup(action) {
  const { dispatch, history, data } = action;
  let reg = yield call(SignupApi.signup, data);

  if (reg.data.res === 'success')
  {
    yield dispatch(SignupActions.SignupSuccess());
  }
  else
  {
    yield dispatch(SignupActions.SignupFailed(reg.data));
  }
}

export default function *SignupSaga() {
  yield takeEvery(ActionTypes.SIGN_UP, signup);
}
import { all, call, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from '../actions/ActionTypes';
import * as InvoicesActions from '../actions/InvoicesActions';
import InvoicesApi from '../api/InvoicesApi';

function* invoices(action) {
  const { dispatch } = action;
  let inv = yield call(InvoicesApi.invoices);

  if (inv.data.res === 'success')
  {
    yield dispatch(InvoicesActions.fetchSuccess(inv.data.invoices));
  }
  else
  {
    yield dispatch(InvoicesActions.fetchFailed());
  }
}

function* removeInvoice(action) {
  const { dispatch, data } = action;
  let inv = yield call(InvoicesApi.removeInvoice, data)

  if (inv.data.res === 'success')
  {
    yield dispatch(InvoicesActions.removeSuccess(inv.data));
  }
  else
  {
    yield dispatch(InvoicesActions.removeFailed());
  }
}


export default function *InvoicesSaga() {
  yield [
    takeEvery(ActionTypes.FETCH_INVOICES, invoices),
    takeEvery(ActionTypes.REMOVE_INVOICE, removeInvoice)
  ];
}
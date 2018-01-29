import { all, call, takeEvery } from 'redux-saga/effects';
import * as ActionTypes from '../actions/ActionTypes';
import * as InvoiceActions from '../actions/InvoiceActions';
import InvoiceApi from '../api/InvoiceApi';

function* invoice(action) {
  const { dispatch, id } = action;
  let inv = yield call(InvoiceApi.invoice, id);

  if (inv.data.res === 'success')
  {
    yield dispatch(InvoiceActions.fetchSuccess(inv.data));
  }
  else
  {
    yield dispatch(InvoiceActions.fetchFailed());
  }
}

function* addInvoice(action) {
  const { dispatch, data } = action;
  let inv = yield call(InvoiceApi.addInvoice, data)

  if (inv.data.res === 'success')
  {
    yield dispatch(InvoiceActions.addSuccess(inv.data));
  }
  else
  {
    yield dispatch(InvoiceActions.addFailed());
  }
}

function* editInvoice(action) {
  const { dispatch, data } = action;
  let inv = yield call(InvoiceApi.editInvoice, data)

  if (inv.data.res === 'success')
  {
    yield dispatch(InvoiceActions.editSuccess(inv.data));
  }
  else
  {
    yield dispatch(InvoiceActions.editFailed());
  }
}

function* removeDetail(action) {
  const { dispatch, invoiceId, itemId } = action;
  let inv = yield call(InvoiceApi.removeDetail, invoiceId, itemId)

  if (inv.data.res === 'success')
  {
    yield dispatch(InvoiceActions.removeDetailSuccess(inv.data));
  }
  else
  {
    yield dispatch(InvoiceActions.removeDetailFailed());
  }
}

export default function *InvoiceSaga() {
  yield [
      takeEvery(ActionTypes.FETCH_GET_INVOICE, invoice),
      takeEvery(ActionTypes.ADD_INVOICE, addInvoice),
      takeEvery(ActionTypes.EDIT_INVOICE, editInvoice),
      takeEvery(ActionTypes.REMOVE_DETAIL, removeDetail)
  ];
}
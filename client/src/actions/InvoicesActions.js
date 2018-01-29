import * as ActionTypes from './ActionTypes';

export function fetchInvoices(dispatch) {
  return {
    type: ActionTypes.FETCH_INVOICES,
    dispatch
  };
}

export function fetchSuccess(invoices) {
  return {
    type: ActionTypes.FETCH_SUCCESS,
    invoices
  };
}

export function fetchFailed() {
  return {
    type: ActionTypes.FETCH_FAILED
  };
}

export function removeInvoice(dispatch, data) {
  return {
    type: ActionTypes.REMOVE_INVOICE,
    dispatch,
    data
  };
}

export function removeSuccess(data) {
  return {
    type: ActionTypes.REMOVE_INVOICE_SUCCESS,
    data
  };
}

export function removeFailed() {
  return {
    type: ActionTypes.REMOVE_INVOICE_FAILED
  };
}
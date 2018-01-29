import * as ActionTypes from './ActionTypes';

export function fetchInvoice(dispatch, id) {
  return {
    type: ActionTypes.FETCH_GET_INVOICE,
    dispatch,
    id
  };
}

export function fetchSuccess(invoice) {
  return {
    type: ActionTypes.FETCH_INVOICE_GET_SUCCESS,
    invoice
  };
}

export function fetchFailed() {
  return {
    type: ActionTypes.FETCH_INVOICE_GET_FAILED
  };
}

export function addInvoice(dispatch, data) {
  return {
    type: ActionTypes.ADD_INVOICE,
    dispatch,
    data
  };
}

export function addSuccess() {
  return {
    type: ActionTypes.ADD_INVOICE_SUCCESS
  };
}

export function addFailed() {
  return {
    type: ActionTypes.ADD_INVOICE_FAILED
  };
}

export function editInvoice(dispatch, data) {
  return {
    type: ActionTypes.EDIT_INVOICE,
    dispatch,
    data
  };
}

export function editSuccess() {
  return {
    type: ActionTypes.EDIT_INVOICE_SUCCESS
  };
}

export function editFailed() {
  return {
    type: ActionTypes.EDIT_INVOICE_FAILED
  };
}

export function removeDetail(dispatch, invoiceId, itemId) {
  return {
    type: ActionTypes.REMOVE_DETAIL,
    dispatch,
    invoiceId,
    itemId
  };
}

export function removeDetailSuccess() {
  return {
    type: ActionTypes.REMOVE_DETAIL_SUCCESS
  };
}

export function removeDetailFailed() {
  return {
    type: ActionTypes.REMOVE_DETAIL_FAILED
  };
}
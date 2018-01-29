import * as ActionTypes from '../actions/ActionTypes';

export default function invoiceReducer(state = [], action) {
  switch(action.type) {
    case ActionTypes.FETCH_INVOICE_GET_SUCCESS:
      return { 'invoice': action.invoice };

    case ActionTypes.FETCH_INVOICE_GET_FAILED:
    case ActionTypes.ADD_INVOICE_FAILED:
    case ActionTypes.EDIT_INVOICE_FAILED:
      return state;

    case ActionTypes.ADD_INVOICE_SUCCESS:
    case ActionTypes.EDIT_INVOICE_SUCCESS:
      return {'data': 'success'};

    default:
      return state;
  }
}
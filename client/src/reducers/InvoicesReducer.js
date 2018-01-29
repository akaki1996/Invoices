import * as ActionTypes from '../actions/ActionTypes';

export default function invoicesReducer(state = [], action) {
  switch(action.type) {
    case ActionTypes.FETCH_SUCCESS:
      return {'data': action.invoices};

    case ActionTypes.LOG_IN_FAILED:
    case ActionTypes.REMOVE_INVOICE_FAILED:
      return state;

    case ActionTypes.REMOVE_INVOICE_SUCCESS:
      return { 'data': action.data };

    default:
      return state;
  }
}
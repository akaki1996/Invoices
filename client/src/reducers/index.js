import { combineReducers } from 'redux';
import login from './LoginReducer';
import invoices from './InvoicesReducer';
import invoice from './InvoiceReducer';
import signup from './SignupReducer';

const rootReducer = combineReducers({
  login,
  invoices,
  invoice,
  signup
});

export default rootReducer;
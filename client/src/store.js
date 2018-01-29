import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

import LoginSaga from './sagas/LoginSaga';
import InvoicesSaga from './sagas/InvoicesSaga';
import InvoiceSaga from './sagas/InvoiceSaga';
import SignupSaga from './sagas/SignupSaga';

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(LoginSaga);
  sagaMiddleware.run(InvoicesSaga);
  sagaMiddleware.run(InvoiceSaga);
  sagaMiddleware.run(SignupSaga);

  return store;
}
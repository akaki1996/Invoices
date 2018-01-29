import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Invoices from './components/Invoices';
import Invoice from './components/Invoice';
import { Provider } from 'react-redux';

import Store from './store';

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/signup" component={ Register } />
        <Route path="/invoices" component={ Invoices } />
        <Route path="/addinvoices" component={ Invoice } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
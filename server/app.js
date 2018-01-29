var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var invoices = require('./routes/invoices');
var addInvoice = require('./routes/addInvoice');
var editInvoice = require('./routes/editInvoice');
var getInvoice = require('./routes/getInvoice');
var register = require('./routes/register');
var deleteInvoices = require('./routes/deleteinvoices');
var deleteItem = require('./routes/deleteItem');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.post('/signup', register);
app.post('/login', login);
app.get('/logout', logout);

app.use((req, res, next) => {
  if (req.session && req.session.userId)
  {
    next();
  }
  else
  {
    res.send({'data': {'res': 'failed'}});
  }
});

app.post('/invoices/create', addInvoice);
app.post('/getinvoice', getInvoice);
app.put('/invoices/edit', editInvoice);
app.get('/invoices', invoices);
app.delete('/invoices/delete', deleteInvoices);
app.delete('/invoices/details/delete', deleteItem);

const port = 3001;

app.listen(port, () => {console.log('Listening on port ', port)});

import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Link, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import * as InvoicesActions from '../actions/InvoicesActions';
import * as LoginActions from '../actions/LoginActions';

import '../styles/invoices.css';

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = { invoices: [] };
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(InvoicesActions.fetchInvoices(dispatch));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.data.res === 'success')
    {
      var invs = this.state.invoices.slice();
      invs = invs.filter(invs => invs._id !== nextProps.state.data.invoiceId)
      this.setState({ invoices: invs });
    } else {
      this.setState({ invoices: nextProps.state.data });
    }
  }

  requireAuth() {
    if (!sessionStorage.getItem('token'))
    {
      return <Redirect to="/" />;
    }
  }

  logout() {
    const { dispatch, history } = this.props;
    dispatch(LoginActions.logout(dispatch, history));
  }

  handleClick(e) {
    const { dispatch } = this.props;
    dispatch(InvoicesActions.removeInvoice(dispatch, e));
  }

  render(match) {
    if (!sessionStorage.getItem('token'))
    {
      return <Redirect to="/" />;
    }

    return (
        <Grid fluid>
          <Row>
            <Col sm={5} className='offset-sm-3 invoiceHeader'>
              <Link to='/addinvoices'>
                <Button bsStyle='primary' bsSize='large'>
                  Add invoices
                </Button>
              </Link>
              <Link to='/'>
                <Button bsSize='large' className='logout' onClick={ this.logout } active>
                  Log out
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className='invoiceContainer'>
            <Col sm={10} className='offset-sm-1'>
              <Row className='invoices'>
                <Col sm={2}> Invoice From </Col>
                <Col sm={2}> Invoice To </Col>
                <Col sm={2}> Invoice N </Col>
                <Col sm={2}> Payment Term </Col>
                <Col sm={2}> Total </Col>
                {/*<Col sm={2}></Col>*/}
              </Row>
              <div className='invoiceInfo'>
                {
                  this.state.invoices.map((invoice, index) => (
                        <Row className='invoiceLine' invoiceid={ invoice._id }  key={ index }>
                          <Col sm={2}> { invoice.name } </Col>
                          <Col sm={2}> { invoice.contactName } </Col>
                          <Col sm={2}> { invoice.description } </Col>
                          <Col sm={2}> { invoice.address } </Col>
                          <Col sm={2}> { invoice.total } </Col>
                          <Col className='editButtonDiv' sm={2}>
                            <Link to={{pathname: '/addinvoices', state: invoice._id }}>
                              <Button bsStyle="default">Edit</Button>
                            </Link>
                            <Button onClick={ () => this.handleClick(invoice._id) } bsStyle="danger">Delete</Button>
                          </Col>
                        </Row>
                        )
                  )
                }
              </div>
            </Col>
          </Row>
        </Grid>);
  }
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

function mapStateToProps(state) {
  return {'state': state.invoices};
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);
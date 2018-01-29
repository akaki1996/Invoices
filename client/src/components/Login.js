import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as LoginActions from '../actions/LoginActions';
import * as ActionTypes from '../actions/ActionTypes';

import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {message: '', creds: {'username': '', 'password': ''}};
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.state.data === 'success')
    {
      this.props.history.push('/invoices');
    }

    if (nextProps.state.data === 'failed')
    {
      this.setState({ message: 'User or Password is not correct' });
    }
  }

  handleChange(e) {
    this.setState({creds: {...this.state.creds, [e.target.name]: e.target.value}});
  }

  handleLogin(e) {
    e.preventDefault();

    const { dispatch, history } = this.props
    const { creds } = this.state;

    dispatch(LoginActions.login(dispatch, history, creds));
  }

  render() {
    let message = (this.props.location.message === 'success' ? 'Registered Successfully': '');

    return (
      <Grid fluid className='loginPage'>
        <Row className='show-grid loginForm'>
          <Col sm={6} className='offset-sm-3 loginBox'>
            <Col sm={12} className='messageBox'> { this.state.message ? this.state.message : message }</Col>
            <div className='innerForm'>
              <input type='text' name='username' placeholder='username' value={ this.state.creds.username } onChange={ this.handleChange } />
              <input type='password' name='password' placeholder='password' value={ this.state.creds.password } onChange={ this.handleChange } />
              <Button bsStyle='success' onClick={ this.handleLogin }>Login</Button>
              <Link to='/signup'><Button bsStyle='link'>Register</Button></Link>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

function mapStateToProps(state) {
  return {'state': state.login};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
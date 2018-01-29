import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import * as SignupActions from '../actions/SignupActions';
import { connect } from 'react-redux';

import '../styles/register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {'message': '', 'username': '', 'email': '', 'password': ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleRegistration()
  {
    const { dispatch} = this.props;

    dispatch(SignupActions.Signup(dispatch, this.state));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.data === 'success')
    {
      this.props.history.push({ pathname: '/', message: nextProps.state.data })
    }

    this.setState({message: nextProps.state.message});
  }

  render() {
    return (
      <Grid fluid className='registrationPage'>
        <Row className='show-grid registrationForm'>
          <Col sm={6} className='offset-sm-3 registrationBox'>
            <Col sm={12} className='messageBox'> { this.state.message } </Col>
            <div className='innerForm'>
              <input type='text' name='username' placeholder='Username' onChange={ this.handleChange } />
              <input type='text' name='email' placeholder='Email' onChange={ this.handleChange } />
              <input type='password' name='password' placeholder='Password' onChange={ this.handleChange } />
              <Button bsStyle='success' onClick={ this.handleRegistration }>Register</Button>
              <Link to="/"><Button bsStyle="link">Cancel</Button></Link>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

function mapStateToProps(state) {
  return {'state': state.signup};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
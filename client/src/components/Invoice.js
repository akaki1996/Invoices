import React, { Component } from 'react';
import { Grid, Row, Col, Button, FormGroup, ControlLabel, FormControl, Glyphicon} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as InvoiceActions from '../actions/InvoiceActions';

import '../styles/invoice.css';

class Invoice extends Component {

  constructor(props) {
    super(props);
    this.state = {'id': '', 'name': '', 'date': '', 'description': '', 'contactName': '',
        'address': '', 'total': '0', 'items': [{'id': 0, 'name': '', 'description': '',
        'quantity': '', 'price': '', 'total': ''}], 'removed': []};
    this.handleClick = this.handleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state)
    {
      const { dispatch } = this.props;
      const id = this.props.location.state;
      dispatch(InvoiceActions.fetchInvoice(dispatch, id));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.data === 'success')
    {
      this.props.history.push('/invoices');
      return;
    }

    var response =  nextProps.state.invoice.invoice;

    for (let i = 0; i < response.items.length; i++)
    {
      response.items[i].total = response.items[i].quantity*response.items[i].price;
    }

    let date = new Date(response.data.date);
    let invoiceDate = date.getFullYear() + (date.getMonth() > 9 ? '-' : '-0') + (date.getMonth() + 1) + (date.getDate() > 9 ? '-' : '-0') + date.getDate();

    this.setState({'id': response.data._id, 'name': response.data.name, 'date': invoiceDate,
          'description': response.data.description, 'contactName': response.data.contactName,
          'address': response.data.address, 'total': response.data.total, 'items': response.items});
  }

  handleSave() {
    const { dispatch } = this.props;

    if (!this.state.id)
    {
      dispatch(InvoiceActions.addInvoice(dispatch, this.state));
    }
    else
    {
      dispatch(InvoiceActions.editInvoice(dispatch, this.state));
    }

    if (this.state.id !== '' && this.state.removed.length > 0)
    {
      var invoiceId = this.state.id;
      this.state.removed.forEach(function (itemId) {
        dispatch(InvoiceActions.removeDetail(dispatch, invoiceId, itemId));
      })
    }
  }

  handleChange(event, i = null) {
    if (i !== null)
    {
      const items = this.state.items.slice();
      let total = this.state.total;

      items[i][event.target.name] = event.target.value;

      if (items[i]['quantity'] && items[i]['price'])
      {
        total = total - items[i]['total'] + items[i]['quantity']*items[i]['price'];
        items[i]['total'] = items[i]['quantity']*items[i]['price'];
      }

      this.setState({items: items, total: total});
    }
    else
    {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleItemClick(i, line)
  {
    let items = this.state.items.slice();
    let removed = this.state.removed;
    let total = this.state.total;
    items.splice(line, 1);
    removed.push(i);

    if (this.state.items[line])
    {
      total = total - this.state.items[line].total;
    }

    this.setState({items: items, removed: removed, total: total});
  }

  handleClick() {
    const items = this.state.items.slice();
    items.push({'id':  items[items.length-1] ? parseInt(items[items.length-1].id, 10) + 1 : '0', 'name': '', 'description': '', 'quantity': '', 'price': '', 'total': ''});
    this.setState({items: items});
  }

  render() {
    if (!sessionStorage.getItem('token'))
    {
      return <Redirect to="/" />;
    }

    return (
      <Grid fluid>
        <Row>
          <Col sm={5} className='offset-sm-3 invoiceHeader'>
            <Link to='/invoices'>
              <Button bsStyle='primary' bsSize='large'>
                Invoices
              </Button>
            </Link>
            <Link to='/'>
              <Button bsSize='large' className='logout' active>
                Log out
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col sm={9} className='offset-sm-1'>
            <Col sm={8} className='invoiceDivLeft'>
              <FormGroup>
                <ControlLabel>Name:</ControlLabel>
                <FormControl value={ this.state.name || '' } name='name' onChange={ (e) => this.handleChange(e) } componentClass='textarea' placeholder='Name' />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Contact Name:</ControlLabel>
                <FormControl value={ this.state.contactName || '' } name='contactName' onChange={ (e) => this.handleChange(e) } componentClass='textarea' placeholder='Contact Name' />
              </FormGroup>
            </Col>
            <Col sm={4} className='invoiceDivRight'>
              <FormGroup>
                <ControlLabel>Address:</ControlLabel>{' '}
                <FormControl value={ this.state.address || '' } name='address' onChange={ (e) => this.handleChange(e) } type='text' placeholder='Address' />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Date:</ControlLabel>{' '}
                <FormControl value={ this.state.date } name='date' onChange={ (e) => this.handleChange(e) } type='date' placeholder='Invoice date' />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Description:</ControlLabel>{' '}
                <FormControl value={ this.state.description || '' } name='description' onChange={ (e) => this.handleChange(e) } type='text' placeholder='Description' />
              </FormGroup>
            </Col>
          </Col>
        </Row>
        <Row id='itemsContainer'>
          <Col sm={9} className='offset-sm-1'>
            <Row className='items'>
              <Col sm={2}> Name </Col>
              <Col sm={3}> Description </Col>
              <Col sm={2}> Quantity </Col>
              <Col sm={3}> Price </Col>
              <Col sm={2}> Total </Col>
            </Row>
            {
              this.state.items.map((item, index) => (
                  <Row className='itemLine' key={ index }>
                    <Col sm={2}>
                      <FormGroup>
                        <FormControl value={ item.name || '' } name='name' line={ index } type='text' onChange={ (e) => this.handleChange(e, index) } placeholder="Name" />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <FormControl value={ item.description || '' } name='description' line={ index } type='text' onChange={ (e) => this.handleChange(e, index) } placeholder="Description" />
                      </FormGroup>
                    </Col>
                    <Col sm={2}>
                      <FormGroup>
                        <FormControl value={ item.quantity || '' } name='quantity' line={ index } type='number' onChange={ (e) => this.handleChange(e, index) } placeholder='1' />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <FormControl value={ item.price || '' } name='price' line={ index } type='number' onChange={ (e) => this.handleChange(e, index) } placeholder='$' />
                      </FormGroup>
                    </Col>
                    <Col name='total' className='total' line={ index } sm={1}>
                      ${ item.total }
                    </Col>
                    <Button bsSize="small" bsStyle="link" onClick={ () => this.handleItemClick(item.id, index)}>
                      remove
                    </Button>
                  </Row>
                )
              )
            }
          </Col>
        </Row>
        <Col sm={9} className='offset-sm-1'>
          <Row className='totalAmount'>
            <Col sm={3} className='offset-sm-7'> Total Amount: </Col>
            <Col sm={2} className='anountNumber'> ${ this.state.total } </Col>
          </Row>
        </Col>

        <Row>
          <Col sm={9} className='offset-sm-1 itemButtons'>
            <Col sm={8}>
              <Button bsStyle="link" onClick={ this.handleClick }>Add Item</Button>
            </Col>
            <Col sm={2}>
              <Link to='/invoices'><Button bsStyle="danger">Cancel</Button></Link>
            </Col>
            <Col sm={2}>
              <Button bsStyle="success" onClick={ this.handleSave }>Save</Button>
            </Col>
          </Col>
        </Row>
      </Grid>
    )
  };
}

function mapDispatchToProps(dispatch) {
  return {dispatch};
}

function mapStateToProps(state) {
  return {'state': state.invoice};
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
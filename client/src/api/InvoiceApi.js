class InvoiceApi {
  static invoice(id) {
    const req = new Request('/getinvoice', {
          method: 'post',
          credentials: 'same-origin',
          body: JSON.stringify({'data': id}),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        });

    return fetch(req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  }

  static addInvoice(data) {
    const req = new Request('/invoices/create', {
        method: 'post',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

    return fetch(req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  }

  static editInvoice(data) {
    const req = new Request('/invoices/edit', {
        method: 'put',
        credentials: 'same-origin',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

    return fetch(req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  }

  static removeDetail(invoiceId, itemId) {
    const req = new Request('/invoices/details/delete', {
        method: 'delete',
        credentials: 'same-origin',
        body: JSON.stringify({'invoiceId': invoiceId, 'itemId': itemId}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });

    return fetch(req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  }
}

export default InvoiceApi;
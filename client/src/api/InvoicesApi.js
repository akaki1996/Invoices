class InvoicesApi {
  static invoices() {
    const req = new Request('/invoices', { credentials: 'same-origin' });

    return fetch(req)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      return err;
    });
  }

  static removeInvoice(data) {
    const req = new Request('/invoices/delete', {
        method: 'delete',
        credentials: 'same-origin',
        body: JSON.stringify({'data': data}),
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

export default InvoicesApi;
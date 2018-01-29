class LoginApi {
  static login(creds) {
    const req = new Request('/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify(creds),
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

  static logout() {
    const req = new Request('/logout', {
      method: 'GET',
      credentials: 'same-origin',
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

export default LoginApi;
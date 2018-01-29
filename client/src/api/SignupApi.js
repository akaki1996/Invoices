class SignupApi {
  static signup(data) {
    const req = new Request('/signup', {
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
}

export default SignupApi;
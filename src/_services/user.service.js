import { apiConstants } from '../_constants';

export const userService = {
  signin,
  signout,
  signup
};

function signin(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  };

  return fetch(`${ apiConstants.API_DOMAIN }/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));

          return user;
        });
}

function signout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function signup(user) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  };

  return fetch(`${ apiConstants.API_DOMAIN }/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
          localStorage.setItem('user', JSON.stringify(user));

          return user;
        });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        signout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}

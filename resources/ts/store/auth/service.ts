import axios, { AxiosPromise } from 'axios'
// import { authHeader } from '../_helpers';

export const userService = {
  // login,
  logout,
  // getAll
}

interface IPayload {}

// function login(params: any) {
//     return axios.post<Response>(`api/authenticate`, params)
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));

//             return user;
//         });
// }

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

// function getAll() {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };

//     return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
// }

function handleResponse(response: Response): IPayload {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}

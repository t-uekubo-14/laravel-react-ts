import axios from 'axios'

export function configureHttp() {
  /**
   * 認証処理のインターセプタを実装.
   */

  // for Request
  axios.interceptors.request.use(config => {
    /**
     * We'll load the axios HTTP library which allows us to easily issue requests
     * to our Laravel back-end. This library automatically handles sending the
     * CSRF token as a header based on the value of the "XSRF" token cookie.
     */
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

    /**
     * Next we will register the CSRF Token as a common header with Axios so that
     * all outgoing HTTP requests automatically have it attached. This is just
     * a simple convenience so we don't have to attach every token manually.
     */

    const token: Element | null = document.head.querySelector(
      'meta[name="csrf-token"]'
    )

    if (token) {
      config.headers['X-CSRF-TOKEN'] = token.getAttribute('context')
    } else {
      console.error(
        'CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token'
      )
    }

    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'jwt-token'
    )}`
    return config
  })

  // for Response
  axios.interceptors.response.use(
    response => {
      // ...get the token from the header or response data if exists, and save it.
      const token = response.headers['Authorization'] || response.data['token']
      if (token) {
        localStorage.setItem('jwt-token', token)
      }
      return response
    },
    error => {
      // Also, if we receive a Bad Request / Unauthorized error
      console.log(error)
      return Promise.reject(error)
    }
  )
}

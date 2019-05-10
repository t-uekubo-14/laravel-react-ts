import axios from 'axios'

export default {
  debug: true,
  state: {
    user: {},
    authenticated: false,
  },

  login(
    email: string,
    password: string,
    successCb: Function = () => {},
    errorCb: Function = () => {}
  ) {
    var params = { email: email, password: password }
    axios
      .post('/api/authenticate', params)
      .then(res => {
        this.state.user = res.data.user
        this.state.authenticated = true
        successCb()
      })
      .catch(e => {
        console.error(e)
        errorCb()
      })
  },

  // To log out, we just need to remove the token
  logout(successCb: Function = () => {}, errorCb: Function = () => {}) {
    axios
      .get('/api/logout')
      .then(() => {
        localStorage.removeItem('jwt-token')
        this.state.authenticated = false
        successCb()
      })
      .catch(() => {
        errorCb()
      })
  },

  setCurrentUser() {
    let self = this
    axios.get('me').then(res => {
      self.state.user = res.data.user
      self.state.authenticated = true
    })
  },

  /**
   * Init the store.
   */
  init() {
    this.setCurrentUser()
  },
}

import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { History } from 'history'
import userStore from '../store/user/userStore'

// interface ILoginProps extends RouteComponentProps<{}> {
interface ILoginProps {
  refreshUserState: Function
  history: History
}
interface ILoginState {
  email: string
  password: string
  showAlert: boolean
  alertMessage: string
  userState: any
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showAlert: false,
      alertMessage: '',
      userState: userStore.state,
    }

    this.login = this.login.bind(this)
    this.input = this.input.bind(this)
    // this.props.refreshUserState
  }

  private login() {
    let self = this
    userStore.login(
      self.state.email,
      self.state.password,
      () => {
        self.props.refreshUserState(self.state.userState)
        self.props.history.push('/')
      },
      () => {
        self.setState({
          showAlert: true,
          alertMessage: 'Wrong email or password.',
        })
      }
    )
  }

  private input(event: React.FormEvent<HTMLInputElement>) {
    let value = event.currentTarget.value
    switch (event.currentTarget.name) {
      case 'email':
        this.setState({ email: value })
        break
      case 'password':
        this.setState({ password: value })
        break
    }
  }

  public render() {
    return (
      <div className="container">
        <div className="alert alert-danger" v-role="alert" v-if="showAlert">
          {this.state.alertMessage}
        </div>
        {/* Email or User Name */}
        <label ref="email" className="col-md-4 control-label">
          E-Mail Address
        </label>
        <div className="form-group">
          <div className="col-md-6">
            <input
              name="email"
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.input}
              required
            />
          </div>
        </div>
        {/* Password */}
        <label ref="password" className="col-md-4 control-label">
          Password
        </label>
        <div className="form-group">
          <div className="col-md-6">
            <input
              name="password"
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.input}
              required
            />
          </div>
        </div>
        {/* Login Button */}
        <div className="col-md-8 col-md-offset-4">
          <button
            onClick={this.login}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = null
// const mapStateToProps = ({ talks }: ApplicationState) => ({
//   loading: talks.loading,
//   errors: talks.errors,
//   data: talks.data,
// })

const mapDispatchToProps = {
  // fetchTalks,
  // insertTalk,
  // deleteTalk,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

import * as React from 'react'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { History } from 'history'

import { history } from '../utils'
import { ApplicationState, ConnectedReduxProps } from '../store'
import { AuthState, User } from '../store/auth/types'
import { login } from '../store/auth/actions'

// interface ILoginProps extends RouteComponentProps<{}> {
interface ILoginProps {
  // refreshUserState: Function
  // history: History
}
// Login Form
interface ILoginState {
  email: string
  password: string
  showAlert: boolean
  alertMessage: string
}

interface IPropsFromState extends AuthState {}
interface IPropsFromDispatch {
  login: typeof login
}
type IProps = IPropsFromState & IPropsFromDispatch & ILoginProps

class Login extends React.Component<IProps, ILoginState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showAlert: false,
      alertMessage: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget
    switch (name) {
      case 'email':
        this.setState({ email: value })
        break
      case 'password':
        this.setState({ password: value })
        break
    }
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    this.props.login(this.state.email, this.state.password)
    // userStore.login(
    //   self.state.email,
    //   self.state.password,
    //   () => {
    //     self.props.refreshUserState(self.state.userState)
    //     self.props.history.push('/')
    //   },
    //   () => {
    //     self.setState({
    //       showAlert: true,
    //       alertMessage: 'Wrong email or password.',
    //     })
    //   }
    // )
  }

  public render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          {/* Login Button */}
          <div className="col-md-8 col-md-offset-4">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  loading: auth.loading,
  errors: auth.errors,
  user: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      login,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

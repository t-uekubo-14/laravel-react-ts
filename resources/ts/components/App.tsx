import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'
import { ConnectedRouter } from 'connected-react-router'

import { history } from '../utils'
import { PrivateRoute } from './common'
import { ApplicationState } from '../store'
import { User } from '../store/auth/types'
import { logout, getMe } from '../store/auth/actions'

import { IContainer } from './Header'
import Header from './Header'
import Welcome from './Welcome'
import Dashboard from './Dashboard'
import Talks from './Talks'
import Users from './Users'
import Login from './Login'

interface IPropsFromState {
  authenticated: boolean
  user: User
}
interface IPropsFromDispatch {
  logout: typeof logout
  getMe: typeof getMe
}
type IProps = IPropsFromState & IPropsFromDispatch

class App extends React.Component<IProps> {
  private publicPages: IContainer[] = [
    { pathname: '/talk', label: 'Talk', component: Talks },
    { pathname: '/user', label: 'User', component: Users },
  ]

  private privatePages: IContainer[] = [
    { pathname: '/dashboard', label: 'Dashboard', component: Dashboard },
  ]

  public componentDidMount() {
    this.props.getMe()
  }

  public render() {
    const { authenticated, user } = this.props

    return (
      <ConnectedRouter history={history}>
        {/* Header */}
        <Header
          // // refreshUserState={this.refreshUserState}
          containers={this.publicPages}
          // authenticated={authenticated}
          // user={user}
          // // logout={logout}
        />

        {/* Container */}
        <main>
          <Route exact path="/" component={Welcome} />
          {this.publicPages.map((c, i) => (
            <Route exact key={i} path={c.pathname} component={c.component} />
          ))}
          {this.privatePages.map((c, i) => (
            <PrivateRoute
              exact
              key={i}
              path={c.pathname}
              authenticated={authenticated}
              component={c.component}
            />
          ))}
          <Route
            path="/login"
            render={() => (
              <Login
                // refreshUserState={this.refreshUserState}
                authenticated={authenticated}
                {...this.props}
              />
            )}
          />
        </main>

        <Route>
          <section>
            <h3>Debug Information</h3>
            <div>
              {authenticated ? JSON.stringify(user) : 'Un authenticated'}
            </div>
          </section>
        </Route>

        {/* Footer */}
        <footer>&copy; 2019 t-uekubo-14</footer>
      </ConnectedRouter>
    )
  }
}

// Containers
// ----------

const mapStateToProps = ({ auth }: ApplicationState) => ({
  authenticated: auth.authenticated,
  user: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators({ logout, getMe }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

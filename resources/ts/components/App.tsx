import * as React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom'

import userStore from '../store/user/userStore'

import { Home } from '../containers/Home'
import { Header, IHeaderProps, IContainer } from './Header'
import ExampleTalks from '../containers/ExampleTalks'
import { UsersContainer } from '../containers/UsersContainer'
import Login from '../containers/Login'
import { History } from 'history'

export interface IAppProps {
  history: History
}
export class App extends React.Component<IAppProps, { userState: any }> {
  constructor(props: IAppProps) {
    super(props)

    userStore.init()

    this.state = {
      userState: userStore.state,
    }
    this.refreshUserState = this.refreshUserState.bind(this)
  }
  private refreshUserState(userState: any) {
    this.setState({ userState })
  }
  private containers: IContainer[] = [
    { pathname: '/example', label: 'Example', component: ExampleTalks },
    { pathname: '/user', label: 'User', component: UsersContainer },
    // { id: 2, pathname: '/topics', label: 'Topics' },
  ]
  public render() {
    return (
      <BrowserRouter>
        {/* Header */}
        <Header
          refreshUserState={this.refreshUserState}
          containers={this.containers}
          {...this.props}
        />

        {/* Container */}
        <main>
          <Route exact path="/" component={Home} />
          {this.containers.map((c, i) => (
            <Route key={i} path={c.pathname} component={c.component} />
          ))}
          <Route
            path="/login"
            render={() => (
              <Login refreshUserState={this.refreshUserState} {...this.props} />
            )}
          />
        </main>

        <Route>
          <section>
            <h3>Debug Information</h3>
            <div>
              {this.state.userState.authenticated
                ? this.state.userState.user.name
                : 'Un authenticated'}
            </div>
          </section>
        </Route>

        {/* Footer */}
        <footer>&copy; 2019 t-uekubo-14</footer>
      </BrowserRouter>
    )
  }
}

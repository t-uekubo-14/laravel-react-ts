import * as React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import userStore from '../stores/userStore'

export interface IContainer {
  // id: number
  label: string
  pathname: string
  component: any //React.Component
}

const ContainerLink: React.FC<IContainer> = props => {
  return (
    <li className={window.location.pathname === props.pathname ? 'active' : ''}>
      <Link to={props.pathname}>{props.label}</Link>
    </li>
  )
}

export interface IHeaderProps extends RouteComponentProps<{}> {
  refreshUserState: Function
  containers: IContainer[]
}

export interface IHeaderState {
  userState: any
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props)
    this.state = {
      userState: userStore.state,
    }
    // this.refreshUserState = this.refreshUserState
  }
  private logout() {
    let self = this
    userStore.logout(() => {
      self.props.history.push('/home')
    })
  }
  public render() {
    return (
      <header>
        {/* Brand Logo */}
        <div className="brand">
          <Link to="/">LOGO</Link>
        </div>

        {/* Header Navigations */}
        <nav>
          <ul>
            {this.props.containers.map((c, i) => (
              <ContainerLink key={i} {...c} />
            ))}
            {/* Login or Logout */}
            {this.state.userState.authenticated ? (
              <li>
                <a onClick={this.logout}>Logout</a>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header)

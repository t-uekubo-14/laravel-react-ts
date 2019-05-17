import * as React from 'react'
import { Link } from 'react-router-dom'

import HeaderNavLink from './HeaderNavLink'
import { User } from '../../store/auth/types'
import { logout } from '../../store/auth/actions'

export interface IContainer {
  // id: number
  label: string
  pathname: string
  component: any //React.Component
}

interface IOwnProps {
  containers: IContainer[]
}
interface IPorpsFromState {
  authenticated: boolean
  user: User
}
interface IPorpsFromDispatch {
  logout: typeof logout
}
type IProps = IOwnProps & IPorpsFromState & IPorpsFromDispatch

const Header: React.FC<IProps> = ({
  authenticated,
  containers,
  user,
  logout,
}) => {
  return (
    <header>
      {/* Brand Logo */}
      <div className="brand">
        <Link to="/">LOGO</Link>
      </div>

      {/* Header Navigations */}
      <nav>
        <ul>
          {containers.map((c, i) => (
            <HeaderNavLink key={i} {...c} />
          ))}

          {/* Login or Logout */}
          {authenticated ? (
            <li>
              {/* <a onClick={this.handleClickLogout}>Logout</a> */}
              <a onClick={logout}>Logout</a>
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
export default Header

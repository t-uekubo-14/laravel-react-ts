import * as React from 'react'
import { Link } from 'react-router-dom'

interface IContainer {
  id: number
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

interface IProps {
  containers: IContainer[]
}

export class Header extends React.Component<IProps, {}> {
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
            {this.props.containers.map(c => (
              <ContainerLink key={c.id} {...c} />
            ))}
          </ul>
        </nav>
      </header>
    )
  }
}

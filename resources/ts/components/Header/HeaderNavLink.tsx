import * as React from 'react'
import { Link } from 'react-router-dom'

interface IOwnProps {
  pathname: string
  label: string
}

const HeaderNavLink: React.FC<IOwnProps> = ({ pathname, label }) => {
  const isActive = window.location.pathname === pathname
  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={pathname}>{label}</Link>
    </li>
  )
}

export default HeaderNavLink

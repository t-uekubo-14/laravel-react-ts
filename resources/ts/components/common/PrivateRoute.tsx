import * as React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface IProps extends RouteProps {
  authenticated: boolean
  // tslint:disable-next-line:no-any
  component: any
}

export const PrivateRoute: React.FC<IProps> = props => {
  const { component: Component, authenticated, location, ...rest } = props

  return (
    <Route
      {...rest}
      render={routeProps =>
        authenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: routeProps.location } }}
          />
        )
      }
    />
  )
}

import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators, Dispatch, Action } from 'redux'

import { ApplicationState } from '../../store'
import { logout } from '../../store/auth/actions'
import Header, { IContainer } from './Header'

interface IOwnProps {
  containers: IContainer[]
}

const mapStateToProps = ({ auth }: ApplicationState, ownProps: IOwnProps) => ({
  authenticated: auth.authenticated,
  user: auth.user,
  containers: ownProps.containers,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators({ logout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

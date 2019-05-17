import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'

import { ApplicationState, ConnectedReduxProps } from '../store'
import { User } from '../store/auth/types'

interface IPropsFromState {
  authenticated: boolean
  user: User
}
interface IPropsFromDispatch {}
type IProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps

class Dashboard extends React.Component<IProps> {
  public render() {
    const { user } = this.props
    return <div>Hello, {user ? user.name : 'a Member'}</div>
  }
}

// Containers
// ----------

const mapStateToProps = ({ auth }: ApplicationState) => ({
  authenticated: auth.authenticated,
  user: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

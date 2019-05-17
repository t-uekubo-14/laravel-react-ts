import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, Action } from 'redux'

import { ApplicationState } from '../../store'
import {
  inputNewTalk,
  fetchTalks,
  insertTalk,
  deleteTalk,
} from '../../store/talks/actions'
import TalksPage from './TalksPage'

// Containers
// ----------

const mapStateToProps = ({ talks, auth }: ApplicationState) => ({
  loading: talks.loading,
  errors: talks.errors,
  data: talks.data,
  newTalk: talks.newTalk,
  // currentUser: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) =>
  bindActionCreators(
    {
      inputNewTalk,
      fetchTalks,
      insertTalk,
      deleteTalk,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TalksPage)

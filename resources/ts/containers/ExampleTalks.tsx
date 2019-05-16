import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import { Talks } from '../components/Talks'

import { ApplicationState, ConnectedReduxProps } from '../store'
import {
  inputNewTalk,
  fetchTalks,
  insertTalk,
  deleteTalk,
} from '../store/talks/actions'
import { Talk, TalksState } from '../store/talks/types'

interface IPropsFromState extends TalksState {}
interface IPropsFromDispatch {
  inputNewTalk: typeof inputNewTalk
  fetchTalks: typeof fetchTalks
  insertTalk: typeof insertTalk
  deleteTalk: typeof deleteTalk
}
type IProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps

class ExampleTalks extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props)
    this.inputNewTalk = this.inputNewTalk.bind(this)
    this.postNewTalk = this.postNewTalk.bind(this)
    this.deleteTalk = this.deleteTalk.bind(this)
  }

  private postNewTalk() {
    this.props.insertTalk(this.props.newTalk)
  }

  private deleteTalk(talk: Talk) {
    this.props.deleteTalk(talk)
  }

  private inputNewTalk(event: React.FormEvent<HTMLInputElement>) {
    const newTalk = Object.assign({}, this.props.newTalk)
    switch (event.currentTarget.name) {
      case 'message':
        newTalk.message = event.currentTarget.value
    }
    this.props.inputNewTalk(newTalk)
  }

  public componentDidMount() {
    this.props.fetchTalks()
  }

  public render() {
    return (
      <div className="container ExampleTalks">
        <div className="NewTalk row">
          <div className="col-md-8 card">
            <div className="inputGroup">
              <input
                name="message"
                value={this.props.newTalk.message}
                placeholder="新しいメッセージ"
                onChange={this.inputNewTalk}
              />
              <button onClick={this.postNewTalk}>Post</button>
            </div>
          </div>
        </div>
        <div>
          <Talks talks={this.props.data} deleteTalk={this.deleteTalk} />
        </div>
      </div>
    )
  }
}

// Containers
// ----------

const mapStateToProps = ({ talks }: ApplicationState) => ({
  loading: talks.loading,
  errors: talks.errors,
  data: talks.data,
  newTalk: talks.newTalk,
})

const mapDispatchToProps = (dispatch: Dispatch) =>
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
)(ExampleTalks)

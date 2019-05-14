import * as React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Talks, ITalksProps } from '../components/Talks'

import { ApplicationState, ConnectedReduxProps } from '../store'
import {
  fetchTalks,
  insertTalkRequest,
  deleteTalkRequest,
} from '../store/talks/actions'
import { Talk, TalksState } from '../store/talks/types'

interface IExampleState {
  // talks: Talk[]
  newTalk: Talk
}

interface IPropsFromState extends TalksState {}
interface IPropsFromDispatch {
  fetchTalks: typeof fetchTalks
}

type IProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps

class ExampleTalks extends React.Component<IProps, IExampleState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      // talks: [],
      newTalk: { message: '' } as Talk,
    }
    this.inputNewTalk = this.inputNewTalk.bind(this)
    this.postNewTalk = this.postNewTalk.bind(this)
    this.deleteTalk = this.deleteTalk.bind(this)
  }

  // private handleAddTalk() {
  //   this.props.insertTalk(this.state.newTalk)
  //   this.setState({ newTalk: { message: '' } as Talk })
  // }

  private postNewTalk() {
    axios
      .post('/api/talk', {
        message: this.state.newTalk.message,
      })
      .then(res => {
        this.setState({
          // talks: res.data,
          newTalk: { message: '' } as Talk,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  private deleteTalk(talk: Talk) {
    axios
      .delete(`/api/talk/${talk.id}`, { data: talk })
      .then(res => {
        this.setState({
          // talks: res.data,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  private inputNewTalk(event: React.FormEvent<HTMLInputElement>) {
    switch (event.currentTarget.name) {
      case 'message':
        this.state.newTalk.message = event.currentTarget.value
        this.setState({ newTalk: this.state.newTalk })
    }
  }

  public componentDidMount() {
    this.props.fetchTalks()
    // axios
    //   .get('/api/talk')
    //   .then(res => {
    //     console.info(res)
    //     this.setState({
    //       talks: res.data,
    //     })
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
  }

  public render() {
    return (
      <div className="container ExampleTalks">
        <div className="NewTalk row">
          <div className="col-md-8 card">
            <div className="inputGroup">
              <input
                name="message"
                value={this.state.newTalk.message}
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

const mapStateToProps = ({ talks }: ApplicationState) => ({
  loading: talks.loading,
  errors: talks.errors,
  data: talks.data,
})

const mapDispatchToProps = {
  fetchTalks,
  insertTalkRequest,
  deleteTalkRequest,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleTalks)

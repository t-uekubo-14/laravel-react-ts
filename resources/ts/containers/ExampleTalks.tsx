import * as React from 'react'
import { Talks, ITalksProps, ITalk } from '../components/Talks'
import axios from 'axios'

interface IExampleState {
  talks: ITalk[]
  newTalk: ITalk
}

export class ExampleTalks extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      talks: [],
      newTalk: { message: '' } as ITalk,
    }
    this.inputNewTalk = this.inputNewTalk.bind(this)
    this.postNewTalk = this.postNewTalk.bind(this)
    this.deleteTalk = this.deleteTalk.bind(this)
  }

  private postNewTalk() {
    console.info({
      message: this.state.newTalk.message,
    })
    axios
      .post('/api/talk', {
        message: this.state.newTalk.message,
      })
      .then(res => {
        this.setState({
          talks: res.data,
          newTalk: { message: '' } as ITalk,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  private deleteTalk(talk: ITalk) {
    axios
      .delete(`/api/talk/${talk.id}`, { data: talk })
      .then(res => {
        this.setState({
          talks: res.data,
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
    axios
      .get('/api/talk')
      .then(res => {
        console.info(res)
        this.setState({
          talks: res.data,
        })
      })
      .catch(e => {
        console.error(e)
      })
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
          <Talks talks={this.state.talks} deleteTalk={this.deleteTalk} />
        </div>
      </div>
    )
  }
}

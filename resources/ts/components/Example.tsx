import * as React from 'react'
import { Talks } from './Talks'
import axios from 'axios'

interface ITalk {
  id: number
  message: string
}

interface IExampleState {
  talks: ITalk[]
}

export class Example extends React.Component<{}, IExampleState> {
  constructor(state: IExampleState) {
    super(state)
    this.state = {
      talks: [],
    }
  }

  public componentDidMount() {
    // axios
    //   .get('/api/talks')
    //   .then(res => {
    //     this.setState({
    //       talks: res.data,
    //     })
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
    this.setState({
      talks: [
        { id: 1, message: 'Hello, React!' },
        { id: 2, message: 'Hello, TypeScript!' },
      ],
    })
  }

  public render() {
    return (
      <div className="container">
        <div>フォーム</div>
        <div>
          リスト（タイムラインのイメージ）
          <Talks talks={this.state.talks} />
        </div>
      </div>
    )
  }
}

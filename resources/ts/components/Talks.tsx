import * as React from 'react'

interface ITalk {
  id: number
  message: string
}

interface ITalks {
  talks: ITalk[]
}

export class Talk extends React.Component<ITalk, {}> {
  public render() {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">{this.props.id}</div>
            <div className="card-body">{this.props.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export class Talks extends React.Component<ITalks, {}> {
  public render() {
    const talks = this.props.talks.map(talk => <Talk key={talk.id} {...talk} />)

    return <ul>{talks}</ul>
  }
}

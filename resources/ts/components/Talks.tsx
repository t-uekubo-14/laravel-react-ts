import * as React from 'react'

export interface ITalk {
  id: number
  message: string
  contributer: number
  created_at: Date
}

interface ITalkProps extends ITalk {
  deleteTalk: Function
}

export class Talk extends React.Component<ITalkProps, {}> {
  public render() {
    return (
      <div className="row justify-content-center Talks">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              {/* Who, When, Option */}
              <p className="title">
                {this.props.contributer} {this.props.created_at}
              </p>
              {/* Shortcut Options (Reply, Delete) */}
              <div className="functions">
                <button
                  className="btn btn-secondary"
                  onClick={() => this.props.deleteTalk(this.props)}
                >
                  削除
                </button>
              </div>
            </div>

            {/* Message */}
            <div className="card-body">
              <pre>{this.props.message}</pre>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export interface ITalksProps {
  talks: ITalk[]
  deleteTalk: Function
}

export class Talks extends React.Component<ITalksProps, {}> {
  public render() {
    const deleteTalk = (talk: ITalk) => this.props.deleteTalk(talk)
    return (
      <div>
        {this.props.talks.map(talk => (
          <Talk key={talk.id} deleteTalk={deleteTalk} {...talk} />
        ))}
      </div>
    )
  }
}

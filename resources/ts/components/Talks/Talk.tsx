import * as React from 'react'
import dayjs from 'dayjs'

import { Talk as ITalk } from '../../store/talks/types'

interface IOwnProps {
  deleteTalk: Function
}

const Talk: React.FC<ITalk & IOwnProps> = props => {
  const {
    id,
    message,
    contributer_id,
    contributer_name,
    created_at,
    deleteTalk,
  } = props

  return (
    <div className="row justify-content-center Talks">
      <div className="col-md-8">
        <div className="card">
          <div className="card-header">
            {/* Who, When, Option */}
            <p className="title">
              {contributer_name +
                ' : ' +
                dayjs(created_at).format('MM/DD hh:mm')}
            </p>
            {/* Shortcut Options (Reply, Delete) */}
            <div className="functions">
              <button
                className="btn btn-secondary"
                onClick={() => deleteTalk(props)}
              >
                削除
              </button>
            </div>
          </div>

          {/* Message */}
          <div className="card-body">
            <pre>{message}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Talk

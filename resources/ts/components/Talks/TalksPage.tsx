import * as React from 'react'

import Talk from './Talk'

import { ConnectedReduxProps } from '../../store'
import {
  inputNewTalk,
  fetchTalks,
  insertTalk,
  deleteTalk,
} from '../../store/talks/actions'
import { TalksState } from '../../store/talks/types'
import { User } from '../../store/auth/types'

interface IPropsFromState extends TalksState {
  currentUser: User
}
interface IPropsFromDispatch {
  inputNewTalk: typeof inputNewTalk
  fetchTalks: typeof fetchTalks
  insertTalk: typeof insertTalk
  deleteTalk: typeof deleteTalk
}
type IProps = IPropsFromState & IPropsFromDispatch & ConnectedReduxProps

const TalksPage: React.FC<IProps> = ({
  // currentUser,
  newTalk,
  data,
  inputNewTalk,
  fetchTalks,
  insertTalk,
  deleteTalk,
}) => {
  // Lifecycle 処理 (instead of componentDidMount)
  // 第２引数に [] を渡さないと非同期処理による state 書き換えが発生し無限ループに突入する。
  React.useEffect(() => {
    fetchTalks()
  }, [])

  // Change Event
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const talk = Object.assign({}, newTalk)
    switch (event.currentTarget.name) {
      case 'message':
        talk.message = event.currentTarget.value
    }
    inputNewTalk(talk)
  }

  return (
    <div className="container ExampleTalks">
      <div className="NewTalk row">
        <div className="col-md-8 card">
          <div className="inputGroup">
            <input
              name="message"
              value={newTalk.message}
              placeholder="新しいメッセージ"
              onChange={handleChange}
            />
            <button onClick={() => insertTalk(newTalk)}>Post</button>
          </div>
        </div>
      </div>
      <div>
        {data ? (
          data.map(talk => (
            <Talk key={talk.id} deleteTalk={deleteTalk} {...talk} />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}

export default TalksPage

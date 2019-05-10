import * as React from 'react'
import { Users, IUser } from '../components/Users'
import axios from 'axios'

interface IExampleState {
  users: IUser[]
  newUser: IUser
}

export class UsersContainer extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      users: [],
      newUser: { name: '' } as IUser,
    }
    this.inputNewUser = this.inputNewUser.bind(this)
    this.postNewUser = this.postNewUser.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  private postNewUser() {
    console.info({
      message: this.state.newUser.name,
    })
    axios
      .post('/api/user', {
        message: this.state.newUser.name,
      })
      .then(res => {
        this.setState({
          users: res.data,
          newUser: { name: '' } as IUser,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  private deleteUser(user: IUser) {
    axios
      .delete(`/api/user/${user.id}`, { data: user })
      .then(res => {
        this.setState({
          users: res.data,
        })
      })
      .catch(e => {
        console.error(e)
      })
  }

  private inputNewUser(event: React.FormEvent<HTMLInputElement>) {
    switch (event.currentTarget.name) {
      case 'name':
        this.state.newUser.name = event.currentTarget.value
        this.setState({ newUser: this.state.newUser })
    }
  }

  public componentDidMount() {
    axios
      .get('/api/user')
      .then(res => {
        console.info(res)
        this.setState({
          users: res.data,
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
                name="name"
                value={this.state.newUser.name}
                onChange={this.inputNewUser}
              />
              <button onClick={this.postNewUser}>Post</button>
            </div>
          </div>
        </div>
        <div>
          <Users users={this.state.users} deleteUser={this.deleteUser} />
        </div>
      </div>
    )
  }
}

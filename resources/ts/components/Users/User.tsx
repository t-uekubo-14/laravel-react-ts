import * as React from 'react'

export interface IUser {
  id: number
  name: string
  email: string
  email_verified_at: Date
  password: string
  created_at: Date
  updated_at: Date
}

interface IUserProps extends IUser {
  deleteUser: Function
}

export class User extends React.Component<IUserProps, {}> {
  public render() {
    return (
      <div className="row justify-content-center Talks">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              {/* Who, When, Option */}
              <p className="title">
                {this.props.id} : {this.props.name}
              </p>
              {/* Shortcut Options (Reply, Delete) */}
              <div className="functions">
                <button
                  className="btn btn-secondary"
                  onClick={() => this.props.deleteUser(this.props)}
                >
                  削除
                </button>
              </div>
            </div>

            {/* Message */}
            <div className="card-body">
              {[
                { name: 'email', value: this.props.email },
                {
                  name: 'email_verified_at',
                  value: this.props.email_verified_at,
                },
                { name: 'password', value: this.props.password },
                { name: 'created_at', value: this.props.created_at },
                { name: 'updated_at', value: this.props.updated_at },
              ].map((d, i) => (
                <div key={i}>
                  <label>{d.name}</label>&nbsp;:&nbsp;
                  <span>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export interface IUsersProps {
  users: IUser[]
  deleteUser: Function
}

export class Users extends React.Component<IUsersProps, {}> {
  public render() {
    const deleteUser = (user: IUser) => this.props.deleteUser(user)
    return (
      <div>
        {this.props.users.map(user => (
          <User key={user.id} deleteUser={deleteUser} {...user} />
        ))}
      </div>
    )
  }
}

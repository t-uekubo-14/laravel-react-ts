import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

interface IProps {}
interface IState {}

export class Home extends React.Component<IProps, IState> {
  public render() {
    return <div>Welcome to Home!!</div>
  }
}

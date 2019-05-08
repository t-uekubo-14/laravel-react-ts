import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Example } from './Example'

interface IMatch {
  url: string
  path: string
  params: IParams
}
interface IParams {
  id: number
}

const Topic: React.SFC<IMatch> = props => {
  return <h3>Requested Param: {props.params.id}</h3>
}

const Topics: React.SFC<IMatch> = props => {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${props.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${props.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${props.path}/:id`} component={Topic} />
      <Route
        exact
        path={props.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  )
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Logo</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/example">Example</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  )
}

function Home() {
  return <h2>Home</h2>
}

export class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Router>
        <div>
          {/* Header */}
          <Header />

          {/* Contents */}
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/example" component={Example} />
            <Route path="/topics" component={Topics} />
          </main>
        </div>
      </Router>
    )
  }
}

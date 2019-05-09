import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Home } from '../containers/Home'
import { Header } from './Header'
import { ExampleTalks } from '../containers/ExampleTalks'
// import { ExampleTopics } from '../containers/ExampleTopics'

interface IContainer {
  id: number
  label: string
  pathname: string
  component: any //React.Component
}

export class App extends React.Component<{}, {}> {
  private containers: IContainer[] = [
    { id: 1, pathname: '/example', label: 'Example', component: ExampleTalks },
    { id: 2, pathname: '/home', label: 'Home', component: Home },
    // { id: 2, pathname: '/topics', label: 'Topics' },
  ]
  public render() {
    return (
      <Router>
        {/* Header */}
        <Header containers={this.containers} />

        {/* Container */}
        <main>
          <Route exact path="/" component={Home} />
          {this.containers.map(c => (
            <Route key={c.id} path={c.pathname} component={c.component} />
          ))}
          {/* <Route path="/example" component={ExampleTalks} /> */}
          {/* <Route path="/topics" component={ExampleTopics} /> */}
        </main>

        {/* Footer */}
        <footer>&copy;2019 t-uekubo-14</footer>
      </Router>
    )
  }
}

import * as React from 'react'
import { Hello } from './Hello'

export class Example extends React.Component {
  public render() {
    return (
      <div className="container">
        {/* Hello Component */}
        <Hello compiler="TypeScript" framework="React" />
        {/* Example Body */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Example Component</div>
              <div className="card-body">I'm an example component!</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

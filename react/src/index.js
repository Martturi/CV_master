import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/users/:uid/cvs/:cvid" component={App} />
        <Route
          exact
          path="/"
          render={props => <App {...props} extra />}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

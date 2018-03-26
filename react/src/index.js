import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './history'
import './index.css'
import App from './components/App'
import Api from './Api'
import store from './store'
import NotFound from './components/NotFound'

class Child extends React.Component {
  state = { uid: '', cvid: '' }
  async componentDidMount() {
    const uid = await Api.loadCurrentUser()
    const cvs = await Api.loadCVList(uid)
    const cvid = cvs[0].cv_id
    this.setState({ uid, cvid }) // eslint-disable-line
  }
  render() {
    if (this.state.uid === '' || this.state.cvid === '') {
      return null
    }
    return <Redirect to={`users/${this.state.uid}/${this.state.cvid}`} />
  }
}

// 404 page not yet working for invalid uid or cvid
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/users/:uid/:cvid" component={App} />
        <Route exact path="/users/:uid" component={App} />
        <Route exact path="/" component={Child} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

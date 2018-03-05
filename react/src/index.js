import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App'
import Api from './Api'
import store from './store'

class Child extends React.Component {
  state = { uid: '', cvid: '' }
  async componentDidMount() {
    const uid = await Api.loadCurrentUser()
    const cvs = await Api.loadCVList(uid)
    const cvid = cvs[0].cv_id
    this.setState({ uid, cvid })
  }
  render() {
    if (this.state.uid === '' || this.state.cvid === '') {
      return null
    }
    return <Redirect to={`users/${this.state.uid}/cvs/${this.state.cvid}`} />
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/users/:uid/cvs/:cvid" component={App} />
        <Route exact path="/" component={Child} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

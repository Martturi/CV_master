import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './components/App/App'
// import EditorApp from './components/Editor/EditorApp'
import BrowseApp from './components/Browse/BrowseApp'

// import registerServiceWorker from './registerServiceWorker' //Caching is disabled for now.

// ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<EditorApp />, document.getElementById('root'))
ReactDOM.render(<BrowseApp />, document.getElementById('root'))
// registerServiceWorker()

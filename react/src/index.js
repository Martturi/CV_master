import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import App from './components/App'
import EditorApp from './components/EditorApp'

// import registerServiceWorker from './registerServiceWorker' //Caching is disabled for now.

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<EditorApp />, document.getElementById('editor_root'))
// registerServiceWorker()

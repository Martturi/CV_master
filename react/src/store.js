import { createStore } from 'redux'
import CVreducer from './reducers'

let store = createStore(CVreducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store

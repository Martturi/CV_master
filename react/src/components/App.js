import React, { Component } from 'react'
import './App.css'

function SearchField() {
  return (
    <div>
      <input type="text" id="search" />
      <button>Open</button>
    </div>
  )
}

class CVEditor extends Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        console.log(res)
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
    this.render()
  }

  callApi = async () => {
    const response = await fetch('api/0')
    const body = await response.text()
    console.log(body)

    if (response.status !== 200) throw Error(body.message)

    return body
  };

  render() {
    return (
      <div>
        <textarea type="text" rows="10" cols="50" id="textfield" name="textfield" value={this.state.text} />
        <div>
          <button>Save</button>
        </div>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <SearchField />
        <CVEditor />
      </div>
    )
  }
}

export default App

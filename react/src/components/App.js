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
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount() {
    this.loadCV()
      .then(res => {
        console.log(this.props.uid)
        this.setState({ text: res })
      })
      .catch(err => console.log(err))
    this.render()
  }

  loadCV = async () => {
    const response = await fetch(`api/${this.props.uid}`)
    const body = await response.text()
    console.log(body)
    if (response.status !== 200) throw Error(body.message)
    return body
  };

  saveCV = async () => {
    const response = await
      fetch(`api/${this.props.uid}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: this.state.text}),
      })
      if (response.status !== 200) console.log("error")
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  render() {
    return (
      <div>
        <textarea type="text" rows="10" cols="50" id="textfield" name="textfield" value={this.state.text} onChange={e => this.handleChange(e)} />
        <div>
          <button onClick={() => this.saveCV()}>Save</button>
        </div>
      </div>
    )
  }
}

class App extends Component {
  state = {
    uid: '1'
   }

  render() {
    return (
      <div>
        <SearchField />
        <CVEditor
          uid = {this.state.uid}
        />
      </div>
    )
  }
}

export default App

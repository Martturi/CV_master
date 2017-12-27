import React, { Component } from 'react'
import './App.css'

class SearchField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.uid
    }
  }

  handleChange(event) {
    this.props.updateUID(event.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" id="search" value={this.props.uid} onChange={e => this.handleChange(e)} />
        <button onClick={() => this.props.openCV()}>Open</button>
      </div>
    )
  }
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
      })
      .catch(err => console.log(err))
    this.render()
  }

  loadCV = async () => {
    const response = await fetch(`api/${this.props.uid}`)
    const body = await response.text()
    console.log(body)
    if (response.status !== 200) throw Error(body.message)
    this.setState({ text: body })
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
    uid: '0'
   }

  updateUID(newUid) {
    this.setState({uid: newUid})
  }

  openCV() {
    this.refs.cvEditor.loadCV()
  }

  render() {
    return (
      <div>
        <SearchField
          uid = {this.state.uid}
          updateUID = {(uid) => this.updateUID(uid)}
          openCV = {() => this.openCV()}
        />
        <CVEditor ref="cvEditor"
          uid = {this.state.uid}
        />
      </div>
    )
  }
}

export default App

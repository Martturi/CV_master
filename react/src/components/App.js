import React, { Component } from 'react'
import './App.css'
import {saveCV, loadCV} from './Api.js'

class SearchField extends Component {

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
      saveStatus: ''
    }
  }

  handleChange(event) {
    this.props.updateText(event.target.value)
  }


  render() {
    return (
      <div>
        <textarea type="text" rows="10" cols="50" id="textfield" name="textfield" value={this.props.text} onChange={e => this.handleChange(e)} />
        <div>
          <button onClick={this.props.saveCV}>Save</button>
        </div>
        <div id="savestatus">{this.props.saveStatus}</div>
      </div>
    )
  }
}

class App extends Component {
  state = {
    uid: '0',
    text: '',
    saveStatus: ''
  }

  componentDidMount() {
    this.openCV()
    this.render()
  }

  updateUID(newUid) {
    this.setState({uid: newUid})
  }

  updateText(text) {
    this.setState({text: text})
  }

  openCV() {
    loadCV(this.state.uid)
    .then(res => {
      this.setState({text: res})
    })
    .catch(err => console.log(err))
  }

  saveCV() {
    saveCV(this.state.uid, this.state.text)
      .then((res) => this.setState({saveStatus: res}))
      .catch((rej) => this.setState({saveStatus: rej}))
    setTimeout(
      () => {this.setState({saveStatus: ''})},
      3000 )
  }

  render() {
    return (
      <div>
        <SearchField
          uid = {this.state.uid}
          updateUID = {(uid) => this.updateUID(uid)}
          openCV = {() => this.openCV()}
        />
        <CVEditor
          uid = {this.state.uid}
          text = {this.state.text}
          saveStatus = {this.state.saveStatus}
          updateText = {(text) => this.updateText(text)}
          saveCV = {() => this.saveCV()}
        />
      </div>
    )
  }
}

export default App

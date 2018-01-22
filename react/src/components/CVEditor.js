import React, { Component } from 'react'
class CVEditor extends Component {
  handleChange(event) {
    this.props.updateText(event.target.value)
  }
  render() {
    return (
      <div>
        <textarea type="text" rows="10" cols="50" id="textfield" name="textfield" value={this.props.text} onChange={e => this.handleChange(e)} />
        <div>
          <button onClick={this.props.saveCV}>Save</button>
          <button onClick={this.props.fetchPDF}>Export as PDF</button>
        </div>
        <div id="savestatus">{this.props.saveStatus}</div>
      </div>
    )
  }
}
export default CVEditor

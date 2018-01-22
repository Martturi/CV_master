import React, { Component } from 'react'
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
export default SearchField

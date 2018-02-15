import React from 'react'
import { Button } from 'reactstrap'

class CvNameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.cvName,
      editing: false,
    }
  }

  onClick = (event) => {
    event.stopPropagation()
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  enterPressed = (event) => {
    if (event.key === 'Enter') {
      this.saveAndExit()
    }
  }

  saveAndExit = () => {
    const newCVName = this.state.value === '' ? this.props.cvName : this.state.value
    this.props.renameConfirmed(newCVName)
    this.setState({
      editing: false,
      value: newCVName,
    })
  }

  render() {
    if (this.state.editing) {
      return (
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.saveAndExit}
          onClick={this.onClick}
          onKeyUp={this.enterPressed}
        />
      )
    }
    return (
      <div>
        {this.props.cvName}
        <Button outline className="button rename-button" id={`rename${this.props.index}`} onClick={() => this.setState({ editing: true })}>
          <span className="fa fa-pencil" aria-hidden="true" />
        </Button>
      </div>
    )
  }
}

export default CvNameForm

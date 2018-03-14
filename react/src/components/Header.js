import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import {
  updateLanguage,
} from '../actions'


const Header = (props) => {
  return (
    <header className="header">
      {'CV Master '}
      <Button
        className="language_button"
        color="red"
        onClick={() => {
          const newLang = props.language === 'eng' ? 'fin' : 'eng'
          props.updateLanguage(newLang)
        }}
      >
        {`Switch to ${(props.language === 'eng') ? 'FIN' : 'ENG'}`}
      </Button>
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    language: state.language,
  }
}


const mapDispatchToProps = {
  updateLanguage,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)

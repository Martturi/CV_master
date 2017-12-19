import React, { Component } from 'react';
import './App.css';

class SearchField extends Component {
  render() {
    return (
      <div>
        <input type="text" id="search"/>
        <button>Open</button>
      </div>
    )
  }
}

class CVEditor extends Component {
  render() {
    return (
      <div>
        <textarea type="text" rows="10" cols="50" id="textfield" name="textfield"></textarea>
        <div class="form-actions">
          <button class="btn btn-primary">Save</button>
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

export default App;

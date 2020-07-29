import React from 'react';
import logo from './logo.svg';
import './App.css';

const electron = window.require('electron');
const fs = electron.remote.require('fs');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    fs.readdir('.', (err, files) => {
      this.setState({ files });
    });
  }

  render() {
    return <div className="App">
      <header className="App-header">
        {this.state.files.map((x) =>
          <div key={x}>{x}</div>
        )}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>;
  }
}

export default App;

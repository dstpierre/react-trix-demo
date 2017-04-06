import React, { Component } from 'react';

import { TrixEditor } from "react-trix";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      editor: null
    }
  }
  handleChange(html, text) {
    console.log(html, text);
  }
  handleEditorReady(e) {
    this.setState({ editor: e });
    console.log("editor ready");
    console.log(e);
  }
  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <TrixEditor autoFocus={true} onChange={this.handleChange} value="ok"
          onEditorReady={this.handleEditorReady.bind(this)} />
      </div>
    );
  }
}

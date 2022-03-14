import React, { Component } from "react";
import "./App.less";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: ""
    };
  }
  componentDidMount() {
  }
  render() {
    return <div className="wrap">{this.state.html}</div>;
  }
}

export default App;

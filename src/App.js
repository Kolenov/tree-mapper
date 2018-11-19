import React, { Component } from "react";
import Tree from "./components/Tree";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <Tree />
        </div>
      </div>
    );
  }
}

export default App;

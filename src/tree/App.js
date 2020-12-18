import React, { Component } from "react";
// import Querybuilder from "react-sql-query-builder";
import { operators , fields } from './data'
import Tree from './Tree'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields,
      operators
    };
  }
  onChange(data, sql) {
    /* const sqlStart = "select * from where "
    console.log(sqlStart + sql) */
  }
  render() {
    return <div>
      <Tree fields={this.state.fields} operators={this.state.operators} onChange={this.onChange} />
      {/* <Querybuilder
        fields={this.state.fields}
        operators={this.state.operators}
        onChange={this.onChange}
        console={false}
      /> */}
    </div>
  }
}

export default App;

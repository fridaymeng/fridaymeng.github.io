import React, { Component } from "react";
import Querybuilder from "react-sql-query-builder";
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
  onChanges (data, sql) {
  }
  onChange(data, sql) {
    /* const sqlStart = "select * from where "
    console.log(sqlStart + sql) */
  }
  render() {
    return <div>
      <Tree
        console={true}
        fields={this.state.fields}
        operators={this.state.operators}
        onChange={this.onChanges}
      />
      <Querybuilder
        fields={this.state.fields}
        operators={this.state.operators}
        onChange={this.onChange}
        console={false}
      />
    </div>
  }
}

export default App;

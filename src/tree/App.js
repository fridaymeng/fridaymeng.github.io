import React, { Component } from "react";
import QueryBuilder from "react-sql-query-builder";
import { operators , fields } from './data';
const queryBuilder = new QueryBuilder();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields,
      operators
    };
  }
  componentDidMount () {
    const rules = [{
      condition: 'AND',
      id: 0,
      rules: [{
        id: 3,
        operator: 1,
        value: 9
      }, {
        condition: 'OR',
        id: 9,
        rules: [{
          id: 4,
          operator: 2,
          value: 'JAPAN'
        }]
      }]
    }];
    queryBuilder.init({
      rules,
      fields,
      operators,
      id: "wrap-tree",
      handleChange: (rules) => {
        // console.log(rules)
      }
    })
  }
  onChanges (data, sql) {
  }
  onChange(data, sql) {
    /* const sqlStart = "select * from where "
    console.log(sqlStart + sql) */
  }
  render() {
    return <div id="wrap-tree">
    </div>
  }
}

export default App;

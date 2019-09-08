import React, { Component } from 'react'
// import Querybuilder from 'react-sql-query-builder'
import Tree from './Tree'

class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      fields : [
        { name: 'ID', id : 1},
        { name: 'User', id: 2 }, 
        { name: 'Age', id: 3 }, 
        { name: 'Nation', id: 4 }, 
        { name: 'Date Picker', id: 5 ,type : "DatePicker"}, 
        { name: 'Month Picker', id: 6 ,type : "MonthPicker"}, 
        { name: 'Range Picker', id: 7 ,type : "RangePicker"}
      ],
      operators : [
        { name: 'equal', id: 1, symbol: '=' },
        { name: 'not equal', id: 2, symbol: '!=' },
        { name: 'is not null', id: 3, symbol: 'is not null' },
        { name: 'is null', id: 4, symbol: 'is null' },
        { name: 'in', id: 5, symbol: 'in' },
        { name: 'not in', id: 6, symbol: 'not in' },
        { name: 'less', id: 7, symbol: 'less' },
        { name: 'less or equal', id: 8, symbol: 'less or equal' },
        { name: 'greater', id: 9, symbol: 'greater' },
        { name: 'greater or equal', id: 10, symbol: 'greater or equal' }
      ]  
    }
  }
  onChange(data) {
    // console.log(data)
  }
  render() {
    return <Tree fields={this.state.fields} operators={this.state.operators} onChange={this.onChange} />
    // return <Querybuilder onChange={this.onChange}></Querybuilder>
  }
}

export default App

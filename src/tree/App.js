import React, { Component } from 'react'
import Querybuilder from 'react-sql-query-builder'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onChangeFunc(data) {
    //console.log(data)
  }
  render() {
    return <Querybuilder onChangeFunc={this.onChangeFunc}></Querybuilder>
  }
}

export default App

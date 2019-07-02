import React, { Component } from 'react'
import Querybuilder from 'react-sql-query-builder'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  onChange(data) {
    console.log(data)
  }
  render() {
    return <Querybuilder onChange={this.onChange}></Querybuilder>
  }
}

export default App

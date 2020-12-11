import React,{ Component } from 'react';
import * as d3 from "d3";
import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      radius: 100,
      lineX2: 0,
      lineY2: 0,
      wrapG: {},
      width: 1000,
      data: [],
      path: ''
    }
    this.startRotate = this.startRotate.bind(this);
  }
  componentDidMount(){
    this.setState({
      wrapG: d3.select("#fourier-wrap svg")
    });
    this.startRotate()
  }
  startRotate () {
    let data = this.state.data
    setInterval(() => {
      const angle = (Math.PI / 180) * this.state.num;
      const x2 = Math.cos(angle) * this.state.radius + this.state.radius + 5;
      const y2 = Math.sin(angle) * this.state.radius + this.state.radius + 5;
      data = [{x2, y2}, ...this.state.data];
      // if (this.state.data.length >= 2000) data.pop()
      /* data.forEach((item, index) => {
        item.x2 = x2 + index
        item.y2 = Math.sin((Math.PI / 180) * (this.state.num + index)) * this.state.radius + this.state.radius + 5
      }) */
      let path = `M${this.state.radius + 5} ${this.state.radius + 5}`;
      data.forEach((item, index) => {
        path += ` L${x2 + index} ${Math.sin((Math.PI / 180) * (this.state.num + index)) * this.state.radius + this.state.radius + 5}`
      })
      // path += ` Z`; 闭合曲线
      this.setState({
        num: this.state.num + 1,
        width: 1000 + this.state.data.length,
        lineX2: x2,
        lineY2: y2,
        data,
        path
      })
    }, 1000/144)
  }
  render() {
    /* var items = [];
    this.state.data.forEach((item, index) => {
      items.push(<circle key={index} className="circlepoint" r='1' cx={item.x2} cy={item.y2}></circle>);
    }) */
    return <div id="fourier-wrap" style={{ 
      "height" : "400px",
      "width" : "100%",
      "overflowX" : "scroll"
    }}>
      <svg>
        <circle className="circles" r={this.state.radius} cx={this.state.radius + 5} cy={this.state.radius + 5}></circle>
        <line className="lines" x1={this.state.radius + 5} y1={this.state.radius + 5} x2={this.state.lineX2} y2={this.state.lineY2}></line>
        <path className="paths" d={this.state.path}></path>
      </svg>
      <div style={{"width": this.state.width}}>this.state.width</div>
    </div>;
  }
}

export default App;

import React,{ Component } from 'react';
import './App.less';
import * as tf from '@tensorflow/tfjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      radius: 100,
      lineX2: 0,
      lineY2: 0,
      width: 1000,
      data: [],
      path: '',
      path2: ''
    }
    this.startRotate = this.startRotate.bind(this);
    this.startTensorFlow = this.startTensorFlow.bind(this);
  }
  componentDidMount(){
    this.startRotate()
    this.startTensorFlow()
  }
  startTensorFlow () {
    /* 
    * tf.scalar（零维） 
    * tf.tensor1d（一维）
    * tf.tensor2d（二维）
    * tf.tensor3d（三维）
    * tf.tensor4d（四维）
    * tf.ones（值全是1）
    * tf.zeros（值全是0）
    */
   const initialValues = tf.zeros([5]);
   const biases = tf.variable(initialValues); // 初始化biases
   biases.print(); // 输出: [0, 0, 0, 0, 0]

  const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
  biases.assign(updatedValues); // 更新 biases的值
  biases.print(); // 输出: [0, 1, 0, 1, 0]
  }
  startRotate () {
    let data = this.state.data
    setInterval(() => {
      const angle = (Math.PI / 180) * this.state.num;
      const x2 = Math.cos(angle) * this.state.radius + this.state.radius + 5;
      const y2 = Math.sin(angle) * this.state.radius + this.state.radius + 5;
      data = [{x2, y2}, ...this.state.data];
      if (this.state.data.length >= 2000) data.pop()
      let path = '';
      data.forEach((item, index) => {
        if (index === 0) {
          path += `M${x2 + index + this.state.radius*3} ${Math.sin((Math.PI / 180) * (this.state.num + index)) * this.state.radius + this.state.radius + 5}`
        } else {
          path += ` L${x2 + index + this.state.radius*3} ${Math.sin((Math.PI / 180) * (this.state.num + index)) * this.state.radius + this.state.radius + 5}`
        }
      })
      // path += ` Z`; 闭合曲线
      this.setState({
        num: this.state.num + 1,
        width: this.state.data.length,
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
    return <div id="wrap">
        <div id="fourier" style={{ 
        "height" : this.state.radius * 3,
        "width" : "100%",
        "overflowX" : "scroll"
      }}>
        <svg>
          <defs>
            <marker id="Triangle" viewBox="0 0 20 20" refX="0" refY="10"
                markerWidth="10" markerHeight="10" orient="auto">
              <path d="M 0 0 L 20 10 L 0 20 z" />
            </marker>
          </defs>
          <circle className="circles" r={this.state.radius} cx={this.state.radius + 5} cy={this.state.radius + 5}></circle>
          <line className="lines" x1={this.state.radius + 5} y1={this.state.radius + 5} x2={this.state.lineX2} y2={this.state.lineY2}></line>
          <line markerEnd="url(#Triangle)" className="lines2" x1={this.state.lineX2} y1={this.state.lineY2} x2={this.state.lineX2 + this.state.radius*3 - 10} y2={this.state.lineY2}></line>
          <path className="paths" d={this.state.path}></path>
        </svg>
        <div style={{"width": this.state.width}}>{this.state.width}</div>
      </div>
      <div>
        <svg>
          <path className="paths" d={this.state.path2}></path>
        </svg>
      </div>
    </div>;
  }
}

export default App;

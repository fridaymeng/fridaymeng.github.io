import React,{ Component } from 'react';
import './App.less';
import * as tf from '@tensorflow/tfjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      featureData: [],
      layer1Data: [],
      outputData: [],
      path: "M0 400"
    }
    this.startTensorFlow = this.startTensorFlow.bind(this);
  }
  componentDidMount(){
    this.startTensorFlow()
    const featureData = [
      {title: 'X1', id: 1},
      {title: 'X2', id: 2},
      {title: 'X3', id: 3},
      {title: 'Y1', id: 4},
      {title: 'Y2', id: 5},
      {title: 'Y3', id: 6}
    ]
    const layer1Data = [
      {title: 'A', id: 1},
      {title: 'B', id: 2},
      {title: 'C', id: 3}
    ]
    const outputData = [
      {title: 'R', id: 1}
    ]
    this.setState({
      featureData,
      layer1Data,
      outputData
    })
    /* let num = 0
    setInterval(() => {
      num += 1
      const path = this.state.path + ` L${num} ${Math.sin(Math.PI / 45 * num)*50 + 400}`
      this.setState({
        path
      })
    }, 1000/144) */
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
    function predict(input) {
      // y = a * x ^ 2 + b * x + c
      // More on tf.tidy in the next section
      return tf.tidy(() => {
        const x = tf.scalar(input);

        const ax2 = a.mul(x.square());
        const bx = b.mul(x);
        const y = ax2.add(bx).add(c);

        return y;
      });
    }
    //上一篇介绍的 tf.scalar（零维）
    const a = tf.scalar(2);
    const b = tf.scalar(4);
    const c = tf.scalar(8);

    const result = predict(3000000);
    result.print() 
  }
  render() {
    var items = [];
    this.state.featureData.forEach((item, index) => {
      items.push(<g key={Math.random()} transform={`translate(${index}, ${index * 50})`}>
        <rect rx="5" width="100" height="45" className="react"></rect>
        <text y="30" x="20" className="text">{item.title}</text>
        {<path className="paths" d={`M100 ${index + 22} L300 ${index * -50 + 22}`}></path>}
        {index === 4 ? <path className="paths" d={`M100 ${index + 22} L300 ${(index * -40) + 30}`}></path> : ""}
        {index === 5 ? <path className="paths" d={`M100 ${index + 22} L300 ${(index * -30) + 22}`}></path> : ""}
      </g>);
    })
    this.state.layer1Data.forEach((item, index) => {
      items.push(<g key={Math.random()} transform={`translate(${index + 300}, ${index * 50})`}>
        <rect rx="5" width="100" height="45" className="react"></rect>
        <text y="30" x="20" className="text">{item.title}</text>
        <path className="paths" d={`M100 ${index + 22} L300 ${index * -50 + 22}`}></path>
      </g>);
    })
    this.state.outputData.forEach((item, index) => {
      items.push(<g key={Math.random()} transform={`translate(${index + 600}, ${index * 50})`}>
        <rect rx="5" width="100" height="45" className="react"></rect>
        <text y="30" x="20" className="text">{item.title}</text>
      </g>);
    })
    return <div id="wrap">
        <div id="fourier" style={{ 
        "height" : "600px",
        "width" : "100%"
      }}>
        <svg>
          {items}
          <path className="paths" d={this.state.path}></path>
        </svg>
      </div>
    </div>;
  }
}

export default App;

import React,{ Component } from 'react';
import './App.less';
import * as tf from '@tensorflow/tfjs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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
  startRotate () {
    const data = [
      {title: 'dfgsg', id: 0}]
    // path += ` Z`; 闭合曲线
    this.setState({
      data
    })
  }
  render() {
    var items = [];
    this.state.data.forEach((item, index) => {
      items.push(<g key={index} transform={`translate(${index * 150}, 10)`}>
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
          <defs>
            <marker id="Triangle" viewBox="0 0 20 20" refX="0" refY="10"
                markerWidth="10" markerHeight="10" orient="auto">
              <path d="M 0 0 L 20 10 L 0 20 z" />
            </marker>
          </defs>
          {items}
        </svg>
      </div>
    </div>;
  }
}

export default App;

import React, { Component } from 'react';
import * as nodelayout from "nodelayout";
const nodeLayouts = new nodelayout.NodeLayout()
class App extends Component {
  componentDidMount () {
    const nodes = [];
    const lines = [];
    for (let i = 0; i < 10; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 150 * i,
        y: 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    for (let i = 0; i < 9; i ++) { 
      lines.push({
        id: Math.random() + '',
        startIndex: 3,
        endIndex: 1,
        source: nodes[0].id,
        target: nodes[i+1].id
      })
    }
    nodes[0].x = 500
    nodes[0].y = 500
    nodeLayouts.init({
      id: "node-wrap",
      connectType: "line", // path or line
      nodeType: "rect", // rect or circle
      onNodeClick: function (d) {
        console.log(d);
      },
      onPathClick: function (d) {
        console.log(d);
      },
      list: [{
        title: "step1",
        id: "0"
      }, {
        title: "step2",
        id: "1"
      }, {
        title: "step3",
        id: "2"
      }, {
        title: "step4",
        id: "3"
      }, {
        title: "step5",
        id: "4"
      }, {
        title: "step6",
        id: "5"
      }, {
        title: "step7",
        id: "6"
      }],
      nodes,
      lines
    })
    /* function add () {
      nodeLayouts.add({
        title: 'step',
        id: Math.random() + ''
      });
    } */
  }
  add () {
    nodeLayouts.add({
      title: 'step',
      id: Math.random() + ''
    });
  }
  zoomIn () {
    nodeLayouts.zoomIn()
  }
  zoomOut () {
    nodeLayouts.zoomOut()
  }
  reset () {
    nodeLayouts.reset()
  }
  render() {
    return <div>
      <div style={{ "padding": "0 0 10px" }}>
        <button
          onClick={this.add}
          style={{
            "padding": "10px 30px",
            "margin": "5px 0 0 5px",
            "background": "#fff",
            "border": "1px solid #aaa",
            "borderRadius": "5px",
            "cursor": "pointer"
          }}
        >Add</button>
        <button
          onClick={this.zoomIn}
          style={{
            "padding": "10px 30px",
            "margin": "5px 5px 0",
            "background": "#fff",
            "border": "1px solid #aaa",
            "borderRadius": "5px",
            "cursor": "pointer"
          }}
        >ZoomIn</button>
        <button
          onClick={this.zoomOut}
          style={{
            "padding": "10px 30px",
            "margin": "5px 5px 0",
            "background": "#fff",
            "border": "1px solid #aaa",
            "borderRadius": "5px",
            "cursor": "pointer"
          }}
        >ZoomOut</button>
        <button
          onClick={this.reset}
          style={{
            "padding": "10px 30px",
            "margin": "5px 5px 0",
            "background": "#fff",
            "border": "1px solid #aaa",
            "borderRadius": "5px",
            "cursor": "pointer"
          }}
        >Reset</button>
      </div>
      <div id="node-wrap"></div>
    </div>;
  }
}
export default App;
import React, { Component } from 'react';
import * as nodelayout from "nodelayout";
const nodeLayouts = new nodelayout.NodeLayout()
class App extends Component {
  componentDidMount () {
    const nodes = [];
    const lines = [];
    for (let i = 0; i < 6; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 100,
        y: 100 * i + 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    for (let i = 0; i < 4; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 300,
        y: 100 * i + 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    for (let i = 0; i < 5; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 500,
        y: 100 * i + 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    for (let i = 0; i < 3; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 700,
        y: 100 * i + 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    for (let i = 0; i < 2; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 900,
        y: 100 * i + 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    for (let i = 0; i < 1; i ++) {
      const id = Math.random() + '';
      nodes.push({
        id,
        x: 1100,
        y: 100 * i + 100,
        title: Number.parseInt(Math.random() * 1000000)
      })
    }
    lines.push({
      id: Math.random() + '',
      source: nodes[0].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[6].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[0].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[7].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[0].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[8].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[1].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[6].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[2].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[6].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[3].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[6].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[4].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[7].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[5].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[9].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[5].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[6].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[2].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[9].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[3].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[8].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[6].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[10].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[6].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[11].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[6].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[12].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[6].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[13].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[7].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[14].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[7].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[11].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[7].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[12].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[7].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[13].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[7].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[14].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[8].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[10].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[9].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[10].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[9].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[14].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[10].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[15].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[10].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[16].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[10].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[17].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[11].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[15].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[11].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[16].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[12].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[15].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[13].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[15].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[14].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[15].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[15].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[18].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[15].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[19].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[16].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[18].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[17].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[18].id
    })
    lines.push({
      id: Math.random() + '',
      source: nodes[18].id,
      startIndex: 0,
      endIndex: 2,
      target: nodes[20].id
    })
    nodeLayouts.init({
      id: "nodes-wrap",
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
  }
  render() {
    return <div id="nodes-wrap"></div>;
  }
}
export default App;
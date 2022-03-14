import React,{ Component } from 'react';
import * as d3 from "d3";
import './App.less';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0
    }
    // this.startRotate = this.startRotate.bind(this);
  }
  componentDidMount(){
    const graph = {
      nodes: Array.from({length:100}, () => ({})),
      links: []
    }
    graph.nodes.forEach((item, index) => {
      graph.links.push({
        source: Number.parseInt(Math.random() * 100),
        target: index
      })
    })
    const size = getWindowSize()
    const width = size.width
    const height = size.height
    const svg = d3.select("#svg-wrap-force").append("svg").attr("viewBox", [0, 0, width, height]),
      g = svg.append("g"),
      link = g
        .selectAll(".link")
        .data(graph.links)
        .join("line")
        .classed("link", true),
      node = g
        .selectAll(".node")
        .data(graph.nodes)
        .join("circle")
        .attr("r", 5)
        .classed("node", true)
        .classed("fixed", d => d.fx !== undefined)

    svg.call(d3.zoom()
      .extent([[0, 0], [width, height]])
      .scaleExtent([0.1, 8])
      .on("zoom", zoomed))

    function zoomed({transform}) {
      g.attr("transform", transform)
    }

    const simulation = d3
      .forceSimulation()
      .nodes(graph.nodes)
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("link", d3.forceLink(graph.links))
      .on("tick", tick)

    const drag = d3
      .drag()
      .on("start", dragstart)
      .on("drag", dragged)

    node.call(drag).on("click", click)

    function getWindowSize () {
      return {
        height: window.innerHeight,
        width: window.innerWidth
      }
    }

    function tick() {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    }

    function click(event, d) {
      delete d.fx;
      delete d.fy;
      d3.select(this).classed("fixed", false)
      simulation.alpha(1).restart()
    }

    function dragstart() {
      d3.select(this).classed("fixed", true)
    }

    function clamp(x, lo, hi) {
      return x < lo ? lo : x > hi ? hi : x;
    }

    function dragged(event, d) {
      d.fx = clamp(event.x, 0, width)
      d.fy = clamp(event.y, 0, height)
      simulation.alpha(1).restart()
    }
  }
  render() {
    return <div id="svg-wrap-force">
    </div>;
  }
}

export default App;

/* eslint-disable */
import React, { Component } from "react";
import * as d3 from "d3";
import "./App.less";

// https://observablehq.com/collection/@d3/d3-force

/* const data = {
  nodes: [{ x: 469, y: 410 }, { x: 493, y: 364 }],
  links: [{ source: 0, target: 1 }]
}; */

class App extends Component {
  componentDidMount() {
    const width = document.body.clientWidth || 400;
    const height = document.body.clientHeight || 400;
    var nodes = [].concat(
      d3.range(1).map(function() {
        return { r: 10 };
      }),
      d3.range(50).map(function() {
        return { r: 100 };
      }),
      d3.range(100).map(function() {
        return { r: 200 };
      }),
      d3.range(200).map(function() {
        return { r: 300 };
      }),
      d3.range(300).map(function() {
        return { r: 400 };
      })
    );

    var node = d3
      .select("svg")
      .style("width", width)
      .style("height", height)
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 2.5)
      .attr("fill", function(d) {
        return "#00f5ff";
      });

    var simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceCollide().radius(5))
      .force(
        "r",
        d3.forceRadial(function(d) {
          return d.r;
        })
      )
      .on("tick", ticked);

    function ticked() {
      node
        .attr("cx", function(d) {
          return d.x + width / 2;
        })
        .attr("cy", function(d) {
          return d.y + height / 2;
        });
    }
  }
  render() {
    return (
      <div id="drawing">
        <svg id="svg"></svg>
      </div>
    );
  }
}

export default App;

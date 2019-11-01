/* eslint-disable */
import React, { Component } from "react";
import * as d3 from "d3";
import "./App.less";

// https://observablehq.com/collection/@d3/d3-force

const data = {
  nodes: [{ x: 469, y: 410 }, { x: 493, y: 364 }],
  links: [{ source: 0, target: 1 }]
};

class App extends Component {
  componentDidMount() {
    !(function(data) {
      var width = 1800,
        height = 700,
        φ = 100,
        α = 0,
        λ = {},
        num = data.nodes.length;
      var force = d3.layout
        .force()
        .size([width, height])
        .charge(-500)
        .linkDistance(50)
        .on("tick", particleMotion);
      var drag = force.drag().on("dragstart", dragstart);
      var svg = d3
        .select("#svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
      var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");
      +(function() {
        force
          .nodes(data.nodes)
          .links(data.links)
          .start();
        link = link
          .data(data.links)
          .enter()
          .append("line")
          .attr("class", "link");
        node = node
          .data(data.nodes)
          .enter()
          .append("g")
          .on("dblclick", dblclick)
          .call(drag);
        node
          .append("circle")
          .attr("class", "node")
          .attr("r", 9);
        node
          .append("text")
          .attr("x", 12)
          .attr("dy", ".4em")
          .text(function(d) {
            return d.index;
          });
      })();
      function particleMotion() {
        link
          .attr("x1", function(d) {
            return d.source.x;
          })
          .attr("y1", function(d) {
            return d.source.y;
          })
          .attr("x2", function(d) {
            return d.target.x;
          })
          .attr("y2", function(d) {
            return d.target.y;
          });
        node.attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });
        /*node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });*/
      }
      function dblclick(d) {
        d3.select(this).classed("fixed", (d.fixed = false));
      }
      function dragstart(d) {
        d3.select(this).classed("fixed", (d.fixed = true));
      }
      function add() {
        λ = pos();
        data.nodes.push({ x: λ.x, y: λ.y, fixed: true });
        data.links.push({ source: 0, target: num++ });
        force.start();
        link = link.data(data.links);
        link
          .enter()
          .insert("line", ".link")
          .attr("class", "link");
        node = node.data(data.nodes);
        var $node = node
          .enter()
          .insert("g")
          .call(drag);
        $node
          .append("circle")
          .attr("class", "node")
          .attr("r", 10);
        $node
          .append("text")
          .attr("x", 12)
          .attr("dy", ".4em")
          .text(function(d) {
            return d.index;
          });
      }
      function pos() {
        α += Math.PI * 15;
        return {
          x: width / 2 + Math.cos((α * Math.PI) / 180) * φ++,
          y: height / 2 + Math.sin((α * Math.PI) / 180) * φ++
        };
      }
      /*add event*/
      var btn = document.getElementById("svg");
      var keyups = Rx.Observable.fromEvent(btn, "mousedown").subscribe(
        function() {
          add();
          setInterval(function() {
            add();
          }, 200);
        }
      );
    })(data);
  }
  render() {
    return (
      <div
        id="drawing"
        style={{
          height: "800px",
          width: "100%"
        }}
      >
        <svg id="svg"></svg>
      </div>
    );
  }
}

export default App;

/* eslint-disable */
import React, { Component } from "react";
import * as d3 from "d3";
import "./App.less";
import uk from "./uk.json";
import world from "./world.json";

class App extends Component {
  componentDidMount() {
    const width = document.body.clientWidth || 1000;
    const height = document.body.clientHeight || 1000;

    var projection = d3
      .geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2])
      .precision(0.1);

    var path = d3
      .geoPath()
      .projection(projection)
      .pointRadius(2);

    var svg = d3
      .select("#drawing")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    var subunits = topojson.feature(world, world.objects.states);

    var graticule = d3.geoGraticule();
    svg
      .append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

    svg
      .selectAll(".subunit")
      .data(subunits.features)
      .enter()
      .append("path")
      .attr("class", function(d) {
        return "subunit " + d.id;
      })
      .attr("d", path);

    svg
      .append("path")
      .datum(
        topojson.mesh(world, world.objects.states, function(a, b) {
          return a !== b && a.id !== "IRL";
        })
      )
      .attr("d", path)
      .attr("class", "subunit-boundary");

    svg
      .append("path")
      .datum(
        topojson.mesh(world, world.objects.states, function(a, b) {
          return a === b && a.id === "IRL";
        })
      )
      .attr("d", path)
      .attr("class", "subunit-boundary IRL");

    svg
      .selectAll(".subunit-label")
      .data(subunits.features)
      .enter()
      .append("text")
      .attr("class", function(d) {
        return "subunit-label " + d.id;
      })
      .attr("transform", function(d) {
        return "translate(" + path.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .text(function(d) {
        return d.properties.name;
      });
  }
  render() {
    return <div id="drawing"></div>;
  }
}

export default App;

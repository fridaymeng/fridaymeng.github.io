/* eslint-disable */
import React, { Component } from "react";
import * as d3 from "d3";
import "./App.less";
import uk from "./uk.json";

// https://observablehq.com/collection/@d3/d3-force

/* const data = {
  nodes: [{ x: 469, y: 410 }, { x: 493, y: 364 }],
  links: [{ source: 0, target: 1 }]
}; */

class App extends Component {
  componentDidMount() {
    var width = 960,
      height = 1160;

    var projection = d3
      .geoAlbers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(1200 * 5)
      .translate([width / 2, height / 2]);

    var path = d3
      .geoPath()
      .projection(projection)
      .pointRadius(2);

    var svg = d3
      .select("#drawing")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    var subunits = topojson.feature(uk, uk.objects.subunits),
      places = topojson.feature(uk, uk.objects.places);

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
        topojson.mesh(uk, uk.objects.subunits, function(a, b) {
          return a !== b && a.id !== "IRL";
        })
      )
      .attr("d", path)
      .attr("class", "subunit-boundary");

    svg
      .append("path")
      .datum(
        topojson.mesh(uk, uk.objects.subunits, function(a, b) {
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

    svg
      .append("path")
      .datum(places)
      .attr("d", path)
      .attr("class", "place");

    svg
      .selectAll(".place-label")
      .data(places.features)
      .enter()
      .append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) {
        return "translate(" + projection(d.geometry.coordinates) + ")";
      })
      .attr("x", function(d) {
        return d.geometry.coordinates[0] > -1 ? 6 : -6;
      })
      .attr("dy", ".35em")
      .style("text-anchor", function(d) {
        return d.geometry.coordinates[0] > -1 ? "start" : "end";
      })
      .text(function(d) {
        return d.properties.name;
      });
  }
  render() {
    return <div id="drawing"></div>;
  }
}

export default App;

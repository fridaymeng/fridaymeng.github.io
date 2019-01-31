import React,{ Component } from 'react';
import * as d3 from "d3";
import './App.less';

class App extends Component {
  componentDidMount(){
    d3.select("#fractal-wrap svg").call(
        d3.zoom().scaleExtent([.1, 100])
        .on("zoom", svgZoomed)
    );
    const wrapG = d3.select("#fractal-wrap svg")
      .append("g");
    const data = Array(1000);
    setInterval(() => {
      data.push(undefined);
      refresh();
    },1000);
    function refresh(){
      wrapG.selectAll("node")
      .data(data)
      .enter()
      .append("circle")
      .attr("class","circle")
      .attr("r",(d,i) => {
        return 15;
      })
      .attr("cx",(d,i) => {
        if(i%2){
          return -2500*Math.random()*i;
        }else{
          return 2500*Math.random()*i;
        }
      })
      .attr("cy",(d,i) => {
        if(i%2){
          return -2500*Math.random()*i;
        }else{
          return 2500*Math.random()*i;
        }
      })
      .transition()
      .duration(1250)
      .delay(function(d,i){
        return i;
      })
      .attr("cx",(d,i) => {
        return Math.cos(i/Math.PI/2)*200 + 400;
      })
      .attr("cy",(d,i) => {
        return Math.sin(i/Math.PI/2)*200 + 400;
      });
    }
    /*** 放大缩小 ***/
    function svgZoomed() {
      wrapG.attr("transform", d3.event.transform);
    }
  }
  render() {
    return <div id="fractal-wrap" style={{ 
      "height" : "1000px",
      "width" : "100%"
    }}>
      <svg></svg>
    </div>;
  }
}

export default App;

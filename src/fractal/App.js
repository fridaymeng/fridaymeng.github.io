import React,{ Component } from 'react';
import * as d3 from "d3";
import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval : 0
    }
  }
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  componentDidMount(){
    d3.select("#fractal-wrap svg").call(
        d3.zoom().scaleExtent([.1, 100])
        .on("zoom", svgZoomed)
    );
    let wrapG = d3.select("#fractal-wrap svg")
        .append("g")
        .attr("transform","rotate(180)");
    refresh();
    /* this.setState({
      interval : $interval
    }); */
    function refresh(){
      /* 
      const data = Array(2000);
      wrapG.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class","circle")
      .attr("r",(d,i) => {
        return 15;
      })
      .attr("cx",(d,i) => {
        if(i%2){
          return -0.25*(1+4*i-(1+2*i)*Math.cos(Math.PI*i));
        }else{
          return 0.25*(1+4*i-(1+2*i)*Math.cos(Math.PI*i));
        }
      })
      .attr("cy",(d,i) => {
        if(i%2){
          return 0.25*(1+4*i-(1+2*i)*Math.cos(Math.PI*i));
        }else{
          return -0.25*(1+4*i-(1+2*i)*Math.cos(Math.PI*i));
        }
      })
      .transition()
      .duration(1550)
      .delay(function(d,i){
        return i;
      })
      .attr("cx",(d,i) => {
        //return Math.random()*1000;
        return (1+.5*i)*Math.cos(i)+800;
        //return Math.cos(i/Math.PI/2)*200 + 400;
      })
      .attr("cy",(d,i) => {
        //return Math.random()*1000;
        return (2+.09*i)*Math.sin(i)+400;
        //return Math.sin(i/Math.PI/2)*200 + 400;
      }); */
      const arr = [
        [0.195,-0.488,0.344,0.433,0.4431,0.2452,0.25],
        [0.462,0.414,-0.252,0.361,0.2511,0.5692,0.25],
        [-0.058,-0.07,0.453,-0.111,0.5976,0.0969,0.25],
        [-0.035,0.07,-0.469,-0.022,0.4884,0.5069,0.2],
        [-0.637,0,0,0.501,0.8562,0.2513,0.05]
      ];
      let data = [];
      let [x0,y0,r] = [1,1,0];
      for(let i = 12000; i > 0; i --){
        r = Math.random();
        if(r <= 0.25){
          data.push({
            x : arr[0][0]*x0+arr[0][1]*y0+arr[0][4],
            y : arr[0][2]*x0+arr[0][3]*y0+arr[0][5]
          });
        }else if(r > 0.25 && r <= 0.5){
          data.push({
            x : arr[1][0]*x0+arr[1][1]*y0+arr[1][4],
            y : arr[1][2]*x0+arr[1][3]*y0+arr[1][5]
          });
        }else if(r > 0.5 && r <= 0.75){
          data.push({
            x : arr[2][0]*x0+arr[2][1]*y0+arr[2][4],
            y : arr[2][2]*x0+arr[2][3]*y0+arr[2][5]
          });
        }else if(r > 0.75 && r <= 0.95){
          data.push({
            x : arr[3][0]*x0+arr[3][1]*y0+arr[3][4],
            y : arr[3][2]*x0+arr[3][3]*y0+arr[3][5]
          });
        }else{
          data.push({
            x : arr[4][0]*x0+arr[4][1]*y0+arr[4][4],
            y : arr[4][2]*x0+arr[4][3]*y0+arr[4][5]
          });
        }
        x0 = data[data.length - 1].x;
        y0 = data[data.length - 1].y;
      }
      wrapG.selectAll()
          .data(data)
          .enter()
          .append("circle")
          .attr("class","circle")
          .attr("cx",0)
          .attr("cy",0)
          .transition()
          .duration(800)
          .delay(function(d,i){
            return i;
          })
          .attr("cx",(d,i) => {
            return d.x*500-500;
          })
          .attr("cy",(d,i) => {
            return d.y*500-500;
          })
          .attr("r",1);
    }
    /*** 放大缩小 ***/
    function svgZoomed() {
      wrapG.attr("transform", d3.event.transform+" rotate(180)");
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

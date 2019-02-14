import React,{ Component } from 'react';
import * as d3 from "d3";
import './App.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval : 0,
      coordWave : {
        dot : {
          x : 500,//圆点x坐标
          y : 250,//圆点y坐标
          k : 50,//曲线偏距（y轴）
          a : 50//曲线振幅（x轴）
        }
      }
    }
    this.handleChangeParamsA = this.handleChangeParamsA.bind(this);
    this.handleChangeParamsK = this.handleChangeParamsK.bind(this);
    this.renderSinWave = this.renderSinWave.bind(this);
  }
  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  componentDidMount(){
    d3.select("#fourier-wrap svg").call(
        d3.zoom().scaleExtent([.1, 100])
        .on("zoom", svgZoomed)
    );
    const wrapG = d3.select("#fourier-wrap svg")
      .append("g");
    const coordG = wrapG
      .append("g");
    this.setState({
      coordG : coordG
    },() => {
      this.renderSinWave();
    });
    /*** 绘制箭头 ***/
    let outerDefs = wrapG.append("defs");
    outerDefs
      .append("marker")
      .attr("id", "arrowEnd")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "8")
      .attr("markerHeight", "8")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", "10")
      .attr("refY", "6")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
      .attr("class", "pathArrow");
    outerDefs
      .append("marker")
      .attr("id", "arrowStart")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", "8")
      .attr("markerHeight", "8")
      .attr("viewBox", "0 0 12 12")
      .attr("refX", "0")
      .attr("refY", "6")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M10,2 L2,6 L10,10 L6,6 L10,2")
      .attr("class", "pathArrow");
    /*** 放大缩小 ***/
    function svgZoomed() {
      wrapG.attr("transform", d3.event.transform);
    }
    /* 绘制正弦曲线（点） */
    /* let nodesNums = Array(200);
    let $nums = 0;
    function renderWaveNodes(){
      d3.selectAll("circle.circle").remove();
      for(let i = 0,len = nodesNums.length; i < len; i++) {
          if(i === 0){
            nodesNums[0] = $nums;
          }else{
            nodesNums[i] = nodesNums[i - 1] + 1;
          }
      }
      coordG
        .selectAll()
        .data(nodesNums)
        .enter()
        .append("circle")
        .attr("class","circle")
        .attr("r",1)
        .attr("cx",(d,i) => {
          return 500+i*5;
        })
        .attr("cy",(d,i) => {
          return 300+Math.cos(d/Math.PI)*30;
        });
      $nums++;
    }
    setInterval(() => {
      renderWaveNodes();
    },30); */
  }
  renderSinWave(){
    /* 绘制正弦曲线（实线） */
    const coordWave = this.state.coordWave;
    d3.selectAll("path.path-fill-none").remove();
    d3.selectAll("path.path-coord").remove();
    /* x轴 */
    this.state.coordG
      .append("path")
      .attr("d",`M${coordWave.dot.x-coordWave.dot.a},${coordWave.dot.y} L${coordWave.dot.x+coordWave.dot.a*6.5},${coordWave.dot.y}`)
      .attr("class","path-coord")
      .attr("marker-end", "url(#arrowEnd)");
    /* y轴 */
    this.state.coordG
      .append("path")
      .attr("d",`M${coordWave.dot.x},${-coordWave.dot.k+coordWave.dot.y/3} L${coordWave.dot.x},${coordWave.dot.y*2+coordWave.dot.k}`)
      .attr("class","path-coord")
      .attr("marker-start", "url(#arrowStart)");
    this.state.coordG
      .append("path")
      .attr("class","path-fill-none")
      .attr("d",`M ${coordWave.dot.x},${coordWave.dot.y-coordWave.dot.k} 
      C ${coordWave.dot.x+coordWave.dot.a},${coordWave.dot.y-coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a},${coordWave.dot.y+coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*2},${coordWave.dot.y+coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*3},${coordWave.dot.y+coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*3},${coordWave.dot.y-coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*4},${coordWave.dot.y-coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*5},${coordWave.dot.y-coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*5},${coordWave.dot.y+coordWave.dot.k} 
        ${coordWave.dot.x+coordWave.dot.a*6},${coordWave.dot.y+coordWave.dot.k}`);
  }
  handleChangeParamsK(e){
    let dot = this.state.coordWave.dot;
    dot.k = Number.parseInt(e.target.value,10);
    this.setState({
      coordWave : {
        dot : dot
      }
    },() => {
      this.renderSinWave();
    });
  }
  handleChangeParamsA(e){
    let dot = this.state.coordWave.dot;
    dot.a = Number.parseInt(e.target.value,10);
    this.setState({
      coordWave : {
        dot : dot
      }
    },() => {
      this.renderSinWave();
    });
  }
  render() {
    return <div id="fourier-wrap" style={{ 
      "height" : "1000px",
      "width" : "100%"
    }}>
      偏距：<input value={this.state.coordWave.dot.k} type="number" onChange={this.handleChangeParamsK} />
      振幅：<input value={this.state.coordWave.dot.a} type="number" onChange={this.handleChangeParamsA} />
      <svg></svg>
    </div>;
  }
}

export default App;

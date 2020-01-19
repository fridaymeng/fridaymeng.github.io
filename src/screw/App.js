import React,{ Component } from 'react';
import SVG from "svg.js";
import svgPanZoom from "svg-pan-zoom";
import './App.less';

class App extends Component {
  componentDidMount(){
    var nodeDistri = {
            width : 1800,
          height : 900,
      drawSpiral : function(){
          var draw = SVG('drawings')
            .size('100%', '100%')
            .attr('id', 'networkTopology');
          var masterArr = [],
            coordArr = [],
            coordArr2 = [],
            coordArr3 = [],
            coordArr4 = [],
            coordArr5 = [],
            t = 0,
            t2 = 0,
            t3 = 0,
            t4 = 0,
            t5 = 0,
            r = 0,
            step = 10,
            i;
          masterArr.length = 300;
          let resultCoord = {};
          let resultCoord2 = {};
          let resultCoord3 = {};
          let resultCoord4 = {};
          let resultCoord5 = {};
          for(i = 0; i < masterArr.length; i ++){
            r = .1 * (1 + t);
            resultCoord = this.getCoord(r,t);
            resultCoord2 = this.getCoord(r,t2);
            resultCoord3 = this.getCoord(r,t3);
            resultCoord4 = this.getCoord(r,t4);
            resultCoord5 = this.getCoord(r,t5);
            coordArr[i] = resultCoord;
            coordArr2[i] = resultCoord2;
            coordArr3[i] = resultCoord3;
            coordArr4[i] = resultCoord4;
            coordArr5[i] = resultCoord5;
            this.drawPoint({
                    draw : draw,
                  master : false,
                  pointX : resultCoord.x,
                  pointY : resultCoord.y,
                  startX : 0,
                  startY : this.height/2
            });
            this.drawPoint({
                    draw : draw,
                  master : false,
                  pointX : resultCoord2.x,
                  pointY : resultCoord2.y,
                  startX : this.width/2,
                  startY : this.height/2
            });
            this.drawPoint({
                    draw : draw,
                  master : false,
                  pointX : resultCoord3.x,
                  pointY : resultCoord3.y,
                  startX : this.width,
                  startY : this.height/2
            });
            this.drawPoint({
                    draw : draw,
                  master : false,
                  pointX : resultCoord4.x,
                  pointY : resultCoord4.y,
                  startX : this.width + this.width/2,
                  startY : this.height/2
            });
            this.drawPoint({
                    draw : draw,
                  master : false,
                  pointX : resultCoord5.x,
                  pointY : resultCoord5.y,
                  startX : this.width * 2,
                  startY : this.height/2
            });
            if(i > 1){
              this.drawLine(draw,coordArr[i-1].x,coordArr[i-1].y-150,coordArr[i].x,coordArr[i].y-150);
              this.drawLine(draw,coordArr2[i-1].x+this.width/2,coordArr2[i-1].y-150,coordArr2[i].x+this.width/2,coordArr2[i].y-150);
              this.drawLine(draw,coordArr3[i-1].x+this.width,coordArr3[i-1].y-150,coordArr3[i].x+this.width,coordArr3[i].y-150);
              this.drawLine(draw,coordArr4[i-1].x+this.width + this.width/2,coordArr4[i-1].y-150,coordArr4[i].x+this.width + this.width/2,coordArr4[i].y-150);
              this.drawLine(draw,coordArr5[i-1].x+this.width * 2,coordArr5[i-1].y-150,coordArr5[i].x+this.width * 2,coordArr5[i].y-150);
            }
            t = t + step;
            t2 = t2 + step*.9;
            t3 = t3 + step*.2;
            t4 = t4 + step*.4;
            t5 = t5 + step*.9999;
          }
      },
      drawPoint : function(params){
        params.draw.circle(10).x(params.startX + params.pointX).y(params.startY + params.pointY).fill("#111");
      },
      drawLine : function(draw,x1,y1,x2,y2){
        draw.line(x1, y1, x2, y2).stroke({ width: 1 ,color : "#900"});
      },
      getCoord : function(r,t){
        return {
          x : r * Math.cos(t * 360),
          y : r * Math.sin(t * 360)
        };
      }
      };
      if(SVG.supported){
        nodeDistri.drawSpiral();// create node dirtribution
      }else{
        document.getElementById("drawing").innerHTML = "您的浏览器不支持SVG矢量图！"
      }
      //zoom this drawing
      svgPanZoom('#networkTopology', {
        zoomEnabled : true,
      controlIconsEnabled : true,
              center : true,
            minZoom : .1,
            maxZoom : 1000
      });
  }
  render() {
    return <div id="drawings" style={{ 
      "height" : "800px",
      "width" : "100%"
    }}></div>;
  }
}

export default App;

import React, { Component } from 'react';
import './App.less';

const linkList = [
        {"href": "http://zkboxing.com/calculationx.html","text" : "zkboxing" , "src" : require("../assets/img/zkboxing.png")},
        {"href": "/#/screw","text" : "screw" , "src" : require("../assets/img/screw.png")},
        {"href": "https://www.quora.com/","text" : "quora"},
        {"href": "http://idl.cs.washington.edu/","text" : "Stanford VIS"},
        {"href": "http://blog.jobbole.com/","text" : "伯乐在线"},
        {"href": "https://www.palantir.com/","text" : "palantir"},
        {"href": "http://thenextweb.com/","text" : "TheNextWeb"},
        {"href": "http://visjs.org/","text" : "visjs"},
        {"href": "http://bitwiseshiftleft.github.io/sjcl/doc/","text" : "sjcl加密"},
        {"href": "http://johnny-five.io/","text" : "jsIOT"},
        {"href": "http://www.javascriptoo.com/","text" : "javascriptOO"},
        {"href": "http://www.bing.com/knows/search?q=%E5%88%86%E5%BD%A2%E5%87%A0%E4%BD%95%E5%AD%A6&mkt=zh-cn&FORM=BKACAI","text" : "分形几何学"},
        {"href": "http://www.worldwidetelescope.org/","text" : "worldwidetelescope"},
        {"href": "http://www.cnet.com/","text" : "cNet"},
        {"href": "http://www.scientificamerican.com/","text" : "scientificAmerican"},
        {"href": "http://lodash.com/","text" : "lodash"},
        {"href": "http://marvl.infotech.monash.edu.au/software/","text" : "Monash VIS"},
        {"href": "http://www.tinypng.com/","text" : "tinypng"},
        {"href": "http://todomvc.com/","text" : "todoMVC"},
        {"href": "http://reactivex.io/","text" : "Responsive Programming"},
        {"href": "http://d3js.org/","text" : "d3js"},
        {"href": "http://overapi.com/","text" : "overapi"},
        {"href": "http://www.reactnative.com/","text" : "reactnative"},
        {"href": "http://openprocessing.org/","text" : "openprocessing"},
        {"href": "http://www.deviantart.com/","text" : "deviantart"},
        {"href": "http://techfieldday.com/","text" : "techfieldday"},
        {"href": "http://www.fooplot.com/","text" : "Function Plot"},
        {"href": "http://rxmarbles.com/","text" : "Rxmarbles"},
        {"href": "http://www.zwbk.org/","text" : "中文百科"},
        {"href": "http://senseable.mit.edu/","text" : "MIT Senseable City Lab"},
        {"href": "https://flowingdata.com/","text" : "To understand data and ourselves"},
        {"href": "http://githut.info/","text" : "A SMALL PLACE TO DISCOVER LANGUAGES IN GITHUB"}
];

let $html = linkList.map((item) => {
  return <div className="list-li" key={Math.random()}>
          <div className="list-li-box">
            <div><a rel="noopener noreferrer" href={item.href} target="_blank"><img alt="" src={item.src} /></a></div>
            <div><a rel="noopener noreferrer" href={item.href} target="_blank">{item.text}</a></div>
          </div>
        </div>;
});
$html = <div class="list">{$html}</div>
class App extends Component {
  render() {
    return $html;
  }
}

export default App;

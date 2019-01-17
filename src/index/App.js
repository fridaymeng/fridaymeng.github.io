import React, { Component } from 'react';
import './App.less';

const linkList = [
        {"href": "/screw","text" : "screw" , "src" : require("../assets/img/screw.png")},
        {"href": "/tree","text" : "tree" , "src" : require("../assets/img/tree.png")},
        {"href": "http://zkboxing.com/calculationx.html","text" : "zkboxing" , "src" : require("../assets/img/zkboxing.png")},
        {"href": "/connection","text" : "connection" , "src" : require("../assets/img/connection.png")},
        {"href": "http://idl.cs.washington.edu/","text" : "Stanford VIS"},
        {"href": "https://www.palantir.com/","text" : "palantir"},
        {"href": "http://thenextweb.com/","text" : "TheNextWeb"},
        {"href": "http://visjs.org/","text" : "visjs"},
        {"href": "http://bitwiseshiftleft.github.io/sjcl/doc/","text" : "sjcl加密"},
        {"href": "http://www.javascriptoo.com/","text" : "javascriptOO"},
        {"href": "http://www.bing.com/knows/search?q=%E5%88%86%E5%BD%A2%E5%87%A0%E4%BD%95%E5%AD%A6&mkt=zh-cn&FORM=BKACAI","text" : "分形几何学"},
        {"href": "http://www.worldwidetelescope.org/","text" : "worldwidetelescope"},
        {"href": "http://www.cnet.com/","text" : "cNet"},
        {"href": "http://www.scientificamerican.com/","text" : "scientificAmerican"},
        {"href": "http://marvl.infotech.monash.edu.au/software/","text" : "Monash VIS"},
        {"href": "http://www.tinypng.com/","text" : "tinypng"},
        {"href": "http://reactivex.io/","text" : "Responsive Programming"},
        {"href": "http://overapi.com/","text" : "overapi"},
        {"href": "http://www.reactnative.com/","text" : "reactnative"},
        {"href": "http://openprocessing.org/","text" : "openprocessing"},
        {"href": "http://www.deviantart.com/","text" : "deviantart"},
        {"href": "http://rxmarbles.com/","text" : "Rxmarbles"},
        {"href": "https://robomongo.org/","text" : "mongodb工具库"},
        {"href": "http://senseable.mit.edu/","text" : "MIT Senseable City Lab"},
        {"href": "http://githut.info/","text" : "A SMALL PLACE TO DISCOVER LANGUAGES IN GITHUB"}
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      html : ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    let $html = linkList.map((item) => {
      return <div className="list-li" key={Math.random()}>
              <div className={item.src ? "list-li-box" : "list-li-box list-li-box-no-img"}>
                {item.src ? <div><a onClick={this.handleClick} href="/" rel="noopener noreferrer" data-href={item.href} target="_blank"><img data-href={item.href} alt="" src={item.src} /></a></div> : ""}
                <div><a onClick={this.handleClick} href="/" rel="noopener noreferrer" data-href={item.href} target="_blank" title={item.text}>{item.text}</a></div>
              </div>
            </div>;
    });
    this.setState({
      html : $html
    });
  }
  handleClick(e){
    const $history = this.props.history;
    const $href = e.target.dataset.href;
    if(/http/.test($href)){
      var win = window.open($href, '_blank');
      win.focus(); 
    }else{
      $history.push($href);
    }
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    return <div className="list">{this.state.html}</div>;
  }
}

export default App;

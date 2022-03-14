import React, { Component } from "react";
import "./App.less";

const linkList = [
  { href: "/forcelayout", text: "Force Layout", src: require("../assets/img/forcelayout.png") },
  { href: "/screw", text: "Screw", src: require("../assets/img/screw.png") },
  { href: "/tree", text: "Tree", src: require("../assets/img/tree.jpg") },
  {
    href: "http://zkboxing.com",
    text: "zkboxing",
    src: require("../assets/img/zkboxing.png")
  },
  {
    href: "/connection",
    text: "connection",
    src: require("../assets/img/connection.png")
  },
  {
    href: "/fourier",
    text: "Fourier",
    src: require("../assets/img/fl.png")
  },
  {
    href: "/tensorflow",
    text: "Tensorflow",
    src: require("../assets/img/tensor.png")
  },
  {
    href: "/flowchart",
    text: "Flow Chart",
    src: require("../assets/img/flowchart.png")
  },
  { 
    href: "http://zkboxing.com/book/", 
    text: "ES6 笔记",
    src: require("../assets/img/es6book.png") 
  },
  /* {"href": "http://idl.cs.washington.edu/","text" : "Stanford VIS"},
        {"href": "https://www.palantir.com/","text" : "palantir"},
        {"href": "http://visjs.org/","text" : "visjs"},
        {"href": "http://bitwiseshiftleft.github.io/sjcl/doc/","text" : "sjcl加密"},
        {"href": "http://www.javascriptoo.com/","text" : "javascriptOO"},
        {"href": "http://www.worldwidetelescope.org/","text" : "worldwidetelescope"},
        {"href": "http://www.scientificamerican.com/","text" : "scientificAmerican"},
        {"href": "http://marvl.infotech.monash.edu.au/software/","text" : "Monash VIS"},
        {"href": "http://www.tinypng.com/","text" : "tinypng"},
        {"href": "http://reactivex.io/","text" : "Responsive Programming"},
        {"href": "http://overapi.com/","text" : "Overapi"},
        {"href": "https://flutter.io/","text" : "Flutter"},
        {"href": "http://www.deviantart.com/","text" : "deviantart"},
        {"href": "http://rxmarbles.com/","text" : "Rxmarbles"},
        {"href": "https://robomongo.org/","text" : "mongodb工具"},
        {"href": "http://senseable.mit.edu/","text" : "MIT Senseable City Lab"},
        {"href": "http://githut.info/","text" : "A SMALL PLACE TO DISCOVER LANGUAGES IN GITHUB"} */
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    let $html = linkList.map(item => {
      return (
        <div className="list-li" key={Math.random()}>
          <div
            className={
              item.src ? "list-li-box" : "list-li-box list-li-box-no-img"
            }
          >
            {item.src ? (
              <div>
                <a
                  onClick={this.handleClick}
                  href="/"
                  rel="noopener noreferrer"
                  data-href={item.href}
                  target="_blank"
                >
                  <img data-href={item.href} alt="" src={item.src} />
                </a>
              </div>
            ) : (
              ""
            )}
            <div>
              <a
                onClick={this.handleClick}
                href="/"
                rel="noopener noreferrer"
                data-href={item.href}
                target="_blank"
                title={item.text}
              >
                {item.text}
              </a>
            </div>
          </div>
        </div>
      );
    });
    this.setState({
      html: $html
    });
  }
  handleClick(e) {
    const $history = this.props.history;
    const $href = e.target.dataset.href;
    if (/http/.test($href)) {
      var win = window.open($href, "_blank");
      win.focus();
    } else {
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

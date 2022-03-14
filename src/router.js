import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import Index from "./index/App";
import Screw from "./screw/App";
import Tree from "./tree/App";
import Connection from "./connection/App";
import Fourier from "./fourier/App";
import Tensorflow from "./tensorflow/App";
import Forcelayout from "./forcelayout/App";
import Flowchart from "./flowchart/App";

const routes = [
  {
    path: "/",
    exact: true,
    component: Index
  },
  {
    path: "/forcelayout",
    exact: true,
    component: Forcelayout
  },
  {
    path: "/screw",
    exact: true,
    component: Screw
  },
  {
    path: "/tree",
    exact: true,
    component: Tree
  },
  {
    path: "/connection",
    exact: true,
    component: Connection
  },
  {
    path: "/fourier",
    exact: true,
    component: Fourier
  },
  {
    path: "/flowchart",
    exact: true,
    component: Flowchart
  },
  {
    path: "/tensorflow",
    exact: true,
    component: Tensorflow
  }
];

class Routers extends Component {
  render() {
    return <HashRouter basename="/">{renderRoutes(routes)}</HashRouter>;
  }
}
export default Routers;

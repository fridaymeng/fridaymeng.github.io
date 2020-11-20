import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import Index from "./index/App";
import Screw from "./screw/App";
import Tree from "./tree/App";
import Fractal from "./fractal/App";
import Connection from "./connection/App";
import FourierTransformation from "./fourierTransformation/App";
import Nodes from "./nodes/App";
import Maps from "./map/App";

const routes = [
  {
    path: "/",
    exact: true,
    component: Index
  },
  {
    path: "/nodes",
    exact: true,
    component: Nodes
  },
  {
    path: "/map",
    exact: true,
    component: Maps
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
    path: "/fractal",
    exact: true,
    component: Fractal
  },
  {
    path: "/fouriertransformation",
    exact: true,
    component: FourierTransformation
  }
];

class Routers extends Component {
  render() {
    return <HashRouter basename="/">{renderRoutes(routes)}</HashRouter>;
  }
}
export default Routers;

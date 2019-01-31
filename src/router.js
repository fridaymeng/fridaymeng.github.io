import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import Index from "./index/App";
import Screw from "./screw/App";
import Tree from "./tree/App";
import Fractal from "./fractal/App";
import Connection from "./connection/App";

const routes = [
  { path: '/',
    exact: true,
    component: Index
  },
  { path: '/screw',
    exact: true,
    component: Screw
  },
  { path: '/tree',
    exact: true,
    component: Tree
  },
  { path: '/connection',
    exact: true,
    component: Connection
  },
  { path: '/fractal',
    exact: true,
    component: Fractal
  }
];

class Routers extends Component {
  render() {
    return (
      <HashRouter basename="/">
        {renderRoutes(routes)}
      </HashRouter>
    );
  }
}
export default Routers;

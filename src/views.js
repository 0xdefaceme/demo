// @format
import React from "react";
import { Route } from "mobx-router";

import Home from "./views/Home";
import Vulnerabilities from "./views/Vulnerabilities";
import Commit from "./views/Commit";
import Pay from "./views/Pay";
import Reveal from "./views/Reveal";
import Decide from "./views/Decide";
import Vulnerability from "./views/Vulnerability";

const views = {
  home: new Route({
    path: "/",
    component: <Home />
  }),
  list: new Route({
    path: "/vulnerabilities",
    component: <Vulnerabilities />
  }),
  commit: new Route({
    path: "/commit",
    component: <Commit />
  }),
  pay: new Route({
    path: "/pay/:id",
    component: <Pay />
  }),
  reveal: new Route({
    path: "/reveal/:id",
    component: <Reveal />
  }),
  decide: new Route({
    path: "/decide/:id",
    component: <Decide />
  }),
  view: new Route({
    path: "/vulnerabilities/:id",
    component: <Vulnerability />
  })
};

export default views;

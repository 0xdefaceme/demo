import React from "react";
import {Route} from 'mobx-router';

import List from "./views/List";
import Commit from "./views/Commit";
import Pay from "./views/Pay";
import Reveal from "./views/Reveal";
import Decide from "./views/Decide";

const views = {
    list: new Route({
        path: '/list',
        component: <List />
    }),
    commit: new Route({
        path: '/commit',
        component: <Commit />
    }),
    pay: new Route({
        path: '/pay/:id',
        component: <Pay />
    }),
    reveal: new Route({
        path: '/reveal/:id',
        component: <Reveal />
    }),
    decide: new Route({
        path: '/decide/:id',
        component: <Decide />
    })
}

export default views;

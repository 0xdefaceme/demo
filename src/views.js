import React from "react";
import {Route} from 'mobx-router';

import List from "./views/List";
import Commit from "./views/Commit";
import Pay from "./views/Pay";

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
        path: '/pay',
        component: <Pay />
    }),
}

export default views;

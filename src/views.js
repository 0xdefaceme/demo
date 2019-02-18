import React from "react";
import {Route} from 'mobx-router';

import List from "./views/List";
import Commit from "./views/Commit";

const views = {
    vulns: new Route({
        path: '/vulns',
        component: <List />
    }),
    commit: new Route({
        path: '/commit',
        component: <Commit />
    }),
}

export default views;

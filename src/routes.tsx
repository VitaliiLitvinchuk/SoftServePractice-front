import React from "react";
import HomePage from "./features/home-page";
import roles from "./utils/roles";
const rootPath = "";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    accessLevel: typeof roles[keyof typeof roles],
    name: string,
    nested: IRouteEndpoint[] | null
}

const rootRoute: IRouteEndpoint = {
    path: rootPath,
    component: HomePage,
    accessLevel: roles.GUEST,
    name: "Just",
    nested: null
}

export const routes: IRouteEndpoint[] = [
    rootRoute,
    // {
    //     path: `${rootPath}/cruds`,
    //     component: null,
    //     accessLevel: roles.USER,
    //     name: "CRUDs",
    //     nested: paths.map((path, index): IRouteEndpoint => ({
    //         path: `/${path}`,
    //         accessLevel: cruds[index].accessLevel,
    //         component: crudComponents[keys[index]],
    //         name: names[index],
    //         nested: null
    //     })),
    // }
];

export default rootPath; 
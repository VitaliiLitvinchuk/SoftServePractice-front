import React from "react";
import HomePage from "./features/home-page";
import roles from "./utils/roles";
import crudPages from "./features/crud-pages";

export interface IRouteEndpoint {
    path: string,
    component: React.ElementType | null,
    accessLevel: typeof roles[keyof typeof roles],
    name: string,
    nested: IRouteEndpoint[] | null
}

const rootRoute: IRouteEndpoint = {
    path: import.meta.env.BASE_URL,
    component: HomePage,
    accessLevel: roles.GUEST,
    name: "Just",
    nested: null
}

const routes: IRouteEndpoint[] = [
    rootRoute,
    crudPages
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

export default routes;
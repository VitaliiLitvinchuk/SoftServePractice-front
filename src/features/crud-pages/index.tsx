import { Suspense } from "react";
import Loader from "../../components/loader";
import { IRouteEndpoint } from "../../routes";
import roles from "../../utils/roles";
import Tags from "./tags";
import { baseViteUrl } from "../../utils/enviroment/settings";
import Roles from "./roles";
import Statuses from "./statuses";
import Genres from "./genres";
import Actors from "./actors";
import Halls from "./halls";
import Movies from "./movies";
import GenresTags from "./genres-tags";
import MoviesActors from "./movies-actors";
import MoviesGenres from "./movies-genres";
import MoviesTags from "./movies-tags";
import Seats from "./seats";
import Users from "./users";
import MoviesRatings from "./movies-rating";
import Sessions from "./sessions";
import Tickets from "./tickets";
import PurchaseHistories from "./purchase-histories";

// eslint-disable-next-line react-refresh/only-export-components
const CrudLoader = ({ name }: { name: string }) => {
    return (
        <div className="position-absolute text-center top-50 start-50 translate-middle" >
            <div>
                <Loader visible={true} />
            </div>
            <div><span>Crud '{name}' is loading...</span></div>
        </div>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
const ComponentCreator = (Component: React.ElementType, name: string) => () => (
    <Suspense fallback={< CrudLoader name={name} />}>
        <Component />
    </Suspense>
);

const crudPages = {
    path: `${baseViteUrl}/cruds`,
    component: null,
    accessLevel: roles.USER,
    name: "CRUDs",
    nested: [
        {
            path: "/tags",
            component: ComponentCreator(Tags, "Tags"),
            accessLevel: roles.USER,
            name: "Tags",
            nested: null
        },
        {
            path: "/roles",
            component: ComponentCreator(Roles, "Roles"),
            accessLevel: roles.ADMIN,
            name: "Roles",
            nested: null
        },
        {
            path: "/statuses",
            component: ComponentCreator(Statuses, "Statuses"),
            accessLevel: roles.USER,
            name: "Statuses",
            nested: null
        },
        {
            path: "/genres",
            component: ComponentCreator(Genres, "Genres"),
            accessLevel: roles.USER,
            name: "Genres",
            nested: null
        },
        {
            path: "/actors",
            component: ComponentCreator(Actors, "Actors"),
            accessLevel: roles.USER,
            name: "Actors",
            nested: null
        },
        {
            path: "/halls",
            component: ComponentCreator(Halls, "Halls"),
            accessLevel: roles.USER,
            name: "Halls",
            nested: null
        },
        {
            path: "/movies",
            component: ComponentCreator(Movies, "Movies"),
            accessLevel: roles.USER,
            name: "Movies",
            nested: null
        },
        {
            path: "/genres-tags",
            component: ComponentCreator(GenresTags, "Genres Tags"),
            accessLevel: roles.USER,
            name: "Genres Tags",
            nested: null
        },
        {
            path: "/movies-actors",
            component: ComponentCreator(MoviesActors, "Movies Actors"),
            accessLevel: roles.USER,
            name: "Movies Actors",
            nested: null
        },
        {
            path: "/movies-genres",
            component: ComponentCreator(MoviesGenres, "Movies Genres"),
            accessLevel: roles.USER,
            name: "Movies Genres",
            nested: null
        },
        {
            path: "/movies-tags",
            component: ComponentCreator(MoviesTags, "Movies Tags"),
            accessLevel: roles.USER,
            name: "Movies Tags",
            nested: null
        },
        {
            path: "/seats",
            component: ComponentCreator(Seats, "Seats"),
            accessLevel: roles.USER,
            name: "Seats",
            nested: null
        },
        {
            path: "/users",
            component: ComponentCreator(Users, "Users"),
            accessLevel: roles.ADMIN,
            name: "Users",
            nested: null
        },
        {
            path: "/movies-ratings",
            component: ComponentCreator(MoviesRatings, "Movie Rating"),
            accessLevel: roles.USER,
            name: "Movie Rating",
            nested: null
        },
        {
            path: "/sessions",
            component: ComponentCreator(Sessions, "Session"),
            accessLevel: roles.USER,
            name: "Session",
            nested: null
        },
        {
            path: "/tickets",
            component: ComponentCreator(Tickets, "Ticket"),
            accessLevel: roles.USER,
            name: "Ticket",
            nested: null
        },
        {
            path: "/purchase-histories",
            component: ComponentCreator(PurchaseHistories, "Purchase History"),
            accessLevel: roles.USER,
            name: "Purchase History",
            nested: null
        },
    ] as IRouteEndpoint[]
}

export default crudPages;

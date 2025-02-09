export enum GenresActionTypes {
    GET_GENRES = "GET_GENRES",
    ADD_GENRE = "ADD_GENRE",
    UPDATE_GENRE = "UPDATE_GENRE",
    DELETE_GENRE = "DELETE_GENRE"
}

export interface IGenre {
    [key: string]: string
    id: string;
    name: string;
}

export interface IGenreState {
    genres: IGenre[];
}

export interface IGetGenresAction {
    type: GenresActionTypes.GET_GENRES;
    payload: IGenre[];
}

export interface IAddGenreAction {
    type: GenresActionTypes.ADD_GENRE;
    payload: IGenre;
}

export interface IUpdateGenreAction {
    type: GenresActionTypes.UPDATE_GENRE;
    payload: IGenre;
}

export interface IDeleteGenreAction {
    type: GenresActionTypes.DELETE_GENRE;
    payload: IGenre;
}

export type GenresAction = IGetGenresAction | IAddGenreAction | IUpdateGenreAction | IDeleteGenreAction;
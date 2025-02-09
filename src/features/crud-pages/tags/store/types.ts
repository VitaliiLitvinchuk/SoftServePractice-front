export enum TagsActionTypes {
    GET_TAGS = "GET_TAGS",
    ADD_TAG = "ADD_TAG",
    UPDATE_TAG = "UPDATE_TAG",
    DELETE_TAG = "DELETE_TAG"
}

export interface ITag {
    [key: string]: string
    id: string;
    name: string;
}

export interface ITagState {
    tags: ITag[];
}

export interface IGetTagsAction {
    type: TagsActionTypes.GET_TAGS;
    payload: ITag[];
}

export interface IAddTagAction {
    type: TagsActionTypes.ADD_TAG;
    payload: ITag;
}

export interface IUpdateTagAction {
    type: TagsActionTypes.UPDATE_TAG;
    payload: ITag;
}

export interface IDeleteTagAction {
    type: TagsActionTypes.DELETE_TAG;
    payload: ITag;
}

export type TagsAction = IGetTagsAction | IAddTagAction | IUpdateTagAction | IDeleteTagAction;
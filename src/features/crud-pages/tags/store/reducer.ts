import { ITagState, TagsAction, TagsActionTypes } from "../store/types";

const initialState: ITagState = {
    tags: []
};

export const tagReducer = (state = initialState, action: TagsAction): ITagState => {
    switch (action.type) {
        case TagsActionTypes.GET_TAGS:
            return {
                ...state,
                tags: action.payload
            }
        case TagsActionTypes.ADD_TAG:
            return {
                ...state,
                tags: [...state.tags, action.payload]
            }
        case TagsActionTypes.UPDATE_TAG:
            return {
                ...state,
                tags: state.tags.map(tag => tag.id === action.payload.id ? action.payload : tag)
            }
        case TagsActionTypes.DELETE_TAG:
            return {
                ...state,
                tags: state.tags.filter(tag => tag.id !== action.payload.id)
            }
        default:
            return state
    }
}
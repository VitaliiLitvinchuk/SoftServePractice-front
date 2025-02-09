import { IPurchaseHistoryState, PurchaseHistoriesAction, PurchaseHistoriesActionTypes } from "../store/types";

const initialState: IPurchaseHistoryState = {
    histories: []
};

export const purchaseHistoryReducer = (state = initialState, action: PurchaseHistoriesAction): IPurchaseHistoryState => {
    switch (action.type) {
        case PurchaseHistoriesActionTypes.GET_HISTORIES:
            return {
                ...state,
                histories: action.payload
            }
        case PurchaseHistoriesActionTypes.ADD_HISTORY:
            return {
                ...state,
                histories: [...state.histories, action.payload]
            }
        case PurchaseHistoriesActionTypes.DELETE_HISTORY:
            return {
                ...state,
                histories: state.histories.filter(historie => historie.id !== action.payload.id)
            }
        default:
            return state
    }
}
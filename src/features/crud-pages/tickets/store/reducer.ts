import { ITicketState, TicketsAction, TicketsActionTypes } from "../store/types";

const initialState: ITicketState = {
    tickets: []
};

export const ticketReducer = (state = initialState, action: TicketsAction): ITicketState => {
    switch (action.type) {
        case TicketsActionTypes.GET_TICKETS:
            return {
                ...state,
                tickets: action.payload
            }
        case TicketsActionTypes.ADD_TICKET:
            return {
                ...state,
                tickets: [...state.tickets, action.payload]
            }
        case TicketsActionTypes.UPDATE_TICKET:
            return {
                ...state,
                tickets: state.tickets.map(ticket => ticket.id === action.payload.id ? action.payload : ticket)
            }
        case TicketsActionTypes.DELETE_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket.id !== action.payload.id)
            }
        default:
            return state
    }
}
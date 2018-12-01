import { UPDATE_CHAT_HISTORY, CLEAR_CHAT_HISTORY, LOGOUT } from 'actions';

const initialState = [];

export function chatHistory(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CHAT_HISTORY:
            return [...state, action.message];
        case LOGOUT:
        case CLEAR_CHAT_HISTORY:
            return initialState;
        default:
            return state;
    }
}

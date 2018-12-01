import { OPEN_MODAL, CLOSE_MODAL, LOGOUT } from 'actions';

const initialState = {};

export function modals(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return {...state, [action.modalName]: true};
        case CLOSE_MODAL:
            return {...state, [action.modalName]: false};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

import { LOGOUT } from 'actions';

const initialState = [];

export function errors(state = initialState, action) {
    switch (action.type) {
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

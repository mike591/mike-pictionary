import {
    LOGOUT,
    SET_SETTINGS,
} from 'actions';

const initialState = {
    roomName: null,
    isDrawing: true,
};

export function settings(state = initialState, action) {
    switch (action.type) {
        case SET_SETTINGS:
            return Object.assign({}, state, action.settings);
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

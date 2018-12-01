import { SET_LOADING, LOGOUT } from 'actions';

const initialState = [];

function handleLoading(state, type, isLoading) {
    const idx = state.indexOf(type);
    const newState = JSON.parse(JSON.stringify(state));
    if (isLoading && idx < 0) {
        newState.push(type);
        return newState;
    } else if (!isLoading && idx >= 0) {
        newState.splice(idx, 1);
        return newState;
    }
    return state;
}

export function loading(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            return handleLoading(state, action.loadType, action.isLoading);
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

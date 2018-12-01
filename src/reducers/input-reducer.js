import {
    UPDATE_INPUT,
    LOGOUT,
    CLEAR_INPUTS,
} from 'actions';

const initialState = {};

function getInputsToRemoveObj(keys) {
    const inputsToRemove = {};
    keys.forEach((key) => {
        inputsToRemove[key] = undefined;
    });
    return inputsToRemove;
}

export function inputs(state = initialState, action) {
    switch (action.type) {
        case UPDATE_INPUT:
            return Object.assign({}, state, {
                [action.key]: action.value,
            });
        case CLEAR_INPUTS:
            if (action.keys.length) {
                return Object.assign({}, state, getInputsToRemoveObj(action.keys));
            } else {
                return initialState;
            }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

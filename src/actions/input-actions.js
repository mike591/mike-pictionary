import {
    UPDATE_INPUT,
    CLEAR_INPUTS,
} from 'actions';

export function updateInput(key, value) {
    return {
        type: UPDATE_INPUT,
        key,
        value,
    };
}

export function clearInputs(keys = []) {
    return {
        type: CLEAR_INPUTS,
        keys,
    };
}

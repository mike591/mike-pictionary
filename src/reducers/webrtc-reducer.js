import {
    LOGOUT,
    SET_OFFER,
    SET_ANSWERS,
    SET_CANDIDATES,
} from 'actions';

const initialState = {
    offer: {},
    // answers: [], // TODO: get it working for one other player first
    answers: {},
    candidates: [],
};

export function webrtc(state = initialState, action) {
    switch (action.type) {
        case SET_OFFER:
            return { ...state, offer: action.offer };
        case SET_ANSWERS:
            return { ...state, answers: action.answers };
            // return { ...state, answers: [...state.answers, ...action.answers] }; // TODO: get it working for one other player first
        case SET_CANDIDATES:
            return { ...state, candidates: [...state.candidates, action.candidates] };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

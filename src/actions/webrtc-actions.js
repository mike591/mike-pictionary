import { SET_OFFER, SET_ANSWERS, SET_CANDIDATES } from 'actions';

export const setOffer = (offer) => ({
    type: SET_OFFER,
    offer,
});

export const setAnswers = (answers) => ({
    type: SET_ANSWERS,
    answers,
});

export const setCandidates = (candidates) => ({
    type: SET_CANDIDATES,
    candidates,
});
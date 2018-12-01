import { SET_SETTINGS } from 'actions';

export const setSettings = (settings) => ({
    type: SET_SETTINGS,
    settings,
});
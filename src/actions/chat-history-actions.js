import { UPDATE_CHAT_HISTORY, CLEAR_CHAT_HISTORY } from 'actions';

export const updateChatHistory = (message) => ({
    type: UPDATE_CHAT_HISTORY,
    message,
});

export const clearChatHistory = () => ({
    type: CLEAR_CHAT_HISTORY,
});

import { errors } from 'reducers/error-reducer';
import { loading } from 'reducers/loading-reducer';
import { modals } from 'reducers/modal-reducer';
import { settings } from 'reducers/settings-reducer';
import { inputs } from 'reducers/input-reducer';
import { chatHistory } from 'reducers/chat-history-reducer';

const reducerList = {
    errors,
    modals,
    loading,
    settings,
    inputs,
    chatHistory,
};

export default reducerList;

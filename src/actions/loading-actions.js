import { SET_LOADING, setError } from 'actions';

export function setLoading(loadType, isLoading) {
    return {
        type: SET_LOADING,
        loadType,
        isLoading,
    };
}

const loadDelay = 350;

export const handleLoad = (promise, loadType, errorType = null, callback = null) => {
    return (dispatch) => {
        dispatch(setLoading(loadType, true));
        return promise.then((data) => {
            // have a short delay on removing loading overlay; this makes the loading screen not just pop up and disappear on short loads and also keeps it up
            // on some loads that fire immediately after another load completes
            setTimeout(() => {
                dispatch(setLoading(loadType, false));
                if (callback) {
                    callback();
                    return;
                }
            }, loadDelay);
            return data;
        }).catch((error) => {
            console.error(`Error with ${loadType}:`, error);
            dispatch(setLoading(loadType, false));
            if (errorType !== null) {
                dispatch(setError(errorType, true));
            }
            return Promise.reject(error);
        });
    };
};

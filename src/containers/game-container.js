import { connect } from 'react-redux';
import { Game } from 'components';
import { openModal, closeModal, setSettings, updateInput, setOffer, setAnswers, setCandidates } from 'actions';
import { channelHelper, DataServiceHelper } from 'utils';

const mapStateToProps = (state) => {
    return ({
        roomName: state.settings.roomName,
        inputs: state.inputs,
        isDrawing: state.settings.isDrawing,
        webrtc: state.webrtc,
    });
};

const mapDispatchToProps = (dispatch) => {
    const dsHelper = new DataServiceHelper();
    return ({
        openModal: (modalName) => dispatch(openModal(modalName)),
        closeModal: (modalName) => dispatch(closeModal(modalName)),
        updateInput: (key, val) => dispatch(updateInput(key, val)),
        setSettings: (settings) => dispatch(setSettings(settings)),
        subscribeToRoom: (roomName) => {
            dispatch(channelHelper.subscribeToGroupChannel(roomName));
            dispatch(channelHelper.subscribeToOfferAnswer(roomName));
            dsHelper.getOfferAnswer(roomName).then((res) => {
                let offer = {};
                let answers = [];
                res.forEach((item) => {
                    if (item.id === 'offer' && item) {
                        offer = item;
                    } else if (item.id === 'answer' && item) {
                        answers = item.answers;
                    }
                });
                dispatch(setOffer(offer));
                dispatch(setAnswers(answers));
            });
        },
        setOffer: (roomName, offer) => dsHelper.setOffer(roomName, offer),
        setAnswer: (roomName, answer) => dsHelper.setAnswer(roomName, answer),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

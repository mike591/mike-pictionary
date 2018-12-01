import { connect } from 'react-redux';
import { Game } from 'components';
import { openModal, closeModal, setSettings, updateInput } from 'actions';
import { channelHelper, DataServiceHelper } from 'utils';

const mapStateToProps = (state) => {
    return ({
        roomName: state.settings.roomName,
        inputs: state.inputs,
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
                const offer = [];
                let answers;
                res.forEach((item) => {
                    if (item.id === 'offer') {
                        offer.push(res.offer);
                    } else if (item.id === 'answer') {
                        answers = res.answers;
                    }
                });
                console.log(offer);
                console.log(answers);
            });
        },
        setOffer: (roomName, offer) => dsHelper.setOffer(roomName, offer),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

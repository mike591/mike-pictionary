import { connect } from 'react-redux';
import { Chat } from 'components';
import { channelHelper } from 'utils';
import { updateInput } from 'actions';

const mapStateToProps = (state) => ({
    inputs: state.inputs,
    roomName: state.settings.roomName,
    userName: state.settings.userName,
    chatHistory: state.chatHistory,
});

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (message, userName, roomName) => {
        const groupMessage = {
            message,
            from: userName,
            type: 'chat',
        };
        channelHelper.sendGroupChannelMessage(groupMessage, roomName);
    },
    updateInput: (key, val) => dispatch(updateInput(key, val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

import { endpoints } from 'utils';
import {
    updateChatHistory,
    setOffer,
    setAnswers,
    setCandidates,
} from 'actions';

/* eslint-enable */

const handleGroupChannel = (dispatch, data, meta) => {
    const type = data.data.type;
    switch (type) {
        case 'chat':
            dispatch(updateChatHistory(data.data));
            break;
        case 'candidate':
            dispatch(setCandidates(data.data.candidate));
            break;
        default:
            console.error('Not a valid type', data);
    }
};

const handleDataSubscriptionUpdate = (dispatch, data, meta) => {
    const type = data.id;
    switch (type) {
        case 'offer':
            dispatch(setOffer(data));
            break;
        case 'answer':
            dispatch(setAnswers(data)); // TODO: get it working with one other player for now
            break;
        default:
            console.error('Not a valid type', data);

    }
};

class ChannelHelper {
    constructor(options = {}) {
        this.options = Object.assign({
            account: endpoints.account,
            project: endpoints.project,
        }, options);

        this.defaultSubscriptions = {
            groupChannel: undefined,
            offerAnswer: undefined,
        };

        window.subscriptions = window.subscriptions || Object.assign({}, this.defaultSubscriptions);
        this.subscriptions = window.subscriptions;
    }

    createChannelManager(roomName) {
        window.channelManager = window.channelManager || new F.manager.ChannelManager({ ...this.options, groupName: roomName });
        return window.channelManager;
    }

    subscribeToOfferAnswer(roomName) {
        return (dispatch, getState) => {
            const manager = this.createChannelManager(roomName);
            if (!this.subscriptions.offerAnswer) {
                this.subscriptions.offerAnswer = manager.getDataChannel(`offerAnswer-${roomName}`).subscribe('', handleDataSubscriptionUpdate.bind(null, dispatch));
            }
        };
    }

    subscribeToGroupChannel(roomName) {
        return (dispatch, getState) => {
            const manager = this.createChannelManager(roomName);
            if (!this.subscriptions.groupChannel) {
                this.subscriptions.groupChannel = manager.getGroupChannel().subscribe(`${roomName}`, handleGroupChannel.bind(null, dispatch));
            }
        };
    }

    sendGroupChannelMessage(message, roomName) {
        const manager = this.createChannelManager();
        if (this.subscriptions.groupChannel) {
            manager.getGroupChannel().publish(`${roomName}`, message);
        } else {
            console.error('Not currently subscribed to groupChannel');
        }
    }

    clearGroupChannelSubscription() {
        const manager = this.createChannelManager();
        if (this.subscriptions.groupChannel) {
            manager.cometd.unsubscribe(this.subscriptions.groupChannel);
            window.subscriptions = Object.assign({}, window.subscriptions, { groupChannel: undefined });
            this.subscriptions = window.subscriptions;
        }
    }

    unsubscribe() {
        const manager = this.createChannelManager();
        window.subscriptions = Object.assign({}, this.defaultSubscriptions);
        this.subscriptions = window.subscriptions;
        manager.cometd.clearSubscriptions();
    }
}

const channelHelper = new ChannelHelper();
export default channelHelper;
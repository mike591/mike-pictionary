import { endpoints } from 'utils';

export default class DataServiceHelper {
    constructor(options = {}) {
        this.options = Object.assign({
            account: endpoints.account,
            project: endpoints.project,
        }, options);
    }

    createDataService(root = {}) {
        const options = Object.assign(this.options, { root });
        return new F.service.Data(options);
    }

    getOfferAnswer(roomName) {
        const service = this.createDataService(`offerAnswer-${roomName}`);
        return service.load();
    }

    setOffer(roomName, offer) {
        const service = this.createDataService(`offerAnswer-${roomName}`);
        return service.saveAs('offer', JSON.stringify(offer));
    }

    setAnswer(roomName, answer) {
        const service = this.createDataService(`offerAnswer-${roomName}`);
        return service.save('answer', answer);
    }
}
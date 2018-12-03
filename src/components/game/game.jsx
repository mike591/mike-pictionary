import React from 'react';
import PropTypes from 'prop-types';
import { ModalContainer } from 'containers';
import { TwitterPicker } from 'react-color';

import './game.scss';
const ENTER_ROOM_NAME = 'enterRoomName';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.videoRef = React.createRef();
        this.canvasStream = null;
        this.pos = { x: 0, y: 0 };
        this.peerConnection = null;
        this.iceCandidates = [];
        this.state = {
            answerReceived: false,
            answerSent: false,
            color: '#000000',
        };
    }

    componentDidMount() {
        const { roomName, openModal } = this.props;
        if (!roomName) {
            openModal(ENTER_ROOM_NAME);
        }
        this.setupCanvas();
        this.setupWebrtc();
    }

    /* eslint-disable complexity */
    componentDidUpdate() {
        const { isDrawing, webrtc, setAnswer, roomName } = this.props;
        const { answerSent, answerReceived } = this.state;
        if (roomName && !isDrawing && webrtc.offer && Object.keys(webrtc.offer).length && !answerSent) {
            this.setState({ answerSent: true }, () => {
                this.peerConnection.setRemoteDescription(webrtc.offer).then(() => {
                    this.peerConnection.createAnswer().then((answer) => {
                        this.peerConnection.setLocalDescription(answer);
                        setAnswer(roomName, answer);
                    });
                });
            });
        } else if (isDrawing && roomName && webrtc.answers && Object.keys(webrtc.answers).length && !answerReceived) {
            this.setState({ answerReceived: true }, () => {
                this.peerConnection.setRemoteDescription(webrtc.answers);
            });
        }

        webrtc.candidates.forEach((candidate) => {
            if (this.peerConnection && this.peerConnection.remoteDescription && this.peerConnection.remoteDescription.type && this.iceCandidates.indexOf(candidate) === -1) {
                this.iceCandidates.push(candidate);
                this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            }
        });
    }
    /* eslint-enable */

    setupWebrtc = () => {
        const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        const pc = new PeerConnection();
        pc.onicecandidate = this.handleIceCandidate;
        pc.onaddstream = this.handleRemoteStreamAdded;
        this.peerConnection = pc;

        const thirtyFPS = 30;
        this.canvasStream = this.canvasRef.current.captureStream(thirtyFPS);
        pc.addStream(this.canvasStream);
    }

    handleIceCandidate = (event) => {
        const { sendGroupChannelMessage, roomName } = this.props;
        if (event.candidate) {
            sendGroupChannelMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate,
            }, roomName);
        }
    }

    handleRemoteStreamAdded = (event) => {
        this.remoteStream = event.stream;
        this.videoRef.current.srcObject = this.remoteStream;
    }

    setPosition = (e) => {
        const bounds = this.canvasRef.current.getBoundingClientRect();

        this.pos.x = e.pageX - bounds.left - scrollX;
        this.pos.x /= bounds.width;
        this.pos.x *= this.canvasRef.current.width;
        this.pos.y = e.pageY - bounds.top - scrollY;
        this.pos.y /= bounds.height;
        this.pos.y *= this.canvasRef.current.height;
    }

    resize = (ctx) => {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    draw = (e, ctx) => {
        if (e.buttons !== 1) return;

        ctx.beginPath();

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.state.color;

        ctx.moveTo(this.pos.x, this.pos.y);
        this.setPosition(e);
        ctx.lineTo(this.pos.x, this.pos.y);

        ctx.stroke();
    }

    setupCanvas = () => {
        const ctx = this.canvasRef.current.getContext('2d');
        this.resize(ctx);
        window.addEventListener('resize', () => this.resize(ctx));
        this.canvasRef.current.addEventListener('mousemove', (e) => this.draw(e, ctx));
        this.canvasRef.current.addEventListener('mousedown', this.setPosition);
        this.canvasRef.current.addEventListener('mouseenter', this.setPosition);
    }

    handleEnterRoom = (e) => {
        e.preventDefault();
        const { setSettings, inputs, closeModal, subscribeToRoom } = this.props;
        if (!inputs.roomName || !inputs.userName) {
            return;
        } else {
            const settings = {
                roomName: inputs.roomName,
                userName: inputs.userName,
                isDrawing: inputs.userName.indexOf('draw') >= 0, // TODO: remove draw assignment
            };

            setSettings(settings);
            subscribeToRoom(inputs.roomName);
            closeModal(ENTER_ROOM_NAME);
        }
    }

    createTestButton = () => {
        const { setOffer, inputs } = this.props;
        // return null;

        return (
            <button
                style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                }}
                onClick={() => {
                    this.peerConnection.createOffer().then((offer) => {
                        this.peerConnection.addStream(this.canvasStream);
                        this.peerConnection.setLocalDescription(offer);
                        setOffer(inputs.roomName, offer);
                    });
                }}
            >
                Send Offer
            </button>
        );
    }

    render() {
        const { inputs, updateInput, isDrawing } = this.props;

        return (
            <div className="game-wrapper">
                <ModalContainer
                    modalName={ENTER_ROOM_NAME}
                    children={
                        <form
                            onSubmit={(e) => this.handleEnterRoom(e)}
                            className="game-setup-form"
                        >
                            <input
                                type="text"
                                placeholder="Enter room to join"
                                value={inputs.roomName || ''}
                                onChange={(e) => updateInput('roomName', e.currentTarget.value)}
                            />
                            <input
                                type="text"
                                placeholder="Enter a name"
                                value={inputs.userName || ''}
                                onChange={(e) => updateInput('userName', e.currentTarget.value)}
                            />
                            <button>Submit</button>
                        </form>
                    }
                />
                <TwitterPicker
                    onChangeComplete={(color) => this.setState({ color: color.hex })}
                />
                <canvas className={`canvas ${isDrawing ? '' : 'hidden'}`} ref={this.canvasRef} />
                <video className={`video ${isDrawing ? 'hidden' : ''}`} ref={this.videoRef} autoPlay/>
                {this.createTestButton()}
            </div>
        );
    }
}

Game.propTypes = {

};

export default Game;
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
        this.canvasStream = null;
        this.pos = { x: 0, y: 0 };
        this.peerConnection = null;
        this.state = {
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

    setupWebrtc = () => {
        const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        const pc = new PeerConnection();
        pc.onicecandidate = this.handleIceCandidate;
        pc.onaddstream = this.handleRemoteStreamAdded;
        pc.oniceconnectionstatechange = this.handleIceConnectionStateChange;
        this.peerConnection = pc;

        const thirtyFPS = 30;
        this.canvasStream = this.canvasRef.current.captureStream(thirtyFPS);
        pc.addStream(this.canvasStream);
    }

    handleIceCandidate = (event) => {
        if (event.candidate) {
            // channelHelper.sendWebRTCMessage({
            //     type: 'candidate',
            //     label: event.candidate.sdpMLineIndex,
            //     id: event.candidate.sdpMid,
            //     candidate: event.candidate,
            // }, this.pairRoom);
        }
    }

    handleRemoteStreamAdded = (event) => {
        this.remoteStream = event.stream;
        // channelHelper.sendWebRTCMessage({
        //     type: 'associateRemoteStream',
        //     remoteStreamReady: true,
        // }, this.pairRoom);

        // let streamToRecord = null;
        // const audioContext = new AudioContext();
        // const sources = this.localStream.getAudioTracks().concat(this.remoteStream.getAudioTracks()).map((track) => {
        //     return audioContext.createMediaStreamSource(new MediaStream([track]));
        // });
        // const destination = audioContext.createMediaStreamDestination();
        // sources.forEach((source) => source.connect(destination));
        // if (this.mediaType === AUDIO) {
        //     streamToRecord = destination.stream;
        // } else {
        //     streamToRecord = this.canvasStream;
        //     destination.stream.getAudioTracks().forEach((track) => {
        //         streamToRecord.addTrack(track);
        //     });
        // }

        // this.mediaRecorder = new MediaRecorder(streamToRecord, this.generateMediaRecordFormat());
        // this.mediaRecorder.start();
        // this.mediaRecorder.ondataavailable = (e) => {
            // this.handleAddChunks(e);
        // };
        // this.mediaRecorder.onstop = this.handleRecorderStop;
    }

    handleIceConnectionStateChange = (event) => {
        if (this.peerConnection && this.peerConnection.iceConnectionState) {
            // channelHelper.sendWebRTCMessage({
            //     type: 'iceConnectionState',
            //     iceConnectionState: this.peerConnection.iceConnectionState,
            // }, this.pairRoom);
        }
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
            };

            setSettings(settings);
            subscribeToRoom(inputs.roomName);
            closeModal(ENTER_ROOM_NAME);
        }
    }

    createTestButton = () => {
        const { setOffer, inputs } = this.props;
        return null;

        // return (
        //     <button
        //         onClick={() => {
        //             this.peerConnection.createOffer().then((res) => {
        //                 setOffer(inputs.roomName, res);
        //             });
        //         }}
        //     >
        //         setOffer
        //     </button>
        // );
    }

    render() {
        const { inputs, updateInput, setOffer } = this.props;

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
                <canvas className="canvas" ref={this.canvasRef} />
                {this.createTestButton()}
            </div>
        );
    }
}

Game.propTypes = {

};

export default Game;
import React from 'react';
import PropTypes from 'prop-types';
import './chat.scss';

const Chat = ({ updateInput, roomName, inputs, sendMessage, chatHistory }) => {

    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage(inputs.chat, inputs.userName, roomName);
        updateInput('chat', '');
    };

    return (
        <div className="chat-wrapper">
            <div className="chat-history-wrapper">
                {chatHistory.map((chat, idx) => {
                    return (
                        <span className="message" key={idx}>{chat.from}: {chat.message}</span>
                    );
                })}
            </div>
            <form className="chat-form" onSubmit={(e) => handleSendMessage(e)}>
                <input
                    type="text"
                    placeholder="Enter text here..."
                    value={inputs.chat || ''}
                    onChange={(e) => updateInput('chat', e.currentTarget.value)}
                />
                <button>Send</button>
            </form>
        </div>
    );
};

Chat.propTypes = {

};

export default Chat;
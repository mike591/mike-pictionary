import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';

const Header = ({ roomName, userName, isDrawing }) => {
    return (
        <div className="header-wrapper">
            <h2>Name: {userName || 'Waiting...'}</h2>
            <h2>Room: {roomName || 'Waiting...'}</h2>
            <h2>Status: {isDrawing ? 'Drawing' : 'Guessing'}</h2>
        </div>
    );
};

Header.propTypes = {

};

export default Header;
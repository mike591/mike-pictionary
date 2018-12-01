import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = ({ children, modalName, modals }) => {
    if (!modals[modalName]) {
        return null;
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {

};

export default Modal;
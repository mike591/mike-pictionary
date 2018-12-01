import { OPEN_MODAL, CLOSE_MODAL } from 'actions';

export const openModal = (modalName) => ({
    type: OPEN_MODAL,
    modalName,
});

export const closeModal = (modalName) => ({
    type: CLOSE_MODAL,
    modalName,
});

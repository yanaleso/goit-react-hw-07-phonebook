import PropTypes from 'prop-types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Overlay, ModalBox, Button } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({onCloseModal, children}) {

  useEffect(() => {
    const onEscPress = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onEscPress);
    return () => {
      window.removeEventListener('keydown', onEscPress);
    };
}, [onCloseModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalBox><Button onClick={onCloseModal}><IoIosCloseCircleOutline size={22}/></Button>{children}</ModalBox>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func.isRequired,
};
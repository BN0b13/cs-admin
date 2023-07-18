import React from 'react';

import {
  ModalAccessButton,
  ModalDenyButton,
  ModalButtonDiv,
  ModalDiv,
  ModalTitle,
  ModalText,
  Modal
} from './admin-modal.styles';

const AdminModal = ({ show = false, setShow, title = 'Warning', image = null, message = 'Error', action = null, actionText = 'Accept' }) => {
  
    return (
      <Modal show={show}>
        <ModalDiv>
          <ModalTitle>{ title }</ModalTitle>
          { image &&
            <img src={image}  width='200px' height='200px' />
          }
          <ModalText>{ message }</ModalText>
          <ModalButtonDiv>
            <ModalDenyButton onClick={() => setShow(false)}>
              Cancel
            </ModalDenyButton>
            { action &&
              <ModalAccessButton onClick={() => action()}>
                { actionText }
              </ModalAccessButton>
            }
          </ModalButtonDiv>
        </ModalDiv>
      </Modal>
    );
}

export default AdminModal;
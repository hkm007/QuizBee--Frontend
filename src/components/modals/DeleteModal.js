import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteModal = ({show, display, title, blogId, action}) => {
  
  const hideModal = () => {
    display(false)
  }

  const helper = () => {
    display(false)
    action(blogId)
  }

  return (
    <div>
      <Modal isOpen={show} toggle={hideModal} className='Delete'>
        <ModalHeader toggle={hideModal}>Delete Post</ModalHeader>
          <ModalBody>
            <h5>Are you sure ? You want to delete the post </h5>
            <h4><i>"{title}".</i></h4>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => helper()}>Yes, Delete</Button>{' '}
            <Button color="secondary" onClick={hideModal}>Cancel</Button>
          </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;
import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ResultModal({show, display, score}) {
    
    const history = useHistory()

    const hideModal = () => {
        display(false)
        history.push('/')
    }

    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div>
            <Modal isOpen={show} toggle={hideModal} className='Update'>
                <ModalHeader toggle={hideModal}>Result</ModalHeader>
                <ModalBody>
                    <h5>Thank you <strong>{user.username}</strong> for taking this quiz.</h5><br />
                    <p>Total Correct: {score} out of 10.</p>
                    <p>Score: {(score/10)*100}%</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={hideModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ResultModal

import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function UpdateModal({show, display, title, blogId, message, action}) {

    const [newmessage, setNewmessage] = useState('')

    const hideModal = () => {
        display(false)
    }

    const helper = (e) => {
        e.preventDefault()
        display(false)
        action(blogId, newmessage)
    }

    return (
        <div>
            <Modal isOpen={show} toggle={hideModal} className='Update'>
                <ModalHeader toggle={hideModal}>Update Post</ModalHeader>
                <form onSubmit={helper}>
                    <ModalBody>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" value={title} required />
                        </div>
                        <div class="form-group">
                            <label for="content">Content</label>
                            <textarea class="form-control" id="content" rows="10" onChange={(e) => setNewmessage(e.target.value)}></textarea>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="info" type="submit">Update</Button>{' '}
                        <Button color="secondary" onClick={hideModal}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    )
}

export default UpdateModal

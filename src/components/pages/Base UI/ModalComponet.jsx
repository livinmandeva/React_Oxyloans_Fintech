import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { principal_return_account_type } from '../../HttpRequest/afterlogin';

function ModalComponet({data ,heading }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    response = principal_return_account_type()
    response.then((data)=>{
      console.log(data)
    })
  }
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleClose}>
             Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponet;
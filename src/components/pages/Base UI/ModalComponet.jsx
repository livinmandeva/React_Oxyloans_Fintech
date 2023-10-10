import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { principal_return_account_type } from "../../HttpRequest/afterlogin";

function ModalComponet({ data, heading, sendDataToParent }) {
  const [show, setShow] = useState(true);

  const handleClose = async () => {
    sendDataToParent();
    // response = principal_return_account_type();
    // response.then((data) => {
    //   console.log(data);
    // });
  };
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {}}>
            No
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponet;

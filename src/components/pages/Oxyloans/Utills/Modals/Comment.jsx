import { useState } from 'react';
import '../file.css'
import Modal from 'react-bootstrap/Modal';

function Comment({}) {
  const [lgShow, setLgShow] = useState(true);

  return (
    <>


      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            View Comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className='table'>
  <tr className='tr'>
    <th>Admin Comments</th>
    <th></th>
    <th>	Responded On</th>
  </tr>
  <tr className='tr'>
    <td>No comments Found</td>
    <td></td>
    <td></td>
  </tr>


</table></Modal.Body>
      </Modal>
    </>
  );
}

export default Comment;
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table1 from "./Table1";

function Modaldata({ data, open, hidingStatement }) {
  const [lgShow, setLgShow] = useState(open);
  const [donloadlink , setdownloadlink]=useState(data.downloadStatement)

  const hidingStatementModal = () => {
    setLgShow(!lgShow);
    hidingStatement();
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={hidingStatementModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
        <a href={donloadlink}  > <i class="fa-solid fa-download"  typeof="download" ></i> </a>   Download Statement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table1 data={data} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Modaldata;

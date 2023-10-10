import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./InvoiceGrid.css";
import { Space, Table, Tag } from "antd";
import { Link } from "react-router-dom";
const { Column, ColumnGroup } = Table;

function AlertTable({ data, open: propOpen, sendRunningDealStatement }) {
  const [show, setShow] = useState(propOpen);

  const handleClose = async () => {
    setShow(false);
    sendRunningDealStatement();
    // response = principal_return_account_type();
    // response.then((data) => {
    //   console.log(data);
    // });
  };

  const tableapi = [];
  {
    data.lenderParticipationUpdatedInfo !== "" ? (
      data.lenderParticipationUpdatedInfo.map((api, index) => {
        tableapi.push({
          key: index + 1,
          upatedDate: api.upatedDate,
          amount: api.amount,
        });
      })
    ) : (
      <p>No data found</p>
    );
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w lg-down"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Added participation Amount info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If you've any queries please write to us{" "}
            <Link to="/writetous">Click Here</Link>{" "}
          </p>
          <Table dataSource={tableapi} pagination={false}>
            <Column
              title="upatedDate"
              dataIndex="upatedDate"
              key="upatedDate"
            />

            <Column title="amount" dataIndex="amount" key="amount" />
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AlertTable;

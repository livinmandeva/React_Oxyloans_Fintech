import React, {  useState } from "react";
import {  Modal } from "antd";
import "../Lender/InvoiceGrid.css";

export default function Modell({ data, open: propOpen }) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("Added participation Amount info");
  const [open, setOpen] = useState(propOpen);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        title={title}
        onOk={handleOk}
        width={870}
        style={{
          left: 80,
        }}
        onCancel={handleCancel}
        footer={
          [
            // <Button key="back" onClick={handleCancel}>
            //   Return
            // </Button>,
            // <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            //   Submit
            // </Button>,
            // <Button
            //   key="link"
            //   href="https://google.com"
            //   type="primary"
            //   loading={loading}
            //   onClick={handleOk}
            // >
            //   Search on Google
            // </Button>,
          ]
        }
      >
        {console.log(data.lenderParticipationUpdatedInfo)}
        {/* Interest Statement */}
        <p>
          If you've any queries please write to us <a href="">Click Here</a>{" "}
        </p>
      </Modal>
    </div>
  );
}

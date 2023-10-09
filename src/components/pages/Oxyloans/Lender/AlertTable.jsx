import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';import './InvoiceGrid.css'
import { Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';
const { Column, ColumnGroup } = Table;

function AlertTable({data , open: propOpen}) {
  const [show, setShow] = useState(propOpen);

  const tableapi = [];  
  {data.lenderParticipationUpdatedInfo !== "" ? (
    data.lenderParticipationUpdatedInfo.map((api) => {
      tableapi.push({
        key: Math.random(),
        upatedDate: api.upatedDate,
        amount: api.amount,
      });
    })
  ) : (
    <p>ppp</p>
  )}
  

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w lg-down"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {/* {console.log(data.lenderParticipationUpdatedInfo)} */}
     
            Added participation Amount info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {data.lenderParticipationUpdatedInfo != ""  ?
            data.lenderParticipationUpdatedInfo.map((api ,index)=>{
                <div  key={index}>
                <p  style={{zIndex:10}}>{api.amount}</p>
                {console.log(api.amount)}
                </div>
            }) : "pppp"} */}
   <p>If you've any queries please write to us <Link to="/writetous">Click Here</Link> </p>
<Table dataSource={tableapi}>
<Column title="upatedDate" dataIndex="upatedDate" key="upatedDate" />

     
<Column title="amount" dataIndex="amount" key="amount" /></Table>
            
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AlertTable;
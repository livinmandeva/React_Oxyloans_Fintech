import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
const Model1 = () => {
  const [open, setOpen] = useState(true);



   const [data  , setdata]=useState({
    
        loanOfferedAmount: "",
        loanRequestedId: "",
        rateOfInterest: "",
        duration: "",
        durationType: "",
        fee: "",
        comments: ""

   })
  const  handlechange  =(event)=>{
     const {value   ,name} =event.target;
     setdata({
        ...data,
        [name]:value,
     })
  }

  const  handelsubmit=()=>{

  }
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Space>
      </Space>
      <Modal
        open={open}
        title="Loan offer"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button>Custom Button</Button>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >

        <div  className='contanierbox mt-3' style={{marginTop: '10px',}}>
      <div className="col-12 col-sm-8">
                        <div className="form-group local-forms">
                          <label>
                          Comments
                            <span className="login-danger">*</span>
                          </label>
                          <textarea
                            type="text"
                            name="loanOfferedAmount"
                            className="form-control"
                            placeholder="Enther the Start Date"  
                            onChange={handlechange}

                            rows={3}
                              >
                                </textarea>
                        </div>
                      </div>



 
            
                     {/* <p>pp</p> */}

                    <div >
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary">
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
                      
                      
                      </div>
      </Modal>
    </>
  );
};
export default Model1;
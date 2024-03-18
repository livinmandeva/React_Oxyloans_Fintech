import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';
const Model = () => {
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
      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                          Loan Amount
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="loanOfferedAmount"
                            className="form-control"
                            placeholder="Enther the Start Date"  
                            onChange={handlechange}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                              Fee Percentage:
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="rateOfInterest"                              
                            className="form-control"
                            placeholder="Enther the Start Date"
                          >

                            <option> -- Percentage -- </option>
                            <option  value="1">1</option>
                            <option  value="2">2</option>
                            <option  value="3">3</option>
                            <option  value="4">4</option>
                            <option  value="5">5</option>
                            <option  value="6">6</option>
                            <option  value="7">7</option>
                            <option  value="8">8</option>
                            </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                               RoI to per(Month or Day)
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="durationType"
                            className="form-control"
                            placeholder="Enther the Start Date"
                          > <option> --  Choose ROI  -- </option>
                          <option  value="1">1</option>
                          <option  value="2">2</option>
                          <option  value="3">3</option>
                          <option  value="4">4</option>
                          <option  value="5">5</option>
                          <option  value="6">6</option>
                          <option  value="7">7</option>
                          <option  value="8">8</option>
                          <option  value="9">9</option>
                          <option  value="10">10</option>
                          <option  value="11">11</option>
                          <option  value="12">12</option>
                          <option  value="13">13</option>
                          <option  value="14">14</option>
                          <option  value="15">15</option>
                          <option  value="16">16</option>
                           </select>
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                                 Tenure
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="duration"
                            className="form-control"
                            placeholder="Enther the Start Date"
                          >
                          <option> --  Choose tenure  -- </option>
                          <option  value="1">1</option>
                          <option  value="2">2</option>
                          <option  value="3">3</option>
                          <option  value="4">4</option>
                          <option  value="5">5</option>
                          <option  value="6">6</option>
                          <option  value="7">7</option>
                          <option  value="8">8</option>
                          <option  value="9">9</option>
                          <option  value="10">10</option>
                          <option  value="11">11</option>
                          <option  value="12">12</option>
                          <option  value="13">13</option>
                          <option  value="14">14</option>
                          <option  value="15">15</option>
                          <option  value="16">16</option>
                          </select>
                        </div>
                      </div>
 
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                          Processing Fees
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="fee"
                             
                            className="form-control"
                            placeholder="Enter Processing Fees"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                          Other Details:
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="comments"
                            className="form-control"
                            placeholder="Enter Text"
                          />    
                        </div>
                      </div>
                     {/* <p>pp</p> */}

                      <div className="col-4">
                      <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" id="inlineCheckbox1" value="Months" />
  <label class="form-check-label" for="inlineCheckbox1">Months</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" id="inlineCheckbox3" value="Days" />
  <label class="form-check-label" for="inlineCheckbox3">Days</label>
</div>
</div> <div >
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
export default Model;
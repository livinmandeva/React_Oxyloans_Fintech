import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const CMSModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
{/* <Button  onClick={showModal}>Read Report</Button> */}
      <Modal title=" Date/Month " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

    <div>

    <div className="form-check form-check-inline">
    Read reports Type :
    {/* <label className="form-check-label" for="inlineCheckbox1"> Read reports Type :</label> */}
</div>
<div class="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineCheckbox2" value="option2" />
  <label className="form-check-label" for="inlineCheckbox2">Days</label>
</div>
<div class="form-check form-check-inline">
  <input className="form-check-input" type="radio" id="inlineCheckbox3" value="option3"  />
  <label className="form-check-label" for="inlineCheckbox3">Month </label>
</div>
  </div>
    <div className="form-group col-12 col-md-6 local-forms  mt-3">
                                <label>
                                Current Date*
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder=" Enter your Name"
                                  name="nameAtBank"
                                />

                              </div>
                              <div class="form-check form-check-inline">
  <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"  />
  <label className="form-check-label" for="inlineCheckbox3">Send Notifications </label>
</div>
   <div></div>
      </Modal>
    </>
  );
};
export default CMSModel;
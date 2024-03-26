import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
// import './holdAmountRequest.css'
import ReactStars from "react-rating-stars-component";


// import './holdAmountRequest.css'

import { handleholdamountapi, interestDetailsForDeall } from "../../../../HttpRequest/admin";
import AdminHeader from "../../../../Header/AdminHeader";
import AdminSidebar from "../../../../SideBar/AdminSidebar";
import { Info, WarningAlertwithdrow } from "../../../Base UI Elements/SweetAlert";

const OfflineInterest = () => {


  const [holdAmountRequest, setholdAmountRequest] = useState({
    userId: "",
    holdAmount: "",
    comments: "",
    dealId: "",
    userIderror: "",
    holdAmounterror: "",
    commentserror: "",
    dealIderror: "",
    paymentDate: "",
    originalPaymentDate: "",
    dealId: "",
    status: "",
    totalAmount: "",
    paymentMode: "OFFLINE"
  })

  

  const handlechange = (event) => {
    const { value, name } = event.target;

    setholdAmountRequest({
      ...holdAmountRequest,
      [name]: value
    })
  }



 


  const submitholdamount = async () => {
    try {
      const response = await interestDetailsForDeall(holdAmountRequest);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        Info("Success: " + response.data);
      } else {
        console.error(response.response.data.errorMessage);
        WarningAlertwithdrow("Error: " + response.response.data.errorMessage);
      }
    } catch (error) {
      console.error(error);
      WarningAlertwithdrow("Error: " + error.errorMessage);
    }
  };
  
  

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <AdminHeader />

        {/* Sidebar */}
        <AdminSidebar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title"> Hold Deal Amount </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Hold Deal Amount</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header"></div>
                  <div className="card-body">
                    {/* <form> */}
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                          Deal Id<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="dealId"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the LENDER ID "
                          />{holdAmountRequest.userIderror != "" && holdAmountRequest.userIderror}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                          status<span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="status"
                            onChange={handlechange}
                            className="form-control"
                            placeholder="Enther the DEAL ID "
                          >
 

                               <option  value="APPROVED">APPROVED</option>
                               <option  value="ONHOLD">ONHOLD</option>
                            </select>
                          {holdAmountRequest.dealIderror != "" && <><div  className="errormessage">{holdAmountRequest.dealIderror} </div></>    }
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                          Total Amount<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="totalAmount"
                            onChange={handlechange}
                            className="form-control"
                            placeholder="Enther the HOLD AMOUNT "
                          />
                          {holdAmountRequest.holdAmounterror != "" && <><div  className="errormessage">{holdAmountRequest.holdAmounterror} </div></> }
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                          payment Date<span className="login-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="paymentDate"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the LENDER ID "
                          />{holdAmountRequest.userIderror != "" && holdAmountRequest.userIderror}
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                          Original Payment Date     <span className="login-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="originalPaymentDate"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the LENDER ID "
                          />{holdAmountRequest.userIderror != "" && holdAmountRequest.userIderror}
                        </div>
                      </div>


                      

                      <div className="col-12">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary" onClick={() => submitholdamount()}>
                            process
                          </button>
                        </div>
                      </div>
                    </div>
                    {/*   </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default OfflineInterest;

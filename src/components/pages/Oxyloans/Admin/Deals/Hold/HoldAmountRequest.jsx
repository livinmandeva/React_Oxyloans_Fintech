import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import './holdAmountRequest.css'
import ReactStars from "react-rating-stars-component";


import './holdAmountRequest.css'
import Sidebar from "../../../../../SideBar/AdminSidebar";
import Header from "../../../../../Header/Header";
import { handleholdamountapi } from "../../../../../HttpRequest/admin";

const HoldAmountRequest = () => {


  const [holdAmountRequest, setholdAmountRequest] = useState({
    userId: "",
    holdAmount: "",
    comments: "",
    dealId: "",
    userIderror: "",
    holdAmounterror: "",
    commentserror: "",
    dealIderror: "",
  })

  const handlechange = (event) => {
    const { value, name } = event.target;

    setholdAmountRequest({
      ...holdAmountRequest,
      [name]: value
    })
  }



 


  const submitholdamount = async () => {


    setholdAmountRequest((holdAmountRequest) => ({
      ...holdAmountRequest,
      userIderror:
        holdAmountRequest.userId === "" ? "Please enter the userId" : "",
      dealIderror:
        holdAmountRequest.dealId === "" ? "Please enter the dealId" : "",
      holdAmounterror:
        holdAmountRequest.holdAmount === "" ? "Please enter the holdAmount" : "",
      commentserror:
        holdAmountRequest.holdAmount === "" ? "Please enter the holdAmount" : "",
    }));  

    if (
      holdAmountRequest.userId === "" &&
      holdAmountRequest.dealId === "" &&
      holdAmountRequest.comments === "" &&
      holdAmountRequest.holdAmount === ""
    ) {
      const response = await handleholdamountapi(holdAmountRequest);
      console.log(response);
    } else {
      console.log("error")
    }
  }

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

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
                            LENDER ID :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="userId"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the LENDER ID "
                          />{holdAmountRequest.userIderror != "" && holdAmountRequest.userIderror}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            DEAL ID :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="dealId"
                            onChange={handlechange}
                            className="form-control"
                            placeholder="Enther the DEAL ID "
                          />
                          {holdAmountRequest.dealIderror != "" && <><div  className="errormessage">{holdAmountRequest.dealIderror} </div></>    }
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            HOLD AMOUNT :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="holdAmount"
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
                            COMMENTS:
                            <span className="login-danger">*</span>
                          </label>
                          <textarea
                            type="text"
                            name="comments"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the COMMENTS"
                          ></textarea>
                          {holdAmountRequest.commentserror != ""  && <><div  className="errormessage">{holdAmountRequest.commentserror} </div></> }
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

export default HoldAmountRequest;

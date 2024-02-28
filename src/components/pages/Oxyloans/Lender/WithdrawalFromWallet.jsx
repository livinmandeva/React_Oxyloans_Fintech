import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import ReactStars from "react-rating-stars-component";
import { submitWithdrawalRequestFromWallet } from "../../../HttpRequest/afterlogin";
import {
  HandleWithFooter,
  WarningAlert,
  WarningAlertwithdrow,
} from "../../Base UI Elements/SweetAlert";

const WithdrawalFromWallet = () => {
  const [withdrawrequest, setwithdrawRequest] = useState({
    date: new Date(),
    withdrawAmount: "",
    withdrawFeedback: "",
    withdrawRating: "",
    withdraReason: "",
    setGivendate: "",
    withdrawAmounterror: "",
    withdrawFeedbackerror: "",
    withdrawRatingerror: "",
    withdraReasonerror: "",
    setGivendateerror: "",
    isvalid: true,
  });


  const  [inputValue  , setInputValue ]=useState("")
  const minDate = new Date();
  const handleChange = (date) => {
    setwithdrawRequest({
      ...withdrawrequest,
      date,
      setGivendate: date.toJSON().slice(0, 10).split("-").reverse().join("/"),
    });
  };

  const maxDate = new Date();
  const ratingChanged = (newRating) => {
    setwithdrawRequest({
      ...withdrawrequest,
      withdrawRating: newRating,
    });
  };


  const handleKeyPress = (event) => {
    console.log('Key pressed:', event.key); // Check if the function is triggered
    const inputChar = event.key;
    const regex = /^[a-zA-Z]*$/; // Regular expression to allow only alphabets

    // Check if the pressed key is an alphabetic character or backspace
    if (!regex.test(inputChar) && inputChar !== 'Backspace') {
      event.preventDefault();
    }
  };
  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setwithdrawRequest({
      ...withdrawrequest,
      [name]: value,
    });
  };

  console.log(withdrawrequest.withdrawFeedback)
  const withdrawrequestHandler = async () => {


    setwithdrawRequest((withdrawrequest) => ({
      ...withdrawrequest,
      withdrawAmounterror: withdrawrequest.withdrawAmount === "" ? "Enter the Withdrawal Amount" : "",
      withdrawFeedbackerror: withdrawrequest.withdrawFeedback === "" ? "Enter the Feedback" : "",
      withdrawRatingerror: withdrawrequest.withdrawRating === "" ? "Give the Rating" : "",
      withdraReasonerror: withdrawrequest.withdraReason === "" ? "Enter the Reason" : "",
      setGivendateerror: !withdrawrequest.setGivendate ? "Enter the Withdrawal Date" : "",
    }));
    

    if(withdrawrequest.withdrawAmount !== ""  && withdrawrequest.withdrawAmount !== null &&
    withdrawrequest.withdrawFeedback !== ""  && withdrawrequest.withdrawFeedback !== null &&
    withdrawrequest.withdrawRating !== ""  && withdrawrequest.withdrawRating !== null &&
    withdrawrequest.withdraReason !== ""  && withdrawrequest.withdraReason !== null &&
    withdrawrequest.setGivendate !== ""  && withdrawrequest.setGivendate !== null ){


      console.log("WithdrawalFromWallet")
      const response = submitWithdrawalRequestFromWallet(withdrawrequest);
      response.then((data) => {
        console.log(data)
        if (data.request.status == 200) {
          HandleWithFooter(
            "Your withdrawal request has been initiated successfully. You will receive mobile and email alerts when the amount is credited to your registered bank accountNote: If you raise a request to withdraw funds from the wallet, please note that the funds will be credited to your bank account within 2 to 7 bank working days"
          );
        } else {
          WarningAlertwithdrow(data.response.data.errorMessage);
        }
      });
    }  else{
      console.log("filed  are required");
    }
 
  };

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <SideBar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Lender Withdrawal Funds</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/withdrawdealfromDeal">Withdraw From Deal</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Withdrawal From Wallet
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <div className="note_point text-bold fst-italic mx-3">
                      <code>
                        <b>Note : </b>
                      </code>
                      Funds will be Credited to your Bank account within 7
                      working days.
                    </div>
                  </div>
                  <div className="card-body">
                    {/* <form> */}
                    <div className="row">
                      <div className="col-12">
                        <h5 className="form-title">
                          <span>Withdrawal Details</span>
                        </h5>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Withdrawal Amount
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="withdrawAmount"
                            onChange={handleInputchange}
                            placeholder="Enter the Withdraw Amount"
                          />
                           {withdrawrequest.withdrawAmounterror && <div  className="error">{withdrawrequest.withdrawAmounterror}</div>}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Feedback
                            <span className="login-danger">*</span>
                          </label>
                          <input 
      type="text" 
      name="withdrawFeedback"
      className="form-control"
      onKeyPress={handleKeyPress}
      onChange={handleInputchange}
      placeholder="Enter the Feedback"
      value={withdrawrequest.withdrawFeedback}
    />
                            {withdrawrequest.withdrawFeedbackerror && <div  className="error">{withdrawrequest.withdrawFeedbackerror}</div>}
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Reason
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="withdraReason"
                            onKeyPress={handleKeyPress}
                            onChange={handleInputchange}
                            placeholder="Enter the Reson"
                          />
                           {withdrawrequest.withdraReasonerror && <div  className="error">{withdrawrequest.withdraReasonerror}</div>}
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms calendar-icon">
                          <label>
                            Withdrawal Date
                            <span className="login-danger">*</span>
                          </label>

                          {/* <DatePicker
                            selected={withdrawrequest.date}
                            onChange={handleChange}
                            dateFormat="dd/MM/yyyy"
                            maxDate={maxDate}
                            className="form-control datetimepicker"
                          /> */}
                        <DatePicker
                            selected={withdrawrequest.date}
                            onChange={handleChange}
                            dateFormat="dd/MM/yyyy"
                            minDate={minDate}
                            className="form-control datetimepicker"
                          />
                          {withdrawrequest.setGivendateerror && <div  className="error">{withdrawrequest.setGivendateerror}</div>}
                        </div>
                        
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <span>
                            Rating
                            <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              size={24}
                              activeColor="#ffd700"
                            />
                          </span>
                          {withdrawrequest.withdrawRatingerror && <div  className="error">{withdrawrequest.withdrawRatingerror}</div>}
                        </div>

                       
                      </div>
                      <div className="col-12">
                        <div className="student-submit">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={withdrawrequestHandler}
                          >
                            Submit
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

export default WithdrawalFromWallet;

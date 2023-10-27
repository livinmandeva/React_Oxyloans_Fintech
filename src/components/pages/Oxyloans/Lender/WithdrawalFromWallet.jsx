import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import ReactStars from "react-rating-stars-component";
import { submitWithdrawalRequestFromWallet } from "../../../HttpRequest/afterlogin";
import {
  HandleWithFooter,
  WarningAlert,
} from "../../Base UI Elements/SweetAlert";

const WithdrawalFromWallet = () => {
  const [withdrawrequest, setwithdrawRequest] = useState({
    date: new Date(),
    withdrawAmount: "",
    withdrawFeedback: "",
    withdrawRating: "",
    withdraReason: "",
    setGivendate: "",
    isvalid: true,
  });

  const handleChange = (date) => {
    setwithdrawRequest({
      ...withdrawrequest,
      date,
      setGivendate: date.toJSON().slice(0, 10).split("-").reverse().join("/"),
    });
  };

  const ratingChanged = (newRating) => {
    setwithdrawRequest({
      ...withdrawrequest,
      withdrawRating: newRating,
    });
  };

  const handleInputchange = (event) => {
    const { name, value } = event.target;
    setwithdrawRequest({
      ...withdrawrequest,
      [name]: value,
    });
  };
  const withdrawrequestHandler = async () => {
    const response = submitWithdrawalRequestFromWallet(withdrawrequest);
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        HandleWithFooter(
          "Your withdrawal request has been initiated successfully. You will receive mobile and email alerts when the amount is credited to your registered bank accountNote: If you raise a request to withdraw funds from the wallet, please note that the funds will be credited to your bank account within 2 to 7 bank working days"
        );
      } else {
        WarningAlert(data.response.data.errorMessage);
      }
    });
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
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      withdrawal FromWallet
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
                    <form>
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
                              type="text"
                              className="form-control"
                              name="withdrawAmount"
                              onChange={handleInputchange}
                              placeholder="Enther the Withdraw Amount"
                            />
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
                              onChange={handleInputchange}
                              placeholder="Enther the Feedback"
                            />
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
                              onChange={handleInputchange}
                              placeholder="Enther the Reson"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms calendar-icon">
                            <label>
                              Withdrawal Date
                              <span className="login-danger">*</span>
                            </label>

                            <DatePicker
                              selected={withdrawrequest.date}
                              onChange={handleChange}
                              dateFormat="dd/MM/yyyy"
                              className="form-control datetimepicker"
                            />
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
                    </form>
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

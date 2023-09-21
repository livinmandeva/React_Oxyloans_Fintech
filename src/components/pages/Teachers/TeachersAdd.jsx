import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";

const TeachersAdd = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [options, setOptions] = useState([
    { id: 1, text: "Male" },
    { id: 2, text: "Female" },
    { id: 3, text: "Others" },
  ]);
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
                  <h3 className="page-title">Emi Calculator</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/teacherslist">Write To Us</Link>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-12">
                          <h5 className="form-title">
                            <span>Loan Amount Details</span>
                          </h5>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Loan Amount
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              ROI <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Tenure <span className="login-danger">*</span>
                            </label>
                            {/* <select className="form-control select">
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                            <option>Others</option>
                                                        </select> */}
                            <Select2
                              className="w-100 form-group local-forms form-control select"
                              data={options}
                              options={{
                                placeholder: "Male",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms calendar-icon">
                            <label>
                              Emi Type
                              <span className="login-danger">*</span>
                            </label>
                            <Select2
                              className="w-100 form-group local-forms form-control select"
                              data={options}
                              options={{
                                placeholder: "Male",
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12" style={{ display: "none" }}>
                          <h5 className="form-title">
                            <span>Login Details</span>
                          </h5>
                        </div>
                        {/* 
                        <div className="col-12">
                          <div className="student-submit">
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div> */}
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

export default TeachersAdd;

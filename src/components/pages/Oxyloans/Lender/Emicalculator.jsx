import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";

const Emicalculator = () => {
  const [loatamount, setLoanAmount] = useState("");
  const [inputTenure, setinputTenure] = useState("");
  const [inputroi, setinputroi] = useState("");
  const [emiType, setemiType] = useState("");

  const [tenureDropdown, settenureDropdown] = useState([
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
    { id: 6, text: "6" },
    { id: 7, text: "7" },
    { id: 8, text: "8" },
    { id: 9, text: "9" },
    { id: 10, text: "10" },
    { id: 11, text: "11" },
    { id: 12, text: "12" },
  ]);

  const [roi, setroi] = useState([
    { id: 10, text: "10" },
    { id: 11, text: "11" },
    { id: 12, text: "12" },
    { id: 13, text: "13" },
    { id: 14, text: "14" },
    { id: 15, text: "15" },
    { id: 16, text: "16" },
    { id: 17, text: "17" },
    { id: 18, text: "18" },
    { id: 19, text: "19" },
    { id: 20, text: "20" },
    { id: 21, text: "21" },
    { id: 22, text: "22" },
    { id: 23, text: "23" },
    { id: 24, text: "24" },
    { id: 30, text: "30" },
    { id: 36, text: "36" },
    { id: 40, text: "40" },
  ]);

  const [options, setOptions] = useState([
    { id: 1, text: "Flat" },
    { id: 2, text: "Reduce" },
  ]);

  const executeSelectedOption = () => {
    console.log(this);
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
                              placeholder="Loan Amount"
                              value={loatamount}
                              onChange={(event) =>
                                setLoanAmount(event.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              ROI <span className="login-danger">*</span>
                            </label>
                            <Select2
                              className="w-100 form-group local-forms form-control select"
                              data={roi}
                              options={{
                                placeholder: "Enter ROI",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Tenure <span className="login-danger">*</span>
                            </label>

                            <Select2
                              className="w-100 form-group local-forms form-control select"
                              data={tenureDropdown}
                              options={{
                                placeholder: "tenure",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Emi Type
                              <span className="login-danger">*</span>
                            </label>
                            <Select2
                              className="w-100 form-group local-forms form-control select"
                              data={options}
                              options={{
                                placeholder: "Emi Type",
                              }}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="student-submit">
                            <button type="button" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>

                        <div className="col-12">
                          <h5 className="form-title">
                            <span></span>
                          </h5>
                          <div className="col-lg-12 col-12 col-md-12">
                            <div className="card">
                              <div className="card-header">
                                <h4 className="card-title">Emi Calculation</h4>
                              </div>
                              <div className="card-body">
                                <div className="table-responsive">
                                  <table className="table mb-0 ">
                                    <thead>
                                      <tr>
                                        <th>So</th>
                                        <th>Emi Amount</th>
                                        <th>Interest Amount</th>
                                        <th>Principal Amount</th>
                                        <th>Outstanding</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> 1</td>
                                        <td>1725.48</td>
                                        <td> 100</td>
                                        <td>1625.48</td>
                                        <td> 8374.52</td>
                                      </tr>
                                      <tr>
                                        <td> 2</td>
                                        <td>1725.48</td>
                                        <td> 100</td>
                                        <td>1625.48</td>
                                        <td> 8374.52</td>
                                      </tr>
                                      <tr>
                                        <td> 3</td>
                                        <td>1725.48</td>
                                        <td> 100</td>
                                        <td>1625.48</td>
                                        <td> 8374.52</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
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

export default Emicalculator;

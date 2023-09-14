import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select2 from "react-select2-wrapper";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";

const Emicalculator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [roi, setroi] = useState([
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
  ]);

  const [options, setOptions] = useState([
    { id: 1, text: "Flat" },
    { id: 2, text: "Reduce" },
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
                              placeholder="Enter ROI"
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
                              data={roi}
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
                            <button type="submit" className="btn btn-primary">
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
                                  <table className="table mb-0">
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

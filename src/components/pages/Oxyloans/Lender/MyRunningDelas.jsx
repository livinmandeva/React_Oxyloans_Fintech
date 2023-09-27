import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import "./InvoiceGrid.css";

const MyRunningDelas = () => {
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* Sidebar */}
        <SideBar />
        {/* Page Wrapper */}
        <div class="page-wrapper">
          <div class="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Participated & Closed Deals </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">View deals</li>
                  </ul>
                </div>
              </div>
            </div>

            <>
              <div className="card invoices-tabs-card border-0">
                <div className="card-body card-body pt-0 pb-0">
                  <div className="invoices-main-tabs border-0 pb-0"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-xl-12 col-12 my-lg-2">
                  <div className="card invoices-grid-card w-100">
                    <div className="card-header row">
                      <Link
                        to="/viewinvoice"
                        className="invoice-grid-link col-sm-12 col-lg-4"
                      >
                        Deal Name: SD-4S-39L-01SEP23
                      </Link>

                      <div className="col-sm-12 col-lg-2">RoI : 24 % PA</div>
                      <div className="col-sm-12 col-lg-3">
                        Tenure : 4 Months
                      </div>
                      <div className="col-auto col-lg-3">
                        Participated : 10000000
                      </div>
                      {/* <div>Status : Open</div> */}
                    </div>
                    <div className="card-middle row">
                      <div className="col-sm-12 col-lg-6">
                        <h6>Deal Type : Escrow</h6>
                        <h6>First Interest : 14/09/2023</h6>
                        <h6>Participated Date : 2022-09-24</h6>
                      </div>
                      <div className="col-sm-12 col-lg-6">
                        <small>
                          Comments : We wish every registered Lender to
                          experience the system without paying processing fee.
                          We trust a good one month experience will enable
                          lender to pay fee and participate with higher amounts.
                        </small>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-sm-6 col-lg-2">
                          <span>Deal-ID </span>
                          <h6 className="mb-0">245</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Interest Earned</span>
                          <h6 className="mb-0">INR 23467</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Payout to </span>
                          <h6 className="mb-0">BANKACCOUNT</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Is ATW</span>
                          <h6 className="mb-0">NO</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>ATW ROI</span>
                          <h6 className="mb-0">1.2 % PM</h6>
                        </div>

                        <div className="col-sm-6 col-lg-2">
                          <span>Deal Status</span>
                          <h6 className="mb-0"> Achieved</h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="badge bg-success-dark">
                            Participation Details
                          </span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-primary-dark">
                            View Statement
                          </span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-success">
                            <i className="fa fa-whatsapp"></i> Join Deal
                          </span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-danger">Raise A query</span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-info">Edit PayOut</span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-success-dark">
                            Participate
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default MyRunningDelas;

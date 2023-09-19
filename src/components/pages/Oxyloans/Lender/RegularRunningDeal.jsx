import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";

const RegularRunningDeal = () => {
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
                  <h3 className="page-title">Running & Closed Deals</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Invoice Grid</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Invoice Header */}

            <div className="card report-card">
              <div className="card-body h-10">
                <div className="row">
                  <button className="btn btn-warning col-lg-3 col-sm-6">
                    Regular Closed Delas
                  </button>
                  <button className="btn btn-success col-lg-3 col-sm-6  mx-lg-2">
                    My Participated Delas
                  </button>
                </div>
              </div>
            </div>
            <>
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-xl-12 col-12">
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
                        Deal Value : 10000000
                      </div>
                      {/* <div>Status : Open</div> */}
                    </div>
                    <div className="card-middle row">
                      <div className="col-sm-12 col-lg-6">
                        <h6>Deal Opened Time : 01-09-2023 02:13:55</h6>
                        <h6>Deal Closing Time : 01-09-2023 02:13:55</h6>
                        <h6>First Participation : 01-09-2023 02:13:55</h6>
                        <h6>Last Participation : 01-09-2023 02:13:55</h6>
                      </div>
                      <div className="col-sm-12 col-lg-6">
                        <small>
                          Comments : ATW - Any Time Withdraw We understand
                          lenders wish to withdraw funds in between the deal
                          tenure, So if you want to withdraw funds anytime
                          Monthly RoI will be reduced to 1.2% from the day 1 of
                          deal participation. We take 30 days to release the
                          funds.
                        </small>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-sm-6 col-lg-2">
                          <span>Available Limit</span>
                          <h6 className="mb-0">500000</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Min Amount</span>
                          <h6 className="mb-0">50000</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Max Amount</span>
                          <h6 className="mb-0">500000</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>ATW</span>
                          <h6 className="mb-0">NO</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>ATW ROI</span>
                          <h6 className="mb-0">1.2 % PM</h6>
                        </div>

                        <div className="col-sm-6 col-lg-2">
                          <span>Deal Status</span>
                          <h6 className="mb-0">Yet to be Achieved</h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="badge bg-success-dark">
                            Participate
                          </span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-primary-dark">
                            View Borrower Documents
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 
                <div className="col-lg-12">
                  <div className="invoice-load-btn">
                    <Link to="#" className="btn">
                      <span className="spinner-border text-primary" /> Load more
                    </Link>
                  </div>
                </div> */}
              </div>
            </>
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default RegularRunningDeal;

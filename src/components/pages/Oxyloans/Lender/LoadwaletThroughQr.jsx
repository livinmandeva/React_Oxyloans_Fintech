import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import { bulidingicon, profilebg, profileuser } from "../../../imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import "./InvoiceGrid.css";

const LoadwaletThroughQr = () => {
  const [qrcode, setqrcode] = useState(false);

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
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">
                      Load Your wallet with QR Scan
                    </h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/students">DashBoard</Link>
                      </li>
                      <li className="breadcrumb-item active">QR Code</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="student-personals-grp">
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="heading-detail">
                            <h4>
                              {" "}
                              <i class="fa-solid fa-qrcode"></i> Load Your
                              wallet with QR Scan
                            </h4>
                          </div>

                          {qrcode ? (
                            <></>
                          ) : (
                            <>
                              {" "}
                              <input
                                class="form-control"
                                placeholder="Enter the Amount"
                              />
                              <div class="d-grid gap-2 d-md-block mt-2 button-qr">
                                <button
                                  class="btn btn-primary btn-primary-1"
                                  type="button"
                                  onClick={() => {
                                    setqrcode(true);
                                  }}
                                >
                                  Button
                                </button>
                              </div>
                            </>
                          )}
                          <ul style={{ listStyle: "block" }}>
                            <code>Note:</code>
                            <li>Transaction limit is INR 1,00,000 Only.</li>

                            <li>
                              If you want to load more than a lakh, you have to
                              scan multiple times.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="student-personals-grp">
                      <div className="card">
                        <h4 className="header-title">
                          How to load the wallet through UPI
                        </h4>
                        <p className="sub-header"></p>
                        {/* 16:9 aspect ratio */}
                        <div className="ratio ratio-16x9">
                          <iframe src="https://www.youtube.com/embed/RUg_WsZ-90g?rel=0" />
                        </div>
                        {/* <div className="card-body">
                          <div className="heading-detail">
                            <h4>How to load the wallet through UPI</h4>
                          </div>
                          <div className="ratio ratio-21x9">
                            <iframe src="https://www.youtube.com/embed/RUg_WsZ-90g?rel=0" />
                          </div>
                          <div className="personal-activity">
                          
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default LoadwaletThroughQr;

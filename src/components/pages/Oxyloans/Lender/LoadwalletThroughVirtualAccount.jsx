import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import { bulidingicon, profilebg, profileuser } from "../../../imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const LoadwalletThroughVirtualAccount = () => {
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
                      Your Virtual Account with OxyLoans
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
                            <h4>Recommend</h4>
                          </div>

                          <ul style={{ listStyle: "block" }}>
                            <li>OXYLRV34447 is your virtual account.</li>
                            <li>
                              Add 'OXYLRV34447' as a beneficiary in your bank
                              account and Initiate the fund transfer
                            </li>
                            <li>
                              <code>Note </code> that there is an issue with
                              ICICI Bank while adding the virtual account.
                              Instead, add the virtual account as a beneficiary
                              in other banks (not as an ICICI payee).
                            </li>

                            <li>
                              After the funds are transferred to the account,
                              your wallet will be loaded automatically.
                            </li>
                            <li>
                              You will receive notifications on your WhatsApp
                              and email with the transaction details.
                            </li>
                            <li>
                              Keep in mind that we only accept payments in INR,
                              If you have any queries, please reach out to us by
                              :
                              <a className="virtualList" href="#">
                                clicking here.
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="student-personals-grp">
                      <div className="card">
                        <div className="card-body">
                          <div className="heading-detail">
                            <h4>Account Details :</h4>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-user">
                                <FeatherIcon icon="user" />
                              </i>
                            </div>
                            <div className="views-personal">
                              <h4>Account Name</h4>
                              <h5> SRS FINTECHLABS PVT LTD</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <img src={bulidingicon} alt="" />
                            </div>
                            <div className="views-personal">
                              <h4>Account Number </h4>
                              <h5>OXYLRV34447</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-phone-call">
                                <FeatherIcon icon="alert-octagon" size={20} />
                              </i>
                            </div>
                            <div className="views-personal">
                              <h4>IFSC Code</h4>
                              <h5>ICIC0000106</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-mail">
                                <FeatherIcon icon="briefcase" />
                              </i>
                            </div>
                            <div className="views-personal">
                              <h4>BANK</h4>
                              <h5> ICICI</h5>
                            </div>
                          </div>
                          <div className="personal-activity">
                            <div className="personal-icons">
                              <i className="feather-user">
                                <FeatherIcon icon="user" />
                              </i>
                            </div>
                            <div className="views-personal">
                              <h4>Account Type</h4>
                              <h5>Current account</h5>
                            </div>
                          </div>
                        </div>
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

export default LoadwalletThroughVirtualAccount;

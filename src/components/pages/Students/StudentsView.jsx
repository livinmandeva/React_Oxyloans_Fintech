import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import Footer from "../../Footer/Footer";
import { bulidingicon, profilebg, profileuser } from "../../imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const StudentsView = () => {
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
                <div className="row" style={{ display: "none" }}>
                  <div className="col-md-12">
                    <div className="about-info">
                      <h4>
                        Profile
                        <span>
                          <Link to="#">
                            <i className="feather-more-vertical">
                              <FeatherIcon icon="more-vertical" />
                            </i>
                          </Link>
                        </span>
                      </h4>
                    </div>
                    <div className="student-profile-head">
                      <div className="profile-bg-img">
                        <img src={profilebg} alt="Profile" />
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-4">
                          <div className="profile-user-box">
                            <div className="profile-user-img">
                              <img src={profileuser} alt="Profile" />
                              <div className="form-group students-up-files profile-edit-icon mb-0">
                                <div className="uplod d-flex">
                                  <label className="file-upload profile-upbtn mb-0">
                                    <i className="feather-edit-3">
                                      <FeatherIcon icon="edit-3" />
                                    </i>
                                    <input type="file" />
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="names-profiles">
                              <h4>Bruce Willis</h4>
                              <h5>Computer Science</h5>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 d-flex align-items-center">
                          <div className="follow-group">
                            <div className="students-follows">
                              <h5>Followers</h5>
                              <h4>2850</h4>
                            </div>
                            <div className="students-follows">
                              <h5>Followers</h5>
                              <h4>2850</h4>
                            </div>
                            <div className="students-follows">
                              <h5>Followers</h5>
                              <h4>2850</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 d-flex align-items-center">
                          <div className="follow-btn-group">
                            <button
                              type="submit"
                              className="btn btn-info follow-btns"
                            >
                              Follow
                            </button>
                            <button
                              type="submit"
                              className="btn btn-info message-btns"
                            >
                              Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
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
                                <FeatherIcon icon="phone-call" />
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
                                <FeatherIcon icon="mail" />
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
                  <div className="col-lg-6">
                    <div className="student-personals-grp">
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="heading-detail">
                            <h4>Note Points</h4>
                          </div>

                          <ul style={{ listStyle: "block" }}>
                            <li>OXYLRV34447 is your virtual account.</li>
                            <li>
                              Please add the OXYLRV34447 as a beneficiary in
                              your bank account and transfer the funds.
                            </li>
                            <li>
                              <code>Note:</code> There is an issue with icici
                              Bank while adding the virtual account Please add
                              the virtual account in other banks (not as an
                              icici payee).
                            </li>

                            <li>
                              Once the funds are transferred to the account,
                              your wallet will be loaded automatically..
                            </li>
                            <li>
                              You will receive notifications on your whatsapp
                              and email with the transaction details.
                            </li>
                            <li>
                              We accept payments in INR only, if you have any
                              queries please write to us :
                              <a class="virtualList" href="#">
                                Click here
                              </a>
                            </li>
                          </ul>
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

export default StudentsView;

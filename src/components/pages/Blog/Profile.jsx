import React from "react";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import { avatar02 } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
// import FeatherIcon from 'feather-icons-react/build/FeatherIcon'

const Profile = () => {
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
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Profile</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Profile</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <div className="profile-header">
                  <div className="row align-items-center">
                    <div className="col-auto profile-image">
                      <Link to="#">
                        <img
                          className="rounded-circle"
                          alt="User Image"
                          src={avatar02}
                        />
                      </Link>
                    </div>
                    <div className="col ms-md-n2 profile-user-info">
                      <h4 className="user-name mb-0">Mandeva Liveen</h4>
                      <h6 className="text-muted">
                        LR36549 {", Oxy Founding Lender"}
                      </h6>
                      <div className="user-Location">
                        <i className="fas fa-map-marker-alt" /> Flat No 201,
                        Balaji Arcade Apts
                      </div>
                      <div className="about-text">
                        Battalion Kondapur, Kothaguda
                      </div>
                      <div className="user-Location my-1">
                        <i className="fa-solid fa-calendar-days" /> Validity :
                        29-08-2024
                      </div>
                    </div>
                    <div className="col-auto profile-btn">
                      <Link to="#" className="btn btn-primary">
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="profile-menu">
                  <ul className="nav nav-tabs nav-tabs-solid">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        data-bs-toggle="tab"
                        to="#per_details_tab"
                      >
                        About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#profile_tab"
                      >
                        Profile Details
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#bankAccount_tab"
                      >
                        Bank Account Details
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#nominee_tab"
                      >
                        Nominee
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#uploadKyc_tab"
                      >
                        Upload KYC
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="tab-content profile-tab-cont">
                  {/* Personal Details Tab */}
                  <div
                    className="tab-pane fade show active"
                    id="per_details_tab"
                  >
                    {/* Personal Details */}
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Personal Details</span>
                              <Link
                                className="edit-link"
                                // data-bs-toggle="modal"
                                to="#"
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Name
                              </p>
                              <p className="col-sm-9">Mandeva Liveeb </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Date of Birth
                              </p>
                              <p className="col-sm-9">15/08/1997</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Email ID
                              </p>
                              <p className="col-sm-9">livinmandeva@gmail.com</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Mobile
                              </p>
                              <p className="col-sm-9">7569084614</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0">
                                Address
                              </p>
                              <p className="col-sm-9 mb-0">
                                Gumpula
                                <br />
                                suryapet
                                <br />
                                Telangana
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        {/* Account Status */}
                        <div className="card">
                          <div className="card-body profile-blog">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Bank Account</span>
                              <Link className="edit-link" to="#">
                                <i className="far fa-edit me-1" /> Edit
                              </Link>
                            </h5>
                            {/* <button className="btn btn-success" type="button">
                              <i className="fe fe-check-verified">
                                <FeatherIcon icon="check-verified" />
                              </i>
                              Active
                            </button> */}
                          </div>
                        </div>
                        {/* /Account Status */}
                        {/* Skills */}
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Kyc </span>
                              <Link className="edit-link" to="#">
                                <i className="far fa-edit me-1" /> Edit
                              </Link>
                            </h5>
                            <div className="skill-tags">
                              <span>Pan</span>
                              <span>Aadhar</span>
                              <span>Driving license </span>
                              <span>Cheque leaf </span>
                              <span>VoterID </span>
                              <span>Passport</span>
                            </div>
                          </div>
                        </div>
                        {/* /Skills */}
                      </div>
                    </div>
                    {/* /Personal Details */}
                  </div>
                  {/* /Personal Details Tab */}
                  {/* Change Password Tab */}
                  <div id="bankAccount_tab" className="tab-pane fade">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Bank Account Details</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <form>
                              <div className="row">
                                <div className="form-group col-12 col-md-4">
                                  <label>Name as Per Bank</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Account Number</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>Confirm Account Number</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>IFSC Code</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>Bank Name</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>Branch</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Branch</label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>city</label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>Mobile Number</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Otp</label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="col-12 row">
                                  <button
                                    className="btn btn-info col-md-2 mx-2"
                                    type="submit"
                                  >
                                    Send Otp
                                  </button>
                                  <button
                                    className="btn btn-primary col-md-2 mx-2"
                                    type="submit"
                                  >
                                    Verify
                                  </button>
                                  <button
                                    className="btn btn-success col-md-2 mx-2"
                                    type="submit"
                                  >
                                    Save Details
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Change Password Tab */}
                  {/* Change Nominee Tab */}
                  <div id="nominee_tab" className="tab-pane fade">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Nominee Details</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <form>
                              <div className="row">
                                <div className="form-group col-12 col-md-4">
                                  <label>Nominee Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Relation</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Nominee Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Nominee Mobile Number</label>
                                  <input
                                    type="number"
                                    minLength={10}
                                    className="form-control"
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4">
                                  <label>Account No</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>IFSC Code</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Bank Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-md-4">
                                  <label>Branch</label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="row col-12">
                                  <button
                                    className="btn btn-success col-12 col-md-4"
                                    type="submit"
                                  >
                                    Save Details
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Change Nominee Tab */}
                  {/* ///profile Tab */}
                  <div id="profile_tab" className="tab-pane fade">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Personal Details</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                            <form>
                              <div className="row mt-3">
                                <div className="form-group col-12 col-sm-4">
                                  <label>First Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Last Name</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>PAN Number</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Aadhaar Number </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>

                                <div className="form-group col-12 col-sm-4">
                                  <label>Date of Birth</label>
                                  <input
                                    type="date"
                                    className="form-control datetimepicker"
                                  />
                                </div>

                                <div className="form-group col-12 col-sm-4">
                                  <label>Father Name </label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Mobile No </label>
                                  <input
                                    type="number"
                                    minLength={10}
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>WhatsApp No </label>
                                  <input
                                    type="number"
                                    minLength={10}
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Email ID </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Residence Address</label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Pin Code </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                  />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Locality </label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>City </label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>State </label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Facebook URL </label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="form-group col-12 col-sm-4">
                                  <label>Twitter URL </label>
                                  <input type="text" className="form-control" />
                                </div>

                                <div className="form-group col-12 col-sm-4">
                                  <label>Linkedin URL </label>
                                  <input type="text" className="form-control" />
                                </div>
                                <div className="col-12 ">
                                  <button
                                    className="btn btn-primary col-md-4 col-12"
                                    type="submit"
                                  >
                                    Save Deatils
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ///profile Tab */}

                  {/* KycTab */}

                  <div id="uploadKyc_tab" className="tab-pane fade">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Upload Kyc</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                            <form>
                              <div className="row mt-3">
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Pan Card <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="image"
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                  {/* <h6 className="settings-size">
                                    <span>
                                      Image Uploaded
                                      <i className="fa fa-chek text-bg-dark"></i>
                                    </span>
                                  </h6> */}
                                </div>

                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    cheque leaf
                                    <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="image"
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Aadhar
                                    <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="image"
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Driving license
                                    <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="image"
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Voter ID
                                    <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="image"
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Passport
                                    <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="image"
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kyc Tab End */}
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

export default Profile;

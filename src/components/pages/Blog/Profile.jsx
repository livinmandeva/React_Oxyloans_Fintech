import React from "react";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import { avatar02 } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
import { useState, useEffect } from "react";
import { Success, WarningBackendApi } from "../Base UI Elements/SweetAlert";
import { toastrSuccess, toastrWarning } from "../Base UI Elements/Toast";

import {
  profileupadate,
  getUserDetails,
  handleapicall,
  sendMoblieOtp,
  loadlendernomineeDetails,
  savenomineeDeatailsApi,
  verifyBankAccountAndIfsc,
  updatebankDetails,
  uploadkyc,
  getAllUploadedDocs,
  getPanDoc,
  getdataPassport,
  getdatachequeLeaf,
  getdataDrivingLicence,
  getdataVoterId,
  getdataAadhar,
} from "../../HttpRequest/afterlogin";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Slice";

const Profile = () => {
  const reduxStoreData = useSelector((data) => data.counter.userProfile);
  const reduxStoreDataDashboard = useSelector(
    (data) => data.dashboard.fetchDashboard
  );

  const [dashboarddata, setdashboarddata] = useState({
    sendotpbtn: true,
    sendotpbtnText: "Send Otp",
    sendOtpsession: "",
    verifyotp: false,
    verifyotpText: "Verify",
    submitbankdeatail: false,
    profileData: null,
    isValid: false,
  });
  const [userProfile, setUserProfile] = useState({
    address: "",
    city: "",
    dob: "",
    facebookUrl: "",
    fatherName: "",
    firstName: "",
    lastName: "",
    linkedinUrl: "",
    locality: "",
    middleName: "",
    panNumber: "",
    permanentAddress: "",
    pinCode: "",
    state: "",
    twitterUrl: "",
    whatsAppNumber: "",
    aadharNumber: "",
    mobileNumber: "",
    email: "",
  });

  const [bankaccountprofile, setBankaccountProfile] = useState({
    sendMobileOtp: "",
    moblieNumber: "",
    bankAccount: "",
    accountNumber: "",
    bankAddress: "",
    bankName: "",
    branchName: "",
    confirmAccountNumber: "",
    ifscCode: "",
    mobileOtp: "",
    mobileOtpSession: "",
    bankAccountError: "",
    updateBankDetails: true,
    nameAtBank: "",
    bankCity: "",
  });

  const [nomineeDetails, setnomineeDetails] = useState({
    nomineeName: "",
    relation: "",
    nomineeEmail: "",
    nomineeMobile: "",
    accountNo: "",
    nomineeIfsc: "",
    bank: "",
    branch: "",
    nomineecity: "",
  });

  const [kyc, setKyc] = useState({
    aadhar: "",
    Passport: "",
    PanCard: "",
    cheque: "",
    license: "",
    Voter: "",
    isValid: true,
  });

  const handlebankchange = (event) => {
    const { value, name } = event.target;
    setBankaccountProfile({
      ...bankaccountprofile,
      [name]: value,
    });
  };

  const handlerNominee = (event) => {
    const { value, name } = event.target;
    setnomineeDetails({
      ...nomineeDetails,
      [name]: value,
    });
  };

  const savebankdetailsProfile = () => {
    const response = updatebankDetails(bankaccountprofile);
    response.then((data) => {
      if (data.request.status == 200) {
        Success("success", "Bank Details Saved Successfully");
      } else if (data.response.data.errorCode != "200") {
        WarningBackendApi("warning", data.response.data.errorMessage);
      }
    });
  };

  const submitNomineeDetails = (event) => {
    event.preventDefault();
    const response = savenomineeDeatailsApi(nomineeDetails);
    response.then((data) => {
      if (data.request.status == 200) {
        Success("success", "Nominee Details Save Successfully");
      } else if (data.response.data.errorCode != "200") {
        WarningBackendApi("warning", data.response.data.errorMessage);
      }
    });
  };

  const verifybankAccountCashfree = () => {
    const response = verifyBankAccountAndIfsc(bankaccountprofile);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data);

        if (data.data.status == "SUCCESS") {
          setdashboarddata({
            ...dashboarddata,
            verifyotpText: "Verifed",
            submitbankdeatail: true,
          });

          setBankaccountProfile({
            ...bankaccountprofile,
            nameAtBank: data.data.data.nameAtBank,
            bankName: data.data.data.bankName,
            bankCity: data.data.data.city,
            branchName: data.data.data.branch,
          });
          toastrSuccess("Sucessfully Verified!", "top-right");
        } else {
          WarningBackendApi("warning", data.data.message);
        }
      } else if (data.response.data.errorCode != "200") {
        WarningBackendApi("warning", data.response.data.errorMessage);
      }
    });
  };

  const handlefileupload = (event) => {
    const response = uploadkyc(event);
    response.then((data) => {
      if (data.request.status == 200) {
        setKyc({
          ...kyc,
          isValid: !kyc.isValid,
        });
        Success("success", `${event.target.name} Uploaded Sucessfully`);
      } else if (data.response.data.errorCode != "200") {
        WarningBackendApi("warning", data.response.data.errorMessage);
      }
    });
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setUserProfile(
      (prevUserProfile) => ({
        ...prevUserProfile,
        [name]: value,
      }),
      () => {}
    );
  };

  const handleprofileUpdate = () => {
    const response = profileupadate(userProfile);
    response.then((data) => {
      if (data.request.status == 200) {
        Success("success", "Personal Details Save Successfully");
      } else if (data.response.data.errorCode != "200") {
        WarningBackendApi("warning", data.response.data.errorMessage);
      }
    });
  };

  const sendotp = async () => {
    const response = sendMoblieOtp(bankaccountprofile);
    response.then((data) => {
      if (data.request.status == 200) {
        setdashboarddata({
          ...dashboarddata,
          sendotpbtn: true,
          verifyotp: true,
          sendotpbtnText: "ReSend Otp",
          sendOtpsession: data.data.mobileOtpSession,
          isValid: true,
        });

        setBankaccountProfile({
          ...bankaccountprofile,
          mobileOtpSession: data.data.mobileOtpSession,
        });

        toastrSuccess("Otp Sent Sucessfully!", "top-right");
      } else if (data.response.data.errorCode != "200") {
        toastrWarning(data.response.data.errorMessage);
      }
    });
  };

  const openTheActiveTabs = (type) => {
    var i, j;
    let tablinks = document.getElementsByClassName("nav-link");
    let tapPan = document.getElementsByClassName("tab-pane");

    for (i = 0; i < tablinks.length; i++) {
      if (tablinks[i].classList.contains(type)) {
        tablinks[i].classList.add("active");
      } else {
        tablinks[i].classList.remove("active");
      }
    }

    for (j = 0; j < tapPan.length; j++) {
      if (tapPan[j].classList.contains(type)) {
        tapPan[j].classList.add("active");
        tapPan[j].classList.add("show");
      } else {
        tapPan[j].classList.remove("active");
        tapPan[j].classList.remove("show");
      }
    }
  };

  useEffect(() => {
    const nomineresponse = loadlendernomineeDetails();
    nomineresponse.then((data) => {
      if (data.request.status == 200) {
        console.log(data);
        setnomineeDetails({
          ...nomineeDetails,
          nomineeName: data.data.name == null ? "" : data.data.name,
          relation: data.data.relation == null ? "" : data.data.relation,
          nomineeEmail: data.data.emial == null ? "" : data.data.emial,
          nomineeMobile:
            data.data.mobileNumber == null ? "" : data.data.mobileNumber,
          accountNo:
            data.data.accountNumber == null ? "" : data.data.accountNumber,
          nomineeIfsc: data.data.ifscCode == null ? "" : data.data.ifscCode,
          bank: data.data.bankName == null ? "" : data.data.bankName,
          branch: data.data.branchName == null ? "" : data.data.branchName,
          nomineecity: data.data.city == null ? "" : data.data.city,
        });
      }
    });
  }, []);

  useEffect(() => {
    getUserDetails().then((data) => {
      console.log(data.data);
      localStorage.setItem("userType", data.data.userDisplayId);
      setdashboarddata({
        ...dashboarddata,
        profileData: data,
      });
      setUserProfile({
        ...userProfile,
        address: data.data.address,
        city: data.data.city,
        dob: data.data.dob,
        facebookUrl: data.data.urlsDto.faceBookUrl,
        fatherName: data.data.fatherName,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        linkedinUrl: data.data.urlsDto.linkdinUrl,
        locality: data.data.locality,
        middleName: data.data.middleName,
        panNumber: data.data.panNumber,
        permanentAddress: data.data.permanentAddress,
        pinCode: data.data.pinCode,
        state: data.data.state,
        twitterUrl: data.data.urlsDto.twitterUrl,
        whatsAppNumber: data.data.whatsAppNumber,
        aadharNumber: data.data.aadharNumber,
        mobileNumber: data.data.mobileNumber,
        email: data.data.email,
      });
      setBankaccountProfile({
        ...bankaccountprofile,
        accountNumber: data.data.accountNumber,
        bankAddress: data.data.bankAddress,
        bankName: data.data.bankName,
        branchName: data.data.branchName,
        confirmAccountNumber: data.data.accountNumber,
        ifscCode: data.data.ifscCode,
        nameAtBank: data.data.userName,
        bankCity: data.data.bankAddress,
        moblieNumber: data.data.mobileNumber,
      });
    });
  }, []);

  useEffect(() => {
    const fetchApiData1 = () => {
      return getPanDoc();
    };
    const fetchApiData2 = () => {
      return getdataPassport();
    };
    const fetchApiData3 = () => {
      return getdatachequeLeaf();
    };
    const fetchApiData4 = () => {
      return getdataDrivingLicence();
    };
    const fetchApiData5 = () => {
      return getdataVoterId();
    };
    const fetchApiData6 = () => {
      return getdataAadhar();
    };

    Promise.all([
      fetchApiData1(),
      fetchApiData2(),
      fetchApiData3(),
      fetchApiData4(),
      fetchApiData5(),
      fetchApiData6(),
    ])
      .then((responses) => {
        setKyc({
          ...kyc,
          PanCard: responses[0].data,
          Passport: responses[1].data,
          cheque: responses[2].data,
          license: responses[3].data,
          Voter: responses[4].data,
          aadhar: responses[5].data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [kyc.isValid]);

  console.log(kyc);
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
                      <Link to="/dashboard">Dashboard</Link>
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
                      <h4 className="user-name mb-0">
                        {reduxStoreData.length != 0
                          ? reduxStoreData.firstName
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.firstName
                          : "Livin"}
                      </h4>
                      <h6 className="text-muted">
                        LR
                        {reduxStoreData.length != 0
                          ? reduxStoreData.userId
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.userId
                          : "LR18"}
                        {`, ${
                          reduxStoreData.length != 0
                            ? reduxStoreData.groupName
                            : dashboarddata.profileData != null
                            ? dashboarddata.profileData.data.groupName
                            : "NewLender"
                        }`}
                      </h6>
                      <div className="user-Location">
                        <i className="fas fa-map-marker-alt" />{" "}
                        {reduxStoreData.length != 0
                          ? reduxStoreData.city
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.city
                          : ""}
                      </div>
                      <div className="about-text">
                        {reduxStoreData.length != 0
                          ? reduxStoreData.address
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.address
                          : ""}
                      </div>

                      {reduxStoreData.groupName != "NewLender" && (
                        <div className="user-Location my-1">
                          <i className="fa-solid fa-calendar-days" /> Validity :
                          {reduxStoreDataDashboard.validityDate}
                        </div>
                      )}
                    </div>
                    <div className="col-auto profile-btn">
                      <Link
                        className="btn btn-primary"
                        to="#"
                        onClick={(e) => {
                          openTheActiveTabs("Personal");
                        }}
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="profile-menu">
                  <ul className="nav nav-tabs nav-tabs-solid">
                    <li className="nav-item">
                      <Link
                        className="nav-link About active"
                        data-bs-toggle="tab"
                        to="#per_details_tab"
                      >
                        About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Personal"
                        data-bs-toggle="tab"
                        to="#profile_tab"
                      >
                        Profile Details
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link Bank"
                        data-bs-toggle="tab"
                        to="#bankAccount_tab"
                      >
                        Bank Account Details
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Nominee"
                        data-bs-toggle="tab"
                        to="#nominee_tab"
                      >
                        Nominee
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Kyc"
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
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Personal");
                                }}
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Name
                              </p>
                              <p className="col-sm-9">
                                {reduxStoreData.firstName}
                              </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Date of Birth
                              </p>
                              <p className="col-sm-9">{reduxStoreData.dob}</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Email ID
                              </p>
                              <p className="col-sm-9">{reduxStoreData.email}</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Mobile
                              </p>
                              <p className="col-sm-9">
                                {reduxStoreData.mobileNumber}
                              </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0">
                                Address
                              </p>
                              <p className="col-sm-9 mb-0">
                                {reduxStoreData.address}
                                <br />

                                {reduxStoreData.city}
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
                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Bank");
                                }}
                              >
                                <i className="far fa-edit me-1" /> Edit
                              </Link>
                            </h5>
                          </div>
                        </div>
                        {/* /Account Status */}
                        {/* Skills */}
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Kyc </span>
                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Kyc");
                                }}
                              >
                                <i className="far fa-edit me-1" />
                                KYC
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
                  <div id="bankAccount_tab" className="tab-pane fade Bank">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Bank Account Details</h5>
                        <br />
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <div className="row">
                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Name as Per Bank
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=" Enter your Name"
                                  name="nameAtBank"
                                  onChange={handlebankchange}
                                  value={bankaccountprofile.nameAtBank}
                                />
                              </div>
                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Account Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="accountNumber"
                                  onChange={handlebankchange}
                                  placeholder=" Enter your Account Number"
                                  value={bankaccountprofile.accountNumber}
                                />
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Confirm Account Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="confirmAccountNumber"
                                  onChange={handlebankchange}
                                  placeholder=" Confirm Account Number"
                                  value={
                                    bankaccountprofile.confirmAccountNumber
                                  }
                                />
                                {bankaccountprofile.bankAccountError && (
                                  <span className="login-danger">
                                    {bankaccountprofile.bankAccountError}
                                  </span>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  IFSC Code
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="ifscCode"
                                  onChange={handlebankchange}
                                  placeholder=" Enter your IFSC Code"
                                  value={bankaccountprofile.ifscCode}
                                />
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Bank Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bankName"
                                  onChange={handlebankchange}
                                  placeholder=" Enter your Bank Name"
                                  value={bankaccountprofile.bankName}
                                />
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Branch
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="branchName"
                                  placeholder=" Enter your Branch"
                                  onChange={handlebankchange}
                                  value={bankaccountprofile.branchName}
                                />
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Bank city{" "}
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bankCity"
                                  placeholder=" Enter your Bank City"
                                  onChange={handlebankchange}
                                  value={bankaccountprofile.bankCity}
                                />
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Mobile Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="moblieNumber"
                                  placeholder=" Enter your Mobile Number"
                                  onChange={handlebankchange}
                                  value={bankaccountprofile.moblieNumber}
                                />
                              </div>

                              {dashboarddata.isValid && (
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Otp <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="mobileOtp"
                                    placeholder=" Enter your Mobile otp"
                                    onChange={handlebankchange}
                                    value={bankaccountprofile.mobileOtp}
                                  />
                                </div>
                              )}

                              <div className="col-12 row">
                                {dashboarddata.sendotpbtn && (
                                  <button
                                    className="btn btn-secondary col-md-2 mx-2"
                                    type="submit"
                                    onClick={sendotp}
                                  >
                                    {dashboarddata.sendotpbtnText}
                                  </button>
                                )}
                                {dashboarddata.verifyotp && (
                                  <button
                                    className="btn btn-warning col-md-2 mx-2"
                                    type="submit"
                                    onClick={verifybankAccountCashfree}
                                  >
                                    {dashboarddata.verifyotpText}
                                  </button>
                                )}

                                {dashboarddata.submitbankdeatail && (
                                  <button
                                    className="btn btn-success col-md-2 mx-2"
                                    type="submit"
                                    onClick={savebankdetailsProfile}
                                  >
                                    Save Details
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Change Password Tab */}
                  {/* Change Nominee Tab */}
                  <div id="nominee_tab" className="tab-pane fade Nominee">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Nominee Details</h5>
                        <br />
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <form action="#" onSubmit={submitNomineeDetails}>
                              <div className="row">
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Name
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Enter your Nominee Name"
                                    value={nomineeDetails.nomineeName}
                                    name="nomineeName"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Relation
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Enter your  Relation"
                                    value={nomineeDetails.relation}
                                    name="relation"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Email
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder=" Enter  Nominee Email"
                                    value={nomineeDetails.nomineeEmail}
                                    name="nomineeEmail"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Mobile Number
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    minLength={10}
                                    className="form-control"
                                    placeholder=" Enter  Nominee mobile no "
                                    value={nomineeDetails.nomineeMobile}
                                    name="nomineeMobile"
                                    onChange={handlerNominee}
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Account No
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="  Nominee Name Account No"
                                    value={nomineeDetails.accountNo}
                                    name="accountNo"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    IFSC Code
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nominee IFSC Code"
                                    value={nomineeDetails.nomineeIfsc}
                                    name="nomineeIfsc"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Bank Name
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Nominee Bank Name"
                                    value={nomineeDetails.bank}
                                    name="bank"
                                    onChange={handlerNominee}
                                  />
                                </div>

                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee City
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Nominee City Name"
                                    value={nomineeDetails.nomineecity}
                                    name="nomineecity"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Branch
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nominee Branch"
                                    value={nomineeDetails.branch}
                                    name="branch"
                                    onChange={handlerNominee}
                                  />
                                </div>

                                <div className="row col-12">
                                  <button
                                    className="btn btn-success col-12 col-md-4"
                                    type="submit"
                                  >
                                    Save Nominee Details
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
                  <div id="profile_tab" className="tab-pane fade Personal">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Personal Details</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                            <div className="row mt-3">
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  First Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter First Name"
                                  onChange={handlechange}
                                  value={userProfile.firstName}
                                  name="firstName"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Last Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Last Name"
                                  onChange={handlechange}
                                  value={userProfile.lastName}
                                  name="lastName"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  PAN Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter PAN Number"
                                  onChange={handlechange}
                                  value={userProfile.panNumber}
                                  name="panNumber"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Aadhaar Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter Aadhar Number"
                                  onChange={handlechange}
                                  value={userProfile.aadharNumber}
                                  name="aadharNumber"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Date of Birth
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="date"
                                  className="form-control datetimepicker"
                                  onChange={handlechange}
                                  value={userProfile.dob}
                                  name="dob"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Father Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Father Name"
                                  onChange={handlechange}
                                  value={userProfile.fatherName}
                                  name="fatherName"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Mobile No
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  maxLength={10}
                                  className="form-control"
                                  placeholder="Enter Mobile Name"
                                  onChange={handlechange}
                                  value={userProfile.mobileNumber}
                                  name="mobileNumber"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  WhatsApp No
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  maxLength={10}
                                  className="form-control"
                                  placeholder="Enter WhatsApp Name"
                                  onChange={handlechange}
                                  value={userProfile.whatsAppNumber}
                                  name="whatappNumber"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Email ID
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter Email Id"
                                  onChange={handlechange}
                                  value={userProfile.email}
                                  name="email"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Residence Address
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Residence Address"
                                  onChange={handlechange}
                                  value={userProfile.permanentAddress}
                                  name="permanentAddress"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Pin Code
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter Pincode"
                                  onChange={handlechange}
                                  value={userProfile.pinCode}
                                  name="pinCode"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Locality
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Locality "
                                  onChange={handlechange}
                                  value={userProfile.address}
                                  name="address"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  City <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter City "
                                  onChange={handlechange}
                                  value={userProfile.city}
                                  name="city"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  State
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter State"
                                  onChange={handlechange}
                                  value={userProfile.state}
                                  name="state"
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Facebook URL
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Facebook Url"
                                  onChange={handlechange}
                                  value={userProfile.facebookUrl}
                                  name="facebookUrl"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Twitter URL
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Twitter Url"
                                  onChange={handlechange}
                                  value={userProfile.twitterUrl}
                                  name="twitterUrl"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Linkedin URL
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Linkedin  Url"
                                  onChange={handlechange}
                                  value={userProfile.linkedinUrl}
                                  name="linkedinUrl"
                                />
                              </div>
                              <div className="col-12 ">
                                <button
                                  className="btn btn-primary col-md-4 col-12"
                                  type="submit"
                                  onClick={handleprofileUpdate}
                                >
                                  Save Deatils
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ///profile Tab */}

                  {/* KycTab */}

                  <div id="uploadKyc_tab" className="tab-pane fade Kyc">
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
                                      name="PAN"
                                      id="file"
                                      className="hide-input custom-file-input"
                                      onChange={handlefileupload}
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>

                                  {kyc.PanCard != "" ? (
                                    <h6 className="settings-size text-success">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>{kyc.PanCard.fileName}</small>
                                    </h6>
                                  ) : (
                                    <h6 className="settings-size text-warning">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>Upload Pan</small>
                                    </h6>
                                  )}
                                </div>

                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Cheque Leaf
                                    <span className="star-red">*</span>
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="CHEQUELEAF"
                                      id="file"
                                      className="hide-input"
                                      onChange={handlefileupload}
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>
                                  {kyc.cheque != "" ? (
                                    <h6 className="settings-size text-success">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>{kyc.cheque.fileName}</small>
                                    </h6>
                                  ) : (
                                    <h6 className="settings-size text-warning">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>Upload Cheque</small>
                                    </h6>
                                  )}
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
                                      name="AADHAR"
                                      id="file"
                                      className="hide-input"
                                      onChange={handlefileupload}
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>

                                  {kyc.aadhar != "" ? (
                                    <h6 className="settings-size text-success">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>{kyc.aadhar.fileName}</small>
                                    </h6>
                                  ) : (
                                    <h6 className="settings-size text-warning">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>Upload Aadhar</small>
                                    </h6>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Driving License
                                    {/* <span className="star-red">*</span> */}
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="DRIVINGLICENCE"
                                      id="file"
                                      className="hide-input"
                                      onChange={handlefileupload}
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>

                                  {kyc.license != "" ? (
                                    <h6 className="settings-size text-success">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>{kyc.license.fileName}</small>
                                    </h6>
                                  ) : (
                                    <h6 className="settings-size text-warning">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>Upload License</small>
                                    </h6>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Voter ID
                                    {/* <span className="star-red">*</span> */}
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="VOTERID"
                                      onChange={handlefileupload}
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>

                                  {kyc.Voter != "" ? (
                                    <h6 className="settings-size text-success">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>{kyc.Voter.fileName}</small>
                                    </h6>
                                  ) : (
                                    <h6 className="settings-size text-warning">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>Upload Voter Id</small>
                                    </h6>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-6">
                                  <p className="settings-label">
                                    Passport
                                    {/* <span className="star-red">*</span> */}
                                  </p>
                                  <div className="settings-btn">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="PASSPORT"
                                      onChange={handlefileupload}
                                      id="file"
                                      className="hide-input"
                                    />
                                    <label htmlFor="file" className="upload">
                                      <i className="feather-upload">
                                        <FeatherIcon icon="upload" />
                                      </i>
                                    </label>
                                  </div>

                                  {kyc.Passport != "" ? (
                                    <h6 className="settings-size text-success">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>{kyc.Passport.fileName}</small>
                                    </h6>
                                  ) : (
                                    <h6 className="settings-size text-warning">
                                      <i className="fa-solid fa-check mx-lg-1 "></i>
                                      <small>Upload Passport</small>
                                    </h6>
                                  )}
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

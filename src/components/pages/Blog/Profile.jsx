import React from "react";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import { avatar02 } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
import { useState, useEffect } from "react";
import {
  Success,
  WarningAlerterror,
  WarningBackendApi,
} from "../Base UI Elements/SweetAlert";
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
    aadharerror: "",
    mobileNumber: "",
    email: "",
    addresserror: "",
    cityer: "",
    doberror: "",
    fatherNameerror: "",
    firstNamrror: "",
    lastNamerror: "",
    panNumbererror: "",
    permanentAddresserror: "",
    pinCodeerror: "",
    stateerror: "",
    whatsAppNumbererror: "",
    aadhaarNumbererror: "",
    aadhaarNumbererror: "",
    mobileNumbererror: "",
    emailerror: "",
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
    moblieNumbererror: "",
    bankAccounterror: "",
    accountNumbererror: "",
    bankAddresserror: "",
    bankNameerror: "",
    branchNameerror: "",
    confirmAccountNumbererror: "",
    ifscCodeerror: "",
    mobileOtperror: "",
    mobileOtpSessionerror: "",
    bankAccountError: "",
    nameAtBankerror: "",
    bankCityerror: "",
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
    copyerror: "",
    isdeatail: false,
  });

  const [kyc, setKyc] = useState({
    aadhar: "",
    Passport: "",
    PanCard: "",
    CHEQUELEAF: "",
    DRIVINGLICENCE: "",
    VOTERID: "",
    isValid: true,
  });

  const handlebankchange = (event) => {
    const { value, name } = event.target;
    setBankaccountProfile({
      ...bankaccountprofile,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userProfile.aadharerror >= 12) {
      setUserProfile({
        ...userProfile,
        aadharerror: "aadhaar Number must be 12 digit",
      });
    } else {
      setUserProfile({
        ...userProfile,
        aadharerror: "",
      });
    }
  }, [userProfile.aadharerror]);
  const handlerNominee = (event) => {
    const { value, name } = event.target;
    setnomineeDetails({
      ...nomineeDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      nomineeDetails.nomineeName != "" &&
      nomineeDetails.relation != "" &&
      nomineeDetails.nomineeEmail != "" &&
      nomineeDetails.nomineeMobile != "" &&
      nomineeDetails.accountNo != "" &&
      nomineeDetails.nomineeIfsc != "" &&
      nomineeDetails.bank != "" &&
      nomineeDetails.branch != "" &&
      nomineeDetails.nomineecity != ""
    ) {
      console.log("all fileds are success");
      setnomineeDetails({
        ...nomineeDetails,
        isdeatail: true,
      });
    }
  }, [nomineeDetails.nomineeName]);
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
    if (nomineeDetails.isdeatail == true) {
      const response = savenomineeDeatailsApi(nomineeDetails);
      response.then((data) => {
        if (data.request.status == 200) {
          Success("success", "Nominee Details Save Successfully");
        } else if (data.response.data.errorCode != "200") {
          WarningBackendApi("warning", data.response.data.errorMessage);
        }
      });
    } else {
      WarningBackendApi("warning");
    }
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
    response
      .then((data) => {
        console.log(data);
        if (data && data.request && data.request.status === 200) {
          setKyc((prevKyc) => ({
            ...prevKyc,
            isValid: !prevKyc.isValid,
          }));
          Success("success", `${event.target.name} Uploaded Successfully`);
        } else if (
          data &&
          data.response &&
          data.response.data &&
          data.response.data.errorCode !== "200"
        ) {
          WarningBackendApi("warning", data.response.data.errorMessage);
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error during file upload:", error);
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

  const handlePaste = (event) => {
    event.preventDefault();
    // alert('Copying and pasting is disabled for this field.');
    setnomineeDetails({
      ...nomineeDetails,
      copyerror: "Copying and pasting is disabled for this field.",
    });
  };

  const handleCopy = (event) => {
    event.preventDefault();
    // alert('Copying and pasting is disabled for this field.');
    setnomineeDetails({
      ...nomineeDetails,
      copyerror: "Copying and pasting is disabled for this field.",
    });
  };

  const handleprofileUpdate = () => {
    if (
      userProfile.email === "" ||
      userProfile.firstName === "" ||
      userProfile.mobileNumber === "" ||
      userProfile.whatsAppNumber === "" ||
      userProfile.city === "" ||
      userProfile.pinCode === "" ||
      userProfile.fatherName === "" ||
      userProfile.city === "" ||
      userProfile.state === "" ||
      userProfile.aadharNumber === "" ||
      userProfile.city === "" ||
      userProfile.locality === ""
    ) {
      setUserProfile({
        ...userProfile,

        addresserror:
          userProfile.address === "" ? "Please enter the address" : "",
        cityer: userProfile.city === "" ? "Please enter the city" : "",
        doberror: userProfile.dob === "" ? "Please enter the dob" : "",
        fatherNameerror:
          userProfile.fatherName === "" ? "Please enter the father Name" : "",
        firstNamrror:
          userProfile.firstName === "" ? "Please enter the first Name" : "",
        panNumbererror:
          userProfile.panNumber === "" ? "Please enter the panNumber" : "",
        permanentAddresserror:
          userProfile.permanentAddress === ""
            ? "Please enter the Residence Address"
            : "",
        pinCodeerror:
          userProfile.pinCode === "" ? "Please enter the pinCode" : "",
        stateerror: userProfile.state === "" ? "Please enter the state" : "",
        whatsAppNumbererror:
          userProfile.whatsAppNumber === ""
            ? "Please enter the whatsAppNumber"
            : "",
        aadhaarNumbererror:
          userProfile.aadharNumber === ""
            ? "Please enter the Aadhaar Number"
            : "",

        mobileNumbererror:
          userProfile.mobileNumber === ""
            ? "Please enter the mobileNumber"
            : "",
        emailerror: userProfile.email === "" ? "Please enter the email" : "",
      });
    } else {
      const response = profileupadate(userProfile);
      response.then((data) => {
        if (data.request.status == 200) {
          Success("success", "Personal Details Save Successfully");
        } else if (data.response.data.errorCode != "200") {
          WarningBackendApi("warning", data.response.data.errorMessage);
        }
      });
    }
  };

  const sendotp = async () => {
    console.log(bankaccountprofile.nameAtBank);
    if (
      (bankaccountprofile.nameAtBank === "" ||
        bankaccountprofile.nameAtBank === null) &&
      (bankaccountprofile.accountNumber === "" ||
        bankaccountprofile.accountNumber === null) &&
      (bankaccountprofile.confirmAccountNumber === "" ||
        bankaccountprofile.confirmAccountNumber === null) &&
      (bankaccountprofile.ifscCode === "" ||
        bankaccountprofile.ifscCode === null) &&
      (bankaccountprofile.bankName === "" ||
        bankaccountprofile.bankName === null) &&
      (bankaccountprofile.branchName === "" ||
        bankaccountprofile.branchName === null) &&
      (bankaccountprofile.bankCityerror === "" ||
        bankaccountprofile.bankCity === null) &&
      (bankaccountprofile.moblieNumbererror === "" ||
        bankaccountprofile.moblieNumber === null)
    ) {
      console.log("true");
      setBankaccountProfile((stateconta) => ({
        ...stateconta,
        moblieNumbererror:
          bankaccountprofile.moblieNumber !== ""
            ? "Enter the Mobile Number"
            : "",
        accountNumbererror:
          bankaccountprofile.accountNumber !== ""
            ? "Enter the account Number"
            : "",
        confirmAccountNumbererror:
          bankaccountprofile.confirmAccountNumber !== ""
            ? "Enter the Confirm Account Number"
            : "",
        ifscCodeerror:
          bankaccountprofile.ifscCode !== "" ? "Enter the IFSC Code" : "",
        bankNameerror:
          bankaccountprofile.bankName !== "" ? "Enter the bank Name " : "",
        branchNameerror:
          bankaccountprofile.branchName !== "" ? "Enter the branch Name  " : "",
        bankCityerror:
          bankaccountprofile.bankCity !== "" ? "Enter the bank City" : "",
        // Add other error messages as needed
      }));
    } else {
      console.log("false");
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
      verifybankAccountCashfree();
    }
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
          CHEQUELEAF: responses[2].data,
          DRIVINGLICENCE: responses[3].data,
          VOTERID: responses[4].data,
          aadhar: responses[5].data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [kyc.isValid]);

  // console.log(kyc);
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
                          src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-512.png"
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
                        <i className="far fa-edit me-1" /> Edit
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
                        <i className="fa-regular fa-address-card"></i> About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Personal"
                        data-bs-toggle="tab"
                        to="#profile_tab"
                      >
                        <i className="fa-regular fa-user"></i> Profile Details
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link Bank"
                        data-bs-toggle="tab"
                        to="#bankAccount_tab"
                      >
                        <i className="fa-solid fa-building-columns"></i> Bank
                        Account Details
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Nominee"
                        data-bs-toggle="tab"
                        to="#nominee_tab"
                      >
                        <i className="fa-solid fa-user-plus"></i> Nominee
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Kyc"
                        data-bs-toggle="tab"
                        to="#uploadKyc_tab"
                      >
                        <i className="fa-solid fa-upload"></i> Upload KYC
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
                                Edit
                              </Link>
                            </h5>
                          </div>
                        </div>
                        {/* /Skills */}
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Nominee </span>
                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Nominee");
                                }}
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                          </div>
                        </div>
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
                                {bankaccountprofile.nameAtBank && (
                                  <div className="text-danger">
                                    {bankaccountprofile.nameAtBankerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Account Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="accountNumber"
                                  onChange={handlebankchange}
                                  placeholder=" Enter your Account Number"
                                  maxLength={14}
                                  value={bankaccountprofile.accountNumber}
                                />
                                {bankaccountprofile.accountNumbererror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.accountNumbererror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Confirm Account Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="confirmAccountNumber"
                                  onChange={handlebankchange}
                                  placeholder="Enter Confirm Account Number"
                                  onPaste={handlePaste}
                                  maxLength={14}
                                  onCopy={handleCopy}
                                  value={
                                    bankaccountprofile.confirmAccountNumber
                                  }
                                />
                                {bankaccountprofile.bankAccountError && (
                                  <span className="login-danger">
                                    {bankaccountprofile.bankAccountError}
                                  </span>
                                )}
                                {nomineeDetails.copyerror && (
                                  <span className="login-danger">
                                    {nomineeDetails.copyerror}
                                  </span>
                                )}
                                {bankaccountprofile.confirmAccountNumbererror && (
                                  <div className="text-danger">
                                    {
                                      bankaccountprofile.confirmAccountNumbererror
                                    }
                                  </div>
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
                                  maxLength={12}
                                  value={bankaccountprofile.ifscCode}
                                />
                                {bankaccountprofile.ifscCodeerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.ifscCodeerror}
                                  </div>
                                )}
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
                                {bankaccountprofile.bankNameerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.bankNameerror}
                                  </div>
                                )}
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
                                {bankaccountprofile.branchNameerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.branchNameerror}
                                  </div>
                                )}
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
                                {bankaccountprofile.bankCityerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.bankCityerror}
                                  </div>
                                )}
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
                                {bankaccountprofile.moblieNumbererror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.moblieNumbererror}
                                  </div>
                                )}
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
                                    type="tel"
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
                                    Nominee Name Account No
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="  Nominee Name Account No"
                                    value={nomineeDetails.accountNo}
                                    name="accountNo"
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee IFSC Code
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
                                    Nominee Bank Name
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
                                    className="btn btn-success col-12 col-md-2"
                                    type="submit"
                                  >
                                    Save
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
                                {userProfile.firstNamrror && (
                                  <div className="text-danger">
                                    {userProfile.firstNamrror}
                                  </div>
                                )}
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
                                {userProfile.lastNamerror && (
                                  <div className="text-danger">
                                    {userProfile.lastNamerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Pan Number
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

                                {userProfile.panNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.panNumbererror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Aadhaar Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter Aadhaar Number"
                                  onChange={handlechange}
                                  value={userProfile.aadharNumber}
                                  maxLength={12}
                                  name="aadharNumber"
                                />
                                {userProfile.aadhaarNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.aadhaarNumbererror}
                                  </div>
                                )}
                                {/* {userProfile.aadharerror != "" ? (
                                  <div className="error">
                                    {userProfile.aadharerror}
                                  </div>
                                ) : (
                                  <></>
                                )} */}
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Date of Birth
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type={userProfile.dob == "" ? "date" : ""}
                                  className="form-control "
                                  onChange={handlechange}
                                  value={userProfile.dob}
                                  name="dob"
                                />

                                {userProfile.doberror && (
                                  <div className="text-danger">
                                    {userProfile.doberror}
                                  </div>
                                )}
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
                                {userProfile.fatherNameerror && (
                                  <div className="text-danger">
                                    {userProfile.fatherNameerror}
                                  </div>
                                )}
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
                                {userProfile.mobileNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.mobileNumbererror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  WhatsApp No
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  maxLength={10}
                                  className="form-control"
                                  placeholder="Enter WhatsApp "
                                  onChange={handlechange}
                                  value={userProfile.whatsAppNumber}
                                  name="whatsAppNumber"
                                />
                                {userProfile.whatsAppNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.whatsAppNumbererror}
                                  </div>
                                )}
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

                                {userProfile.emailerror && (
                                  <div className="text-danger">
                                    {userProfile.emailerror}
                                  </div>
                                )}
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
                                {userProfile.permanentAddresserror && (
                                  <div className="text-danger">
                                    {userProfile.permanentAddresserror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Pin Code
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter Pincode"
                                  maxLength={6}
                                  onChange={handlechange}
                                  value={userProfile.pinCode}
                                  name="pinCode"
                                />
                                {userProfile.pinCodeerror && (
                                  <div className="text-danger">
                                    {userProfile.pinCodeerror}
                                  </div>
                                )}
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
                                {userProfile.addresserror && (
                                  <div className="text-danger">
                                    {userProfile.addresserror}
                                  </div>
                                )}
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
                                {userProfile.cityer && (
                                  <div className="text-danger">
                                    {userProfile.cityer}
                                  </div>
                                )}
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
                                {userProfile.stateerror && (
                                  <div className="text-danger">
                                    {userProfile.stateerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Facebook URL
                                  <span className="login-danger"></span>
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
                                  <span className="login-danger"></span>
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
                                  <span className="login-danger"></span>
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
                            <div className="row mt-3">
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Pan Card <span className="star-red">*</span>
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    name="pan"
                                    id="pan"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label htmlFor="file" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.PanCard != undefined &&
                                kyc.PanCard != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.PanCard.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
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
                                    name="CHEQUELEAF"
                                    accept="image/*"
                                    id="CHEQUELEAF"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label
                                    htmlFor="CHEQUELEAF"
                                    className="upload"
                                  >
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>
                                {kyc.CHEQUELEAF != undefined &&
                                kyc.CHEQUELEAF != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.CHEQUELEAF.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Cheque</small>
                                  </h6>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Aadhaar
                                  <span className="star-red">*</span>
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="aadhar"
                                    id="aadhar"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label htmlFor="aadhar" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.aadhar != undefined && kyc.aadhar != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.aadhar.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
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
                                    id="license"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label htmlFor="license" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>
                                {kyc.DRIVINGLICENCE != undefined &&
                                kyc.DRIVINGLICENCE != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.DRIVINGLICENCE.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload License</small>
                                  </h6>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">Voter ID</p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id="VOTERID"
                                    name="VOTERID"
                                    onChange={handlefileupload}
                                    className="hide-input"
                                  />
                                  <label htmlFor="VOTERID" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.VOTERID != undefined &&
                                kyc.VOTERID != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.VOTERID.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
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
                                    id="Passport"
                                    accept="image/*"
                                    name="Passport"
                                    onChange={handlefileupload}
                                    className="hide-input"
                                  />
                                  <label htmlFor="Passport" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.Passport != undefined &&
                                kyc.Passport != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.Passport.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Passport</small>
                                  </h6>
                                )}
                              </div>
                            </div>
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

import React, { useEffect, useState } from "react";
import BorrowerHeader from "../../../Header/BorrowerHeader";
import BorrowerSidebar from "../../../SideBar/BorrowerSidebar";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { onShowSizeChange } from "../../../Pagination";
import { getMyWithdrawalHistory } from "../../../HttpRequest/afterlogin";
import { cancelwithdrawalRequestInformation } from "../../Base UI Elements/SweetAlert";
import {
  getUserId,
  profilesubmit,
  getemailcontent,
  bulkinvitegmailLink,
} from "../../../HttpRequest/afterlogin";

import {
  HandleWithFooter,
  WarningBackendApi,
} from "../../Base UI Elements/SweetAlert";
import Invaitemodel from "../Utills/Modals/Invaitemodel";

const ReferFriend = () => {
  const [profile, setprofile] = useState({
    email: "",
    mobileNumber: "",
    name: "",
    mailSubject: 0,
    referrerId: "",
    primaryType: "LENDER",
    citizenType: "NONNRI",
    seekerRequestedId: "0",
    inviteType: "SingleInvite",
    mailContent: 0,
    savebtndisable: true,
  });

  const [emailres, setEmailres] = useState({
    emailcontent: "",
    emailsubject: "",
    buttomemail: "",
    invaitemodel: false,
    invaitlenderlink: false,
    invaitborrowerlink: false,
    invaitNrilink: false,
  });
  const [url, seturl] = useState("");

  const handlechanges = (event) => {
    const { name, value } = event.target;
    setprofile({
      ...profile,
      [name]: value,
    });
  };

  useEffect(() => {
    const getemail = async () => {
      try {
        const response = await getemailcontent(); // Assuming getemailcontent is an async function
        setEmailres({
          ...emailres,
          emailcontent: response.data.mailContent,
          emailsubject: response.data.mailSubject,
          buttomemail: response.data.bottomOfTheMail,
        });

        if (response.status === 200) {
        } else {
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getemail();
    const userid = getUserId();
    setprofile({
      ...profile,
      referrerId: userid,
    });
    return () => {};
  }, []);

  useEffect(() => {
    handlebulkInvite();
    return () => {};
  }, [url]);

  useEffect(() => {
    const inputValid =
      profile.email != "" &&
      profile.mobileNumber != "" &&
      profile.name != "" &&
      profile.citizenType != "";

    if (inputValid) {
      setprofile({
        ...profile,
        savebtndisable: false,
      });
    } else {
      setprofile({
        ...profile,
        savebtndisable: true,
      });
    }

    return () => {};
  }, [profile.email, profile.name, profile.citizenType, profile.mobileNumber]);

  const handleprofilesubmit = (event) => {
    const response = profilesubmit(profile);
    response.then((data) => {
      if (data.request.status == 200) {
        HandleWithFooter("lender invited successfully ");
      } else {
        WarningBackendApi("Error", data.response.data.errorMessage);
      }
    });
    event.preventDefault();
  };

  const handlebulkInvite = async () => {
    const response = bulkinvitegmailLink();
    response.then((data) => {
      seturl(data.data.signInUrl);
      if (data.request.status == 200) {
      } else {
        WarningAlert(data.response.data.errorMessage);
      }
    });
  };

  const emailcontentdata = emailres.emailcontent + emailres.buttomemail;

  const Invitelender = async () => {
    const userId = localStorage.getItem("userType");
    const input = document.createElement("input");
    input.value = `https://www.oxyloans.com/new/register_lender?ref=${userId}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    setEmailres({
      ...emailres,
      invaitlenderlink: !emailres.invaitlenderlink,
    });
  };
  const invitenri = async () => {
    const userId = localStorage.getItem("userType");
    const input = document.createElement("input");
    input.value = `https://www.oxyloans.com/new/nrilenderregistration?ref=${userId}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    setEmailres({
      ...emailres,
      invaitNrilink: !emailres.invaitNrilink,
    });
  };
  const Inviteborrower = async () => {
    const userId = localStorage.getItem("userType");
    const input = document.createElement("input");
    input.value = `https://www.oxyloans.com/new/register_borrower?ref=${userId}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    setEmailres({
      ...emailres,
      invaitlenderlink: !emailres.invaitlenderlink,
    });
  };

  const handleinvaite = () => {
    setEmailres({
      ...emailres,
      invaitemodel: !emailres.invaitemodel,
    });
  };
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <BorrowerHeader />
        {/* Sidebar */}
        <BorrowerSidebar />
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Refer a Friend & Earn INR 1000</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Refer a Friend</li>
                  </ul>
                </div>
              </div>
            </div>{" "}
            {emailres.invaitemodel && <Invaitemodel />}
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <div className="profile-header">
                  <div className="row refer-notepoints ">
                    <ul style={{ listStyle: "block" }}>
                      <li>
                        Let's grow as a family while you engage with OXYLOANS'
                        lending platform. We can become a support system for
                        each other in all circumstances.
                      </li>
                      <li>
                        Every time your friend lends money, both you and your
                        friend will benefit. Your friend will earn interest on
                        the lent amount, and you will receive a Reference Fee
                        based on the example below:
                      </li>

                      <li>
                        For instance, you referred XYZ, and when XYZ joined the
                        platform and lent INR 3,00,000, here's how your
                        Reference Fee would be calculated,For the first INR
                        1,00,000, you will get INR 1000. For the second INR
                        1,00,000, you will get INR 100. For the third INR
                        1,00,000, you will get INR 100. In total, you will
                        receive INR 1200 as your Reference Fee.
                      </li>
                      <li className="disPlayNone">
                        For more information and frequently asked questions,
                        please visit{" "}
                        <a
                          href="https://sites.google.com/oxyloans.com/referrer-faq/home"
                          target="_blank"
                        >
                          FAQS / MORE
                        </a>
                      </li>
                    </ul>

                    <div className="row col-12">
                      {emailres.invaitlenderlink ? (
                        <>
                          <button
                            className="btn btn-xs btn-warning col-md-3 col-12 "
                            onClick={Invitelender}
                          >
                            copied
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-xs btn-warning col-md-3 col-12 text-white"
                            onClick={Invitelender}
                          >
                            <i className="fa-solid fa-share-nodes"></i> Invite a
                            Friend
                          </button>
                        </>
                      )}

                      {emailres.invaitNrilink ? (
                        <>
                          {" "}
                          <button
                            className="btn btn-xs btn-info col-12 col-md-3 mx-lg-2 text-white"
                            onClick={invitenri}
                          >
                            copied
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            className="btn btn-xs btn-info col-12 col-md-3 mx-lg-2 text-white"
                            onClick={invitenri}
                          >
                            <i className="fa-solid fa-plane-departure mx-1"></i>{" "}
                            Invite an NRI
                          </button>
                        </>
                      )}

                      {emailres.invaitborrowerlink ? (
                        <>
                          <button
                            className="btn btn-xs btn-success col-12 col-md-3 mx-lg-2 text-white"
                            onClick={Inviteborrower}
                          >
                            copied
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            className="btn btn-xs btn-success col-12 col-md-3 mx-lg-2 text-white"
                            onClick={Inviteborrower}
                          >
                            <i className="fa-solid fa-share-nodes mx-1"></i>{" "}
                            Invite a Borrower
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="profile-menu">
                  <ul className="nav nav-tabs nav-tabs-solid">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        data-bs-toggle="tab"
                        to="#invite_tab"
                      >
                        <i className="fa-solid fa-user-tie"></i> Invite Friend
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#BulkInvite_tab"
                        onClick={handlebulkInvite}
                      >
                        <i className="fa-solid mx-1 fa-cloud-arrow-up"></i>
                        Bulk Invite
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#setupneo_tab"
                      >
                        <i className="fa-solid fa-building-columns mx-1"></i>{" "}
                        Setup Neo Bank
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="tab-content profile-tab-cont">
                  {/* Change Password Tab */}
                  <div id="BulkInvite_tab" className="tab-pane fade">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-header">
                          <p>
                            <code>Note:</code> The file format should be .xlsx,
                            The columns in Excel should be arranged as follows:
                            Column 1: Name, Column 2: Email, Column 3: Phone
                            Number.
                          </p>
                        </div>
                        <h5 className="card-title my-lg-2">Bulk Upload</h5>
                        <div className="row  text-center w-100 h-50">
                          <div className="col-md-12 col-lg-12 d-flex justify-content-center">
                            <form>
                              <div className="row">
                                <a
                                  //  <button

                                  className="btn btn-outline-primary my-lg-3 border-2 "
                                  type="button"
                                  onClick={handleinvaite}
                                >
                                  Browse From Computer
                                  {/* </button> */}{" "}
                                </a>

                                {/* <a
                                  href={url}
                                  className="btn btn-outline-warning my-lg-3 border-2 "
                                >
                                  Invite Through Gmail
                      
                                </a> */}
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Change Password Tab */}
                  {/* Change Nominee Tab */}
                  <div id="setupneo_tab" className="tab-pane fade">
                    <div className="card">
                      <div className="card-header">
                        <p>
                          How to launch a NeoBank in 3 steps,detail site with
                          videos
                          <a
                            href="https://sites.google.com/oxyloans.com/neobank/home"
                            target="_blank"
                          >
                            : Click Here
                          </a>
                        </p>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">Set-up a NeoBank.</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <p className="neo-Oxy ">Welcome to OxyLoans !</p>

                            <p className="neo-Oxycontent1 ">
                              In 2019-Feb, we got the RBI NBFC-P2P license.
                            </p>
                            <p className="neo-Oxycontent1 ">
                              Using this license, We are able to offer p2p
                              lending services.
                            </p>

                            <p className="neo-Oxycontent1">
                              In p2p lending lenders & borrowers, both are
                              Individuals/companies/PAN card holders.
                            </p>
                            <p className="neo-Oxycontent2">
                              Using the following referral links, you can launch
                              the p2p lending platform which we are calling a
                              Neo bank.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Change Nominee Tab */}
                  {/* ///profile Tab */}
                  <div id="invite_tab" className="tab-pane fade show active">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          Invite Friends/ Professionals
                        </h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                            <div className="row mt-3">
                              <div className="form-group col-12 col-sm-4">
                                <label>Friend Name </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Enter The Name"
                                  onChange={handlechanges}
                                  required
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4">
                                <label>Friend Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Enter The Email"
                                  onChange={handlechanges}
                                />
                              </div>
                              <div className="form-group col-12 col-sm-4">
                                <label>Friend Location</label>
                                <select
                                  className="form-control form-select"
                                  name="citizenType"
                                  value={profile.citizenType}
                                  onChange={handlechanges}
                                >
                                  <option value="NRI">NRI</option>
                                  <option value="NONNRI">NON NRI</option>
                                </select>
                              </div>

                              <div className="form-group col-12 col-sm-4">
                                <label>Friend Mobile </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter The mobile No"
                                  maxLength={10}
                                  name="mobileNumber"
                                  onChange={handlechanges}
                                />
                              </div>

                              <div className="form-group col-12 col-sm-8">
                                <label>Email Subject </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={emailres.emailsubject}
                                  name="mailSubject"
                                  onChange={handlechanges}
                                />
                              </div>

                              <div className="form-group col-12 col-sm-12">
                                <label>Email Content </label>
                                <textarea
                                  className="form-control"
                                  value={emailcontentdata}
                                  name="mailContent"
                                ></textarea>
                              </div>
                              <div className="col-12 ">
                                <button
                                  className="btn btn-primary col-md-4 col-12"
                                  type="submit"
                                  onClick={handleprofilesubmit}
                                  disabled={profile.savebtndisable}
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

export default ReferFriend;
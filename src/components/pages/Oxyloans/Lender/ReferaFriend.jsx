import React, { useEffect, useState } from "react";
import SideBar from "../../../SideBar/SideBar";
import Header from "../../../Header/Header";
import { Link } from "react-router-dom";import  {getUserId , profilesubmit  ,getemailcontent ,   bulkinvitegmailLink}   from '../../../HttpRequest/afterlogin'
import { avatar02 } from "../../../imagepath";
import FeatherIcon from "feather-icons-react";
import {
  HandleWithFooter,
  WarningAlert,
} from "../../Base UI Elements/SweetAlert";

const ReferaFriend = () => {

  // { "email": "turuu@gmail.com",
  //  "mobileNumber": "8790439332",
  //   "name": "iyt", "mailContent": 0,
  //    "mailSubject": 0,
  //     "referrerId": "42213",
  //      "primaryType": "LENDER",
  //       "citizenType": "NONNRI",
  //        "seekerRequestedId": "0",
  //         "inviteType": "SingleInvite",
  //          "userType": null } https://fintech.oxyloans.com/oxyloans/v1/user/lenderReferring      

  const [profile ,setprofile]=useState({
    email:'',
    mobileNumber:'',
    name: "", 
    mailSubject:0,
    referrerId: "",
    primaryType:"LENDER" ,
    citizenType: "NONNRI",
    seekerRequestedId:"0",
    inviteType: "SingleInvite",
    mailContent:0,
    
  })
  
  const [emailres, setEmailres] = useState({
    emailcontent: "",
    emailsubject: "",
    buttomemail: "",
  });
  const [url ,seturl]=useState("")
  // const [emailsubject ,setemailsubject] =useState("");const [buttomemail,setbuttomemail]=useState("")

  const   handlechanges =(event)=>{
     const {name , value }= event.target;

     setprofile({
      ...profile,
      [name]: value,
     })
  }


 
  useEffect(() => {
    const getemail = async () => {
      try {
        const response = await getemailcontent(); // Assuming getemailcontent is an async function

        console.log(response.data);
        setEmailres({
          ...emailres,
          emailcontent: response.data.mailContent,
          emailsubject: response.data.mailSubject,
          buttomemail: response.data.bottomOfTheMail,
        });

        if (response.status === 200) {
          // alert("Success");
        } else {
          alert("Error");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Error");
      }
    };

    getemail();
    const userid = getUserId(); 
       setprofile({
         ...profile,
         referrerId:userid
       })
       
  }, []);


  useEffect(()=>{
    handlebulkInvite()
  },  [url])

  const handleprofilesubmit =(event)=>{
    event.preventDefault();
   const response =  profilesubmit(profile);

   response.then((data) => {
    console.log(data);
    if (data.request.status == 200) {
      alert("success")
      HandleWithFooter("lender invited successfully");
    } else {
      WarningAlert(data.response.data.errorMessage);
    }
  });
  }   


  const handlebulkInvite= async()=>{
      const response = bulkinvitegmailLink()   
      response.then((data)=>{
        console.log(data);
        seturl(data.data.signInUrl)
        if(data.request.status == 200){
      
        } else {
          WarningAlert(data.response.data.errorMessage);
        }
      })
  }

  const emailcontentdata = emailres.emailcontent + emailres.buttomemail
       
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
                  <h3 className="page-title">Refer a Friend & Earn INR 1000</h3>
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
                        please visit
                        <a
                          href="https://sites.google.com/oxyloans.com/referrer-faq/home"
                          target="_blank"
                        >
                          {" "}
                          FAQS / MORE{" "}
                        </a>
                      </li>
                    </ul>

                    <div className="row col-12">
                      <button className="btn btn-xs btn-warning col-md-3 col-12 ">
                        Invite a Friend
                      </button>
                      <button className="btn btn-xs btn-info col-12 col-md-3 mx-lg-2">
                        Invite an NRI
                      </button>
                      <button className="btn btn-xs btn-success col-12 col-md-3 mx-lg-2">
                        Invite a Borrower
                      </button>
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
                        Invite Friend
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#BulkInvite_tab"
                       
                       
                       onClick={handlebulkInvite}
                       >
                        Bulk Invite
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        data-bs-toggle="tab"
                        to="#setupneo_tab"
                      >
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
                                
                                 <a href={url}   
                                //  <button  
                              
                                  className="btn btn-outline-primary my-lg-3 border-2 "
                                  type="button"
                                >
                                  Browse From Computer
                                {/* </button> */}   </a>

                        
                                <button className="btn btn-outline-warning my-lg-3 border-2 ">
                                  Invite Through Gmail
                                </button>
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
                        <h5 className="card-title">Referral Details</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                              <div className="row mt-3">
                                <div className="form-group col-12 col-sm-4">
                                  <label>Friend Name </label>
                                  <input type="text" className="form-control" name="name"  onChange={handlechanges}/>
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Friend Email</label>
                                  <input type="email" className="form-control" name="email"  onChange={handlechanges}/>
                                </div>
                                <div className="form-group col-12 col-sm-4">
                                  <label>Friend Location</label>
                                       <select    className="form-control form-select" 
                                                                  
                                          name="citizenType"
                                          value={profile.citizenType}
                                          onChange={handlechanges}
                                        >
                                          <option value="NRI">NRI</option>
                                          <option value="NONNRI">NON NRI</option>
                                        </select>
                                </div>
                            
                                <div className="form-group col-12 col-sm-4">
                                  <label>Frined Mobile </label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="mobileNumber"  onChange={handlechanges}
                                  />
                                </div>

                                <div className="form-group col-12 col-sm-6">
                                  <label>Email Subject </label>
                                  <input
                                    type="text"
                                    className="form-control"   
                                    value={emailres.emailsubject}
                                    name="mailSubject"  onChange={handlechanges}
                                  />
                                </div>

                                <div className="form-group col-12 col-sm-12">
                                  <label>Email Content </label>
                                    <textarea className="form-control"  value={emailcontentdata}
                                  name="mailContent"  ></textarea>
                                </div>
                                <div className="col-12 ">
                                  <button
                                    className="btn btn-primary col-md-4 col-12"
                                    type="submit"
                                        onClick={handleprofilesubmit}
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

export default ReferaFriend;

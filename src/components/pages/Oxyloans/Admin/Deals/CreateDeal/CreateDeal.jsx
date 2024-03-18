import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Header from "../../../../../Header/Header";
import Sidebar from "../../../../../SideBar/SideBar";
import { handeldealcrateapi } from "../../../../../HttpRequest/admin";
import AdminSidebar from "../../../../../SideBar/AdminSidebar";
import AdminHeader from "../../../../../Header/AdminHeader";

const CreateDeal = () => {

const [deal  ,setdeal]=useState({
    dealId: "",
		dealName: "",
		borrowerName: "",
		dealAmount: "",
		fundsAcceptanceStartDate: "",
		fundsAcceptanceEndDate: "",
		borrowerRateOfInterest: "",
		dealLink: "",
		duration: "",
		satishOxyFoundingMonthlyInterest: "",
		satishOxyFoundingQuartelyInterest: "",
		satishOxyFoundingHalfInterest: "",
		satishOxyFoundingYearlyInterest: "",
		satishOxyFoundingEndOfTheDealInterest:"",
		oxyFoundingMonthlyInterest: "",
		oxyFoundingQuartelyInterest: "",
		oxyFoundingHalfInterest: "",
		oxyFoundingYearlyInterest: "",
		oxyFoundingEndOfTheDealInterest: "",
		oxyPremiumMonthlyInterest: "",
		oxyPremiumQuartelyInterest: "",
		oxyPremiumHalfInterest: "",
		oxyPremiumYearlyInterest: "",
		oxyPremiumEndOfTheDealInterest: "",
		newLendersMonthlyInterest: "",
		newLendersQuartelyInterest: "",
		newLendersHalfInterest: "",
		newLendersYearlyInterest: "",
		newLendersEndOfTheDealInterest: "",
		loanActiveDate: "",
		whatappGroupNames: "",
		participationLimitToLenders: "",
		whatappMessageToLenders: "",
		dealType: "",
		feeROIforBorrower: "",
		feeCollectedFromBorrower: "",
		withdrawalStatus: "",
		withdrawalRoi: "",
		participcationLenderType: "",
		oxyLoanRequestId: "",
		minimumPaticipationAmount: "",
		borrowersIdsMappedToDeal: "",
		enachStatus: "",
		idsWithLoanAmount: "",
		dealSubtype: "",
		whatsappChatId: "",
		whatsappResponseLink: "",
		feeStatusToParticipate: "",
		dealFutureDate: "",
		dealLaunchHoure: "",
		dealOpenStatus: "",
		// processingFeePercentage: "",
		lifeTimeWaiver: "",
		lifeTimeWaiverLimit: "",
		dealCreationNotification: "",
		whatsappNotification: "",
		emailNotification: "",
})





const handlechange  =()=>{
  
  const {value  ,name}=event.target;
  setdeal({
    ...deal,
    
    
    [name]:value,
  })
  


  console.log(deal)
}
const  handelclickdealcreate=async()=>{
  console.log(deal)

  const response = await handeldealcrateapi(deal);
  console.log(response);
}
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <AdminHeader />

        {/* Sidebar */}
        <AdminSidebar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Create New Deal</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Create New Deal</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Deal Details:</h5>
                <div className="row">
                  <div className="col-md-12 col-lg-12 row">
                    <div className="row mt-3">
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Deal Name
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handlechange}
                          name="dealName"
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Primary Borrower
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handlechange}
                          name="primaryborrower"
                        />
                      </div>

                      {/* <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                   className="form-control"
                                  name="dob"
                                />  

                            
                              </div> */}

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Loan Amount
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={handlechange}
                          name="dealAmount"
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          RoI from Borrower
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={10}
                          className="form-control"
                          name="borrowerRateOfInterest"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Funds Start Date
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="fundsAcceptanceStartDate"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Funds End Date
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="fundsAcceptanceEndDate"
                          onChange={handlechange}
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Project URL
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="dealLink"
                          onChange={handlechange}
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Tenure in Months
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="duration"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          First Interest Date
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={handlechange}
                          name="loanActiveDate"
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Minimum Amount
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="minimumamount"
                          className="form-control"
                          name="minimumLimit"
                          onChange={handlechange}
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Maximum Amount <span className="login-danger"></span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="participationLimit"
                          onChange={handlechange}
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Deal Type
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="dealtype"
                          onChange={handlechange}
                        >  <option>-- Choose Deal Type --</option>
                          <option className="form-control" value="EQUITY">EQUITY</option>
                          <option className="form-control" value="NORMAL">NORMAL</option>
                          <option className="form-control" value="ESCROW">ESCROW</option>
                          {/* <option className="form-control" value="ESCROW">ESCROW</option> */}
                          <option className="form-control" value="TEST">TEST</option>
                          <option className="form-control" value="PERSONAL"> PERSONAL </option>
                          <option className="form-control" value="SELFEMPLOYED"> SELFEMPLOYED </option>
                        </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          {/* Project URL */}
                          Borrowers Ids Mapped To Deal
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="mappedUsers"
                              onChange={handlechange}
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Mapped Users Loan Amount
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="userLoanAmpuntmap"
                          onChange={handlechange}
                        />
                      </div>
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Enach Status
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="enachTypeUsers"
                          onChange={handlechange}
                        >
                          <option>-- Choose Deal Type --</option>
                          <option  value="true">true</option>
                          <option  value="false">false</option>
                          


                        </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Fee ROI for Borrower
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="roiBorrower"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Fee Collected From Borrower
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="feeBorrower"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          AnyTime Withdraw
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="anyTimeWithRequest"
                          onChange={handlechange}
                        >
                        <option>-- Choose Deal Type --</option>
                          <option  value="true">true</option>
                          <option  value="false">false</option>


                        </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Fee To Participate
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="feeParticipation"

                          onChange={handlechange}
                        >
                       

                       <option>-- Choose option-----</option>
                          <option value="NEW">NEW LENDER</option>
                          <option value="ANY">ANY LENDER</option>
                          </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Participcation Lender Type
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="participcationLenderType"
                          onChange={handlechange}
                        >

                          <option>-- Choose option-----</option>
                          <option value="NEW">NEW LENDER</option>
                          <option value="ANY">ANY LENDER</option>
                          
                          </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          WhatsApp Chat Id
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="dealWhatsappChatId"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          WhatsApp Response Link
                          <span className="login-danger"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="dealWhatsappDealLink"
                          onChange={handlechange}
                        />
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Create/Edit Deal Notification
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="dealnotification"   
                          onChange={handlechange}
                        >


                             <option>-- Choose option-----</option>
                             <option value="true"> YES</option>
                             <option  value="false">No</option>
                          </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Deal Launch
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="deallunchType"
                          onChange={handlechange}
                        >

                          <option>-- Choose option-----</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                          </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          life Time Fee waive-off
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="lifetimewaiver"
                          onChange={handlechange}
                        >
                           <option>-- Choose option-----</option> <option value="true">yes</option>
                        
                          <option value="false">No</option>
                        </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          WhatsApp Notification
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="dealwhatsappnotification"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Email Notification
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          name="dealemailnotification"
                          onChange={handlechange}
                        >

                           <option value="true">Yes</option>
                          <option value="false">No</option>
                          </select>
                      </div>

                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Offer No</th>
                            <th scope="col">Payout Mode</th>
                            <th scope="col">Oxy Premium Lenders</th>
                            <th scope="col">New Lenders</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Monthly Interest pay-out</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                                name="oxyPremiumMonthlyInterest"
                                onChange={handlechange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>
                              Yearly Interest Pay-out (Please Re-Lend My Funds
                              for Next Deal)
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                                name="oxyPremiumYearlyInterest"
                                onChange={handlechange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                                name="newLendersYearlyInterest"
                                onChange={handlechange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>
                              End of Deal Interest Pay-out (Tenure Would be 1-12
                              Months)
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                                name="oxyPremiumEndOfTheDealInterest"
                                onChange={handlechange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                                name="newLendersEndOfTheDealInterest"
                                onChange={handlechange}
                              />
                            </td>
                          </tr>

                          <tr>
                            <td>4</td>
                            <td>Quarterly Interest Pay-outt</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"
                                name="newLendersQuartelyInterest"
                                onChange={handlechange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"   
                                name="newLendersQuartelyInterest"
                                onChange={handlechange}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Half-Yearly Interest pay-out</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"   
                                name="oxyPremiumHalfInterest"
                                onChange={handlechange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Roi %"  
                                name="newLendersHalfInterest"
                                onChange={handlechange}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <hr></hr>

                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Whatapp Group
                          <span className="login-danger"></span>
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          placeholder="AnyTime Withdraw"
                          name="anytimewithdraw"
                        >
                          <option className="form-control">No</option>
                          <option className="form-control">No</option>
                        </select>    

                        <div  className="form-group col-12 col-sm-4">      Select All  
                                <input  type="checkbox"  name="selectAll"  
                                onChange={handlechange} />
                                 </div>   
                      </div>
  
                      {/* <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                Text message
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="checkbox"
                                  className="form-control"
                                  placeholder="AnyTime Withdraw"
                               
                                
                                  name="anytimewithdraw"
                                />


                        
                              </div>  */}
 
  
                      <div className="form-group col-12 col-sm-4 local-forms">
                        <label>
                          Text message
                          <span className="login-danger">*</span>
                        </label>
                        <textarea
                          // type="checkbo"
                          type="text"
                          className="form-control"
                          placeholder="AnyTime Withdraw"
                          name="whatstextmessage"  
                          onChange={handlechange}
                        ></textarea>
                      </div>
                      <div className="col-12 ">
                        <button
                          className="btn btn-primary col-md-4 col-12"
                          type="submit"     onClick={handelclickdealcreate}
                        >
                          Create Deal
                        </button>
                      </div>
                    </div>
                  </div>
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

export default CreateDeal;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import  './studentloanprocess.css'
import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { borrowerRunningsinfoapi } from "../../../../HttpRequest/admin";
import AdminHeader from "../../../../Header/AdminHeader";


const BorrowerRunningsinfo = () => {



  const [borrowerrunningnfo , setborrowerrunninginfo]=useState({
passid:"",
bankAccount: "",
         ifscCode:"",
  })
const [responsedata , setresponsedata]=useState({
  data:""
})
  const handleClick = async () => {
    const inputString = borrowerrunningnfo.passid // Your input string with characters and numbers

    // Use regex to remove non-numeric characters
    const numericString = inputString.replace(/\D/g, "");
    
    console.log(numericString)
    if (numericString) {

      try {
        const response = await borrowerRunningsinfoapi(numericString); // Assuming handlegetdashboardcarddeatilsapi() is an async function that fetches data
        console.log(response);setresponsedata({...responsedata,data:response});console.log(response.data.results[0].user.email);

      } catch (error) {
        console.log("error:", error); // Log the specific error
      }
  } else {
      console.log("Numeric string is empty. Cannot make API call.");
      // Handle the case where the numeric string is empty
  }
}



const handlechange=(event)=>{

  const {name , value}=event.target;
  setborrowerrunninginfo({
    ...borrowerrunningnfo,
    [name]:value,
  })
}

console.log(borrowerrunningnfo.passid)
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <AdminHeader />

        {/* Sidebar */}
        <Sidebar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">  Add Student Bank Info </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                    Add Student Bank Info
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                  
                  </div>
                  <div className="card-body">
                    {/* <form> */}
                    <div className="row">

                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Borrower Id :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"

                            name="passid"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                            onChange={handlechange}
                          />

                          
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="student-submit">
                          <button
                            type="button"
                            className="btn btn-primary"
                         onClick={handleClick} >
                            Fetch Deatils
                          </button>
                        </div>
                      </div>  


                      <div className="col-12 col-sm-3">
                        <div   className="borrowerruninginfodetais">
                        <span>Name : Bharagav Matta</span>
                        {/* {console.log(responsedata.data.data.results[0].expectedDate)} */}
                         <span>{responsedata.data !== "" ? <>Name : </> : <></>}{responsedata.data !== "" ? responsedata.data .data.results[0].user.firstName: <></>}</span>
                         <span>{responsedata.data !== "" ? <>PanNumber : </> : <></>}{responsedata.data !== "" ?  responsedata.data .data.results[0].user.panNumber: <></>}</span>
                         </div>

                      
                      </div>
                

                    </div>

{responsedata.data !== "" ? <>

<div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Bank 
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"

                            name="passid"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                            onChange={handlechange}
                          ><option>Choose Bank</option>
                          
                          <option value="Punjab National Bank">PNB BANK</option>
                          <option  value="YES BANK">YES BANK</option>
                          <option  value="Kotak Mahindra Bank">KOTAK BANK </option>
                          <option value="HDFC Bank Ltd">HDFC BANK</option>
                          <option value=" IDBI Bank Ltd">IDBI BANK</option></select>

                          
                        </div>
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Account Number
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"

                            name="bankAccount"
                            className="form-control"
                            placeholder="Account Number"
                            onChange={handlechange}
                          />

                          
                        </div>
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          IFSC Code
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"

                            name="ifscCode"
                            className="form-control"
                            placeholder="IFSC Code "
                            onChange={handlechange}
                          />

                          
                        </div>
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                              Branch 
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"

                            name="passid"
                            className="form-control"
                            placeholder="Branch"
                            onChange={handlechange}
                          />

                          
                        </div>
                      </div>

                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Name as Per bank
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"

                            name="passid"
                            className="form-control"
                            placeholder="Name as Per bank "
                            onChange={handlechange}
                          />

                          
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="student-submit">
                          <button
                            type="button"
                            className="btn btn-primary"
                         onClick={handleClick} >
                            Verify Bank 
                          </button>
                        </div>
                      </div>   
                      </>  : <></>}
                
                    {/*   </form> */}
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

export default BorrowerRunningsinfo;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import './Studentloan.css'
import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import AdminHeader from "../../../../Header/AdminHeader";
import AdminSidebar from "../../../../SideBar/AdminSidebar";
import { event } from "jquery";
import { handelclicknewaccountdetailsapi } from "../../../../HttpRequest/admin";

const TransferFunds = () => {


  const   [data , setdata]= useState({
    apidata:"",
    userId:"",

  })


      const handlechage  =(event)=>{
           const {name   , value}=event.target;     
               
        setdata({
              ...data,
                 [name]:value,
             })
      }


      const handelclick = async () => {
        try {
          const response = await handelclicknewaccountdetailsapi(data);
          console.log(response);
          
          if (response.request.status === 200) {
            setdata({
              apidata: response.data
            });
          } else {
            console.error('Request failed with status:', response.request.status);
          }
        } catch (error) {
          console.error('Error occurred while fetching data:', error);
        }
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
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title"> Transfer The Funds </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Transfer The Funds
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header"></div>
                  <div className="card-body">
                    {/* <form> */}
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Borrower Id :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="userId"
                            className="form-control"
                            placeholder="Enther the Borrower Id "

                            onChange={handlechage}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                   
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={handelclick}>
                          Fetch Details
                          </button>
                        </div>
                
                      </div>



                      <div className="formcontiner">

                        <div  className="conatine">
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                            RoI :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Created on"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                            HDFC Payment :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Created on"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                            ICICI Payment
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Created on"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                            HDFC Screen Shot
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Created on"
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-5">
                        <div className="form-group local-forms">
                          <label>
                            ICICI Screen Shot
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Created on"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary">
                            Save FD Payment Data
                          </button>
                        </div>
                      </div>
                      </div>
                      <div>
                   {data.apidata !== "" && 
                     <div  className="carddata">
                     <p><strong>Bank Details</strong></p>
                     <p>User Name : {data.apidata.userName}</p>
                     <p>Account No :  {data.apidata.accountNumber}</p>
                     <p>IFSC :  {data.apidata.ifsc}</p>
                     <p>Branch :  {data.apidata.branch}</p>
                     <p>FD Amount : {data.apidata.fdAmount}</p>
                     </div>   }  
                      </div>
                      </div>
                    </div>
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

export default TransferFunds;

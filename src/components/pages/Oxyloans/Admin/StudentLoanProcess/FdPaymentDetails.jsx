import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import AdminHeader from "../../../../Header/AdminHeader";
import AdminSidebar from "../../../../SideBar/AdminSidebar";
import { HandleClick } from "../../../Base UI Elements/SweetAlert";
import { handefeecalculationapi } from "../../../../HttpRequest/admin";

const FdPaymentDetails = () => {     
  
  

  
  const  [data  , setdata]=useState({
         userId:"",
  })


  const handlechange=(event)=>{
       const   {name , value}=event.target;


       setdata({
        ...data,
        [name]:value,
       })
  }

  const handleClickapi =async()=>{
    const response = await handefeecalculationapi(data);
    


    console.log(response);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data);
      }
    });

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
                  <h3 className="page-title"> FD Payment Details </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      FD Payment Details
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

                            onChange={handlechange}
                          />
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"       onClick={handleClickapi}>
                            Fetch
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Borrower Id :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Borrower Id "
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            FD Value :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Amount  "
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
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
                      <div className="col-12 col-sm-4">
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
                      <div className="col-12 col-sm-4">
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
                      <div className="col-12 col-sm-4">
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

                      <div className="col-12 col-sm-4">
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

export default FdPaymentDetails;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { uploadapi } from "../../../../HttpRequest/admin";

const UploadFdData = () => {

   const  [uploaddata , setuploaddata] =useState({
    userId:"",
		fdAmount:"",
		createdDate:"",
    userIderror:"",
		fdAmounterror:"",
		createdDateerror:"",
   })   


   const  handlechange =(event)=>{
      const {value , name}=event.target;

      setuploaddata({
        ...uploaddata,
        [name]:value,
      })
   }


   const handlesubmit =()=>{
    setuploaddata((uploaddata)=>({
      ...uploaddata,
      userIderror : uploaddata.userId !="" ? null :"Enter the Borrower id",
      createdDateerror : uploaddata.createdDate !="" ? null :"Enter the createdDate",
      fdAmounterror : uploaddata.fdAmount !="" ? null :"Enter the Amount "
      

    }))

      if(uploaddata.userIderror != "" && uploaddata.createdDate != ""  && uploaddata.fdAmount != ""){

        const response1= uploadapi(uploaddata)
        console.log(response1);
      }else{
        
      }

   }
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title"> Add Student Bank Info </h3>
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
                            onChange={handlechange}
                            className="form-control"
                            placeholder="Enther the Borrower Id "
                          />

                          {uploaddata.userIderror != "" && <div className="errormessage">{uploaddata.userIderror}</div>}
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Amount :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="fdAmount"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the Amount  "
                          />
                 
              {uploaddata.fdAmounterror != "" && <div className="errormessage">{uploaddata.fdAmounterror}</div>}
                        </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Created on :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="createdDate"
                            onChange={handlechange}
                            className="form-control"
                            placeholder="Enther the Created on"
                          /> {uploaddata.createdDateerror != "" && <div className="errormessage">{uploaddata.createdDateerror}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"    onClick={handlesubmit}>
                            Save Fd
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
      {/* /Main Wrapper */}
    </>
  );
};

export default UploadFdData;

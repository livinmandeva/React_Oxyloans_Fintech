import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { handelhandeluploadtranapi } from "../../../../HttpRequest/admin";

const Uploadtransactions = () => {


  const [data , setdata]=useState({
    scrowAccountNumber: "",
    transactionAmount: "",
    transactionDate: "",
    documentUploadedId: "",
    userid:"",
    TRANSACTIONSS:""   

  })

  const [apidata , setapidate]=useState({
    apidatares:"",
  });

  const handelchange =(event)=>{
    const {name  , value}=event.target;
    setdata({
      ...data,
      [name]:value
    })
  }

  // savelendertransaction

  
  
  const  handeluploadtran =async()=>{
    const    response= await  handelhandeluploadtranapi(data);
    response.then((data) => {
      if (data.request.status == 200) {

        
        console.log(data.data.results)
     
      }
    });
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
                  <h3 className="page-title"> Transaction Details </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Transaction Details
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
                            Lender ID :<span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="userid"
                            className="form-control"
                            onChange={handelchange}
                            // placeholder="Enther the Borrower Id "
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Virtual Account Number :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="scrowAccountNumber"
                            className="form-control"   
                            onChange={handelchange}
                            // placeholder="Enther the Borrower Id "
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Transaction Amount :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="transactionAmount"
                            className="form-control"
                            onChange={handelchange}
                            // placeholder="Enther the Borrower Id "
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Transaction Date :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="transactionDate"
                            className="form-control"  
                            onChange={handelchange}
                            // placeholder="Enther the Borrower Id "
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Upload Transaction Screen Shot :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="file"
                            name="TRANSACTIONSS"  onChange={handelchange}
                            className="form-control"
                            // placeholder="Enther the Borrower Id "
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={handeluploadtran}>
                            Fetch details
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

export default Uploadtransactions;

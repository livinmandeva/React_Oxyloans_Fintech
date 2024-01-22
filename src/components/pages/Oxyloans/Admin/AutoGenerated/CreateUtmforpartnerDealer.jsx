import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import './autogenerated.css';
import { getMembershiphistory } from "../../../../HttpRequest/afterlogin";


const CreateUtmforpartnerDealer = () => {
    
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        {/*Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/*Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title"> 
                  Create UTM for Partners
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                     
                    Deal Based Auto Agreements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">

                  <div className="row">


                  <div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Partner Name
    {/* UTM Source */}
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    User Type
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Duration
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Loan Amount
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Lender Processing Fee
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Borrower Processing Fee
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Repayment Type
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Referral check  
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    ROI-Cibil(400-500)
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    ROI-Cibil(500-600)
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    ROI-Cibil(600-700)
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    ROI-Cibil(700-800)
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    ROI-Cibil(800-900)
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Lender Choice
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
    />

  </div>
</div>


<div className="row mb-2">
<div  >
<label>Repayment Type :</label>  
  <input type="radio" id="html" name="fav_language" value="HTML" />
  <label for="html">PI</label>
  <input type="radio" id="css" name="fav_language" value="CSS"  />
  <label for="css">INTEREST</label>   
  <input type="radio" id="javascript" name="fav_language" value="JavaScript"  />
  <label for="css">Both</label>   
  <input type="radio" id="javascript" name="fav_language" value="JavaScript"  />


<label  style={{marginLeft: '5rem',}}>Referral check:</label>  
  <input type="radio" id="html" name="fav_language" value="HTML" />
  <label for="html">yes</label>
  <input type="radio" id="css" name="fav_language" value="CSS"  />
  <label for="css">No</label>   
  <input type="radio" id="javascript" name="fav_language" value="JavaScript"  />
</div>
</div>
<div className="col-3">
  <div className="student-submit">
    <button
      type="button"
      className="btn btn-primary"
    >
      Fetch Deatils  
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
        {/*Page wrapper */}
      </div>
    </>
  );
};

export default CreateUtmforpartnerDealer;

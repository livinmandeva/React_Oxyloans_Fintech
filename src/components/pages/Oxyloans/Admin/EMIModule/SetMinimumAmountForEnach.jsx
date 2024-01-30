import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import './emimodule.css'
import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getMembershiphistory } from "../../../../HttpRequest/afterlogin";


const SetMinimumAmountForEnach = () => {
  const [membershiphistory, setmembershiphistory] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });


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
                  <h3 className="page-title">Set Minimum EMI Amount For eNach
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                                                 Search Fd Types
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

                  <div className="col " >
<div className="row centerdiv">
<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Borrower ID:
      <span className="login-danger">*</span>
    </label>
    <select
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the LENDER ID "
    >
       <option >-- select --</option> 
       <option >Application ID</option> 
       <option >Borrower ID</option> 
       
        </select>
  </div>
</div>

<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Application ID:
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the LENDER ID "
    />


  </div>
</div>

</div>

<div className="row centerdiv">
<div className="col-6 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Application ID:
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the LENDER ID "
    />


  </div>
</div>
<div className="col-6 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Months Period:
      <span className="login-danger">*</span>
    </label>
    <input
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the LENDER ID "
    />


  </div>
</div>
</div>

<div className="col-8 col-3  centerdiv">
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

export default SetMinimumAmountForEnach;

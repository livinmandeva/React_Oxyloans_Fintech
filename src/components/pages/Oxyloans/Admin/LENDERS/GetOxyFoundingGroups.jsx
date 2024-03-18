import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getMembershiphistory, getMyWithdrawalHistory } from "../../../../HttpRequest/afterlogin";
import { checkingcurrentwalletbalance, checkingcurrentwalletbalanceapi, handleclickapproveapi, lenderwithdrawalfundssearchAPI } from "../../../../HttpRequest/admin";
import { WarningAlehandleclick } from "../../../Base UI Elements/SweetAlert";

const GetOxyFoundingGroups = () => {
  const [membershiphistory, setmembershiphistory] = useState({
    apiData: "",
    pageNo: 1,
    pageSize: 10,
    defaultPageSize: 10,
    userid:0,
    comment:"",
    hasdata:true,
    walletAmountType:"GREATERTHANZERO",
    lenderWalletsExcelLink:"",
    countdata:''
  });

  const membershiphistoryPagination = (Pagination) => {
    setmembershiphistory({
      ...membershiphistory,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };
    const  handleclickLender=()=>{
      
      const response = checkingcurrentwalletbalance(
        membershiphistory.walletAmountType,
  
      );
      response.then((data) => {
        if (data.request.status == 200) {
  
          
          console.log(data.data.listOfLenderCurrentWalletBalanceResponse)
          setmembershiphistory({
            ...membershiphistory,
            apiData: data.data.listOfLenderCurrentWalletBalanceResponse,
            lenderWalletsExcelLink:data.data.lenderWalletsExcelLink,
            countdata:data.data
          });
        }


        console.log(data)
      });
    }
  

    const handelchange = (event) => {
      const { name, value } = event.target;

      setmembershiphistory((prevMembershipHistory) => ({
          ...prevMembershipHistory,
          [name]: value
      }));
  };



  const datasource = [];
  if (membershiphistory.apiData !== "" && membershiphistory.apiData !== null) {
    membershiphistory.apiData.map((data) => {
      datasource.push({
        key: Math.random(),
        PaymentDate: data,
        TransactionNumber: data,
        Amount: data,
        PaidThrough: data,
        documents: data,
        comments: data,
      });
    });
  
  }    
  const columns = [
    {
      		
      title: "User ID",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
     <p>LR{render.userId}</p>
        </>
      )
    },
    {
      title: "Wallet Amount Info",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render)=>(
        <>
        <div  className="insertstart">
          <p> Credit: {render.credit}</p>
          <p>Debit : {render.debit}</p>
          <p>Current Wallet : {render.currentWalletAmount}</p>
          <p>Total Loan Amount : {render.totalLoanAmount}</p> 

       </div>
        </>
      )
    },
    {
      title: "Lender Name",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>



<p>   {render.name}</p>


        </>
      )
    },

   
   
  ];

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
                  <h3 className="page-title">Lenders Wallet Info</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Lenders Wallet Info</li>
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
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                          Select Lender Group
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="walletAmountType"
                            className="form-control"   onChange={handelchange}
                            // placeholder="Enther the Borrower Id "
                          >
                            <option value="GREATERTHANZERO">GREATERTHANZERO</option>
                            <option  value="ZERO">ZERO</option>
                            <option  value="LESSTHANZERO">LESSTHANZERO</option>
                          
                          </select>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary" onClick={handleclickLender}>
                            Fetch details
                          </button>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="student-submit">
                   <Link to={membershiphistory.lenderWalletsExcelLink}  >  Download Excel</Link>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: membershiphistory.countdata.count  !== null ? membershiphistory.apiData.count : membershiphistory.countdata.count,  
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={membershiphistory.hasdata ? datasource : []}
                        expandable={true}
             
                        onChange={membershiphistoryPagination}
                      />
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

export default GetOxyFoundingGroups;
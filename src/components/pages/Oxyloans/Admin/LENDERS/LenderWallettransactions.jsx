import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getMembershiphistory, getMyWithdrawalHistory } from "../../../../HttpRequest/afterlogin";
import { checkingcurrentwalletbalanceapi, gettestlenderwallettrns, handleclickapproveapi, lenderwithdrawalfundssearchAPI } from "../../../../HttpRequest/admin";
import { WarningAlehandleclick } from "../../../Base UI Elements/SweetAlert";

const LenderWallettransactions = () => {
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
  });

  const membershiphistoryPagination = (Pagination) => {
    setmembershiphistory({
      ...membershiphistory,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };
useEffect(()=>{
      
      const response = gettestlenderwallettrns(
        membershiphistory.pageNo,        membershiphistory.pageSize,
  
      );
      response.then((data) => {
        if (data.request.status == 200) {
  
          
          console.log(data.data.results)
          setmembershiphistory({
            ...membershiphistory,
            apiData: data.data.results,
           
          });
        }
      });
    },[])
  

    const handelchange = (event) => {
      const { name, value } = event.target;

      setmembershiphistory((prevMembershipHistory) => ({
          ...prevMembershipHistory,
          [name]: value
      }));
  };



  const datasource = [];
  {
    membershiphistory.apiData != ""
      ? membershiphistory.apiData.map((data) => {
          datasource.push({
            key: Math.random(),
            PaymentDate: data,
            TransactionNumber: data,
            Amount: data,
            PaidThrough: data,
            documents:data,
            comments:data,
          });
        })
      : "";
  }    
  const columns = [
    {
      		
      			
      title: "Lender Id",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
     <p>LR{render.userId}</p>
        </>
      )
    },
    {
      title: "Lender Name",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render)=>(
        <>
        <div  className="insertstart">
        <p>{render.firstName}</p>
       </div>
        </>
      )
    },
    {
      title: "Account Number",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>

<p>{render.scrowAccountNumber}</p>


        </>
      )
    },
    {
      title: "Transaction Date",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>




<p>   {render.transactionDate}</p>


        </>
      )
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>


<p>   {render.transactionAmount}</p>



        </>
      )
    },
    {
      title: "Transaction",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>



<p>   {render.fileName}</p>


        </>
      )
    },
    {
      title: "Screen Shot" ,
      dataIndex: "Amount",
      
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>



<p>   {render.fileName}</p>


        </>
      )
    },
    {
      title: "Status",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>



<p>   {render.status}</p>


        </>
      )
    },
    {
      title: "Approve",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
          <Button  >Approve</Button>
          <Button  >Reject</Button>
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
                  <h3 className="page-title">Lender Withdrawal List</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Hold Deal Users</li>
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
                         Enter Id
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="walletAmountType"
                            className="form-control"   onChange={handelchange}
                            // placeholder="Enther the Borrower Id "
                            />
                        
                          
            
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary" >
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
                          total: membershiphistory.apiData.count,
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

export default LenderWallettransactions;

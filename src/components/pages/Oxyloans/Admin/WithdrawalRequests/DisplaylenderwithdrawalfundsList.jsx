import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getMembershiphistory, getMyWithdrawalHistory } from "../../../../HttpRequest/afterlogin";
import { handleclickapproveapi, lenderwithdrawalfundssearchAPI } from "../../../../HttpRequest/admin";
import { WarningAlehandleclick } from "../../../Base UI Elements/SweetAlert";

const DisplaylenderwithdrawalfundsList = () => {
  const [membershiphistory, setmembershiphistory] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 10,
    defaultPageSize: 10,
    userid:0,
    comment:""
  });

  const membershiphistoryPagination = (Pagination) => {
    setmembershiphistory({
      ...membershiphistory,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

  useEffect(() => {
    const response = lenderwithdrawalfundssearchAPI(
      membershiphistory.pageNo,
      membershiphistory.pageSize,
      membershiphistory.userid,

    );
    response.then((data) => {
      if (data.request.status == 200) {

        
        console.log(data.data.results)
        setmembershiphistory({
          ...membershiphistory,
          apiData: data.data.results,
          loading: false,
          hasdata: data.data.totalCount == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [membershiphistory.pageNo, membershiphistory.pageSize]);
    const handelchange=()=>{
      const {name ,    value}=event.target;
      setmembershiphistory({
      
      })
    }



  const handleclickapprove  =async()=>{

   
   const response = await  handleclickapproveapi(membershiphistory.comment)
   response.then((data) => {
    if (data.request.status == 200) {

      
      console.log(data.data)
      // setmembershiphistory({
      //   ...membershiphistory,
      //   apiData: data.data.results,
      //   loading: false,
      //   hasdata: data.data.totalCount == 0 ? false : true,
      // });
    }
  });
  }
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
      title: "LR ID & Name",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
     <p>LR{render.userId}</p>
     <p>{render.firstName}</p>
     <p>Email:{render.email}</p>
     <p>Mobile Number:{render.mobileNumber}</p>

        </>
      )
    },
    {
      title: "Withdrawal Info",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render)=>(
        <>
        <div  className="insertstart">
          <p> Created On : {render.createdOn}</p>
          <p>Withdrawal Amount : {render.amount}</p>
          <p>Rating : {render.rating}</p>
          <p>Feedback : {render.feedBack}</p>

       </div>
        </>
      )
    },
    {
      title: "Status",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>



<p>Status : {render.status}</p>
<p>Current Wallet:{render.amount}</p>
<p>Admin comments : {render.adminComments}</p>

        </>
      )
    },
    {
      title: "Actions",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>


           <p>{render.status}</p>
           <p>Update On : {render.adminComments}</p>

           <button  
  className="btn btn-primry" 
  data-bs-toggle="modal" 
  data-bs-target="#exampleModal" 
  data-bs-whatever="@fat" 
  onClick={() => {
    localStorage.setItem("commentid", render.id);
    localStorage.setItem("resolve", "APPROVED");
  }}
>
  Approve
</button>
<button  
  className="btn btn-primry" 
  data-bs-toggle="modal" 
  data-bs-target="#exampleModal" 
  data-bs-whatever="@fat" 
  onClick={() => {
    localStorage.setItem("commentid", render.id);
    localStorage.setItem("resolve", "REJECTED");
  }}
>
  Approve
</button>
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
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Are You Sure ?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

       
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"  onClick={handleclickapprove}>Send message</button>
      </div>
    </div>
  </div>
</div>

    
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            -- Choose --
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            // placeholder="Enther the Borrower Id "
                          >
                            <option>Lender ID</option>
                            <option>Name</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary">
                            Fetch details
                          </button>
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
                        loading={membershiphistory.loading}
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

export default DisplaylenderwithdrawalfundsList;

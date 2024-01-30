import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getMembershiphistory } from "../../../../HttpRequest/afterlogin";


const MinimumEMIusers = () => {
  const [membershiphistory, setmembershiphistory] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
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
    const response = getMembershiphistory(
      membershiphistory.pageNo,
      membershiphistory.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        setmembershiphistory({
          ...membershiphistory,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [membershiphistory.pageNo, membershiphistory.pageSize]);

  const datasource = [];
  {
    membershiphistory.apiData != ""
      ? membershiphistory.apiData.listOfTransactions.map((data) => {
          datasource.push({
            key: Math.random(),
            PaymentDate: data.paymentDate,
            TransactionNumber: data.transactionNumber,
            Amount: data.amount,
            PaidThrough: data.paidType,
          });
        })
      : "";
  }

  const columns = [
    {
      title: "App ID",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
    },
    {
      title: "BR ID & Name",

      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
    },
    {
      title: "BR Email",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
    },
    {
      title: "EMI Amount",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.PaidThrough.length - b.PaidThrough.length,
    },
    {
        title: "Tenure",
        dataIndex: "PaidThrough",
        sorter: (a, b) => a.PaidThrough.length - b.PaidThrough.length,
      },
      {
        title: "Created On",
        dataIndex: "PaidThrough",
        sorter: (a, b) => a.PaidThrough.length - b.PaidThrough.length,
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
                  <h3 className="page-title">Borrowers Minimum eNACH Amount Users
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

                  <div className="row">

<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Search  User Id :
      <span className="login-danger">*</span>
    </label>
    <select
      type="text"
      name="withdrawFeedback"
      className="form-control"
      placeholder="Enther the LENDER ID "
    >
       <option >-- select --</option> 
       <option >Name</option> 
       <option >Borrower ID</option> 
       
        </select>
  </div>
</div>

<div className="col-12 col-sm-3">
  <div className="form-group local-forms">
    <label>
    Search  User Id :
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

export default MinimumEMIusers;

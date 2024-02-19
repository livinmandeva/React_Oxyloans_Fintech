import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { getfdmonthlyloansInfo } from "../../../../HttpRequest/admin";


const FdmonthlyloansInfo = () => {
  const [fdmonthlyloansInfo, setfdmonthlyloansInfo] = useState({
    apiData: "",
    startDate:"",
    endDate:"",
    hasdata: false,
    loading: true,

  });


  useEffect(() => {
    const response = getfdmonthlyloansInfo(fdmonthlyloansInfo);
    response.then((data) => {

      console.log(data)
      if (data.request.status == 200) {
        setfdmonthlyloansInfo({
          ...fdmonthlyloansInfo,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, []);

  const datasource = [];
  {
    fdmonthlyloansInfo.apiData != ""
      ? fdmonthlyloansInfo.apiData.map((data) => {
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
      title: "User Info",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
    },
    {
      title: "User Addres",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
    },
    {
      title: "Fd Info",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
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
                  <h3 className="page-title">FD Monthly Info</h3>
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
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                          >
                            <option>-- Choose --</option>
                            <option>Date Range</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Start Date"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther start Date"
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary">
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        columns={columns}
                        dataSource={fdmonthlyloansInfo.hasdata ? datasource : []}
                        expandable={true}
                        loading={fdmonthlyloansInfo.loading}
                        onChange={fdmonthlyloansInfo}
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

export default FdmonthlyloansInfo;

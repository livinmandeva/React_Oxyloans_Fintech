import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import { referralEarningsInfo } from "../../../HttpRequest/afterlogin";

const MyEarnings = () => {
  const [referalMyearnigs, setreferalMyearnigs] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });

  const referalMyearnigsPagination = (Pagination) => {
    setreferalMyearnigs({
      ...referalMyearnigs,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

  useEffect(() => {
    const response = referralEarningsInfo(
      referalMyearnigs.pageNo,
      referalMyearnigs.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        setreferalMyearnigs({
          ...referalMyearnigs,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }, [referalMyearnigs.pageNo, referalMyearnigs.pageSize]);

  console.log(referalMyearnigs);
  const datasource = [];
  {
    referalMyearnigs.apiData != ""
      ? referalMyearnigs.apiData.lenderReferenceAmountResponse.map((data) => {
          datasource.push({
            key: Math.random(),
            RefereeName: data.userName,
            RefereeId: data.refereeNewId,
            EarnedAmount: data.amount,
            PaymentStatus: data.paymentStatus,
            TransferredOn:
              data.transferredOn == ""
                ? "Yet To be Credit"
                : data.transferredOn,
            Remarks: data.remarks == null ? "No Remarks" : data.remarks,
          });
        })
      : "";
  }

  const column = [
    {
      title: "Referee Name",
      dataIndex: "RefereeName",
      sorter: (a, b) => a.RefereeName.length - b.RefereeName.length,
    },

    {
      title: "Earned Amount",
      dataIndex: "EarnedAmount",
      sorter: (a, b) => a.EarnedAmount.length - b.EarnedAmount.length,
    },
    {
      title: "Payment Status",
      dataIndex: "PaymentStatus",
      sorter: (a, b) => a.PaymentStatus.length - b.PaymentStatus.length,
    },
    {
      title: "Transferred On",
      dataIndex: "TransferredOn",
      sorter: (a, b) => a.TransferredOn.length - b.TransferredOn.length,
    },
    {
      title: "Remarks",
      dataIndex: "Remarks",
      sorter: (a, b) => a.Remarks.length - b.Remarks.length,
    },
  ];
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <SideBar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">
                    My Earnings Through Invite Friend
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">My Network</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="student-group-form">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Payment Status "
                    />
                  </div>
                </div>

                <div className="col-lg-2 pull-right">
                  <div className="search-student-btn">
                    <button type="btn" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-header">
                    <button className="btn btn-xs col-md-2 btn-info col-12">
                      Invite Borrower
                    </button>
                    <button className="btn btn-xs col-md-2 btn-warning  mx-lg-1 col-12">
                      Invite Lender
                    </button>
                    <button className="btn btn-xs col-md-2 btn-success mx-lg-1  col-12">
                      Invite An NRI
                    </button>
                    <button className="btn btn-xs col-md-3 btn-danger col-12 ">
                      Earning Statement
                    </button>
                  </div>
                  <div className="card-body">
                    {/* Page Header */}
                    <div className="page-header"></div>
                    {/* /Page Header */}
                    <div className="table-responsive">
                      <Table
                        className="table table-stripped table-hover datatable"
                        pagination={{
                          total: referalMyearnigs.apiData.count,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={column}
                        dataSource={referalMyearnigs.hasdata ? datasource : []}
                        expandable={true}
                        loading={referalMyearnigs.loading}
                        onChange={referalMyearnigsPagination}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default MyEarnings;

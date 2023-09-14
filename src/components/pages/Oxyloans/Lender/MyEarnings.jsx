import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";

const MyEarnings = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const datasource = [
    {
      id: "1",
      RefereeName: "Vinayvasu sangishetty",
      RefereeId: "LR43505",
      EarnedAmount: 100,
      PaymentStatus: "Paid",
      TransferredOn: "	2023-08-30",
      Remarks: "Paid for student deal(tenure is less than 90 days)",
    },
    {
      id: "2",
      RefereeName: "Shubaa Sudhindra",
      RefereeId: "LR39316",
      EarnedAmount: 275,
      PaymentStatus: "Paid",
      TransferredOn: "2023-08-01",
      Remarks: "Paid for student deal(tenure is less than 90 days)",
    },
  ];
  const column = [
    {
      title: "RefereeName",
      dataIndex: "RefereeName",
      sorter: (a, b) => a.RefereeName.length - b.RefereeName.length,
    },
    {
      title: "RefereeId",
      dataIndex: "RefereeId",
      sorter: (a, b) => a.RefereeId.length - b.RefereeId.length,
    },
    {
      title: "EarnedAmount",
      dataIndex: "EarnedAmount",
      sorter: (a, b) => a.EarnedAmount.length - b.EarnedAmount.length,
    },
    {
      title: "PaymentStatus",
      dataIndex: "PaymentStatus",
      sorter: (a, b) => a.PaymentStatus.length - b.PaymentStatus.length,
    },
    {
      title: "TransferredOn",
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
                    <button className="btn btn-xs col-md-3 btn-warning mx-lg-2 col-12">
                      Invite Lender
                    </button>
                    <button className="btn btn-xs col-md-3 btn-success mx-lg-2 col-12">
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
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        }}
                        columns={column}
                        dataSource={datasource}
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

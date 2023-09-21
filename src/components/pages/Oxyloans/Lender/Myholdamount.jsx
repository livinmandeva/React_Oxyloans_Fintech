import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const Myholdamount = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const checkCallBack = (pagination) => {
    console.log(pagination);
  };

  const datasource = [
    {
      key: Math.random(),

      Sno: 1,
      Extraamount: "30100",
      Extraamountpaiddetails: "INR 30100 is paid for the deal DEALDEAL",
      Deductiondetails:
        "Principal amount 30100 is deducted from the deal test today hold 1 on null.",
      Status: "CLOSED",
    },
    {
      key: Math.random(),
      Sno: 2,
      Extraamount: "30100",
      Extraamountpaiddetails: "INR 10000 is paid for the deal DEALDEAL",

      Deductiondetails:
        "Interest amount 9000 is deducted from the deal test today hold 1",
      Status: "DELETE",
    },
  ];

  const columns = [
    {
      title: "Sno",
      dataIndex: "Sno",
      sorter: (a, b) => a.Sno.length - b.Sno.length,
    },
    {
      title: "Extraamount",
      dataIndex: "Extraamount",
      sorter: (a, b) => a.Extraamount.length - b.Extraamount.length,
    },
    {
      title: "Extraamountpaiddetails",
      dataIndex: "Extraamountpaiddetails",
      sorter: (a, b) =>
        a.Extraamountpaiddetails.length - b.Extraamountpaiddetails.length,
    },
    {
      title: "Deductiondetails",
      dataIndex: "Deductiondetails",
      sorter: (a, b) => a.Deductiondetails.length - b.Deductiondetails.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => a.Status.length - b.Status.length,
    },
  ];

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SideBar />
        {/*Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/*Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Hold Amount From Deals</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Ongoing Deals</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header text-bold">
                    <code>
                      <strong>Note : </strong>
                    </code>
                    <br />
                    Please take note that if there is an overpayment made for
                    any transaction, we will clearly display the excess amount
                    here. These surplus funds will be subtracted from upcoming
                    interest or principal payments. Please refer to the
                    following details for a comprehensive understanding of this
                    process.
                  </div>
                  <div className="card-body">
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={datasource}
                        expandable={false}
                        onChange={checkCallBack}
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

export default Myholdamount;

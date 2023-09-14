import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const Mytransactions = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const datasource = [
    {
      key: Math.random(),
      TransactionDate: "2023-08-28",
      CreditedAmount: "50000",
      DebitedAmount: "300000",
      Status: "WALLET",
    },
    {
      key: Math.random(),
      TransactionDate: "2023-08-30",
      CreditedAmount: "10000",
      DebitedAmount: "300000",
      Status: "WALLET",
    },
  ];

  const columns = [
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      sorter: (a, b) => a.raisedon.length - b.raisedon.length,
    },
    {
      title: "Credited Amount",
      dataIndex: "CreditedAmount",
      sorter: (a, b) => a.CreditedAmount.length - b.CreditedAmount.length,
    },
    {
      title: "Debited Amount",
      dataIndex: "DebitedAmount",
      sorter: (a, b) => a.DebitedAmount.length - b.DebitedAmount.length,
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
                  <h3 className="page-title">my transactions</h3>
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
                  <div className="card-header">
                    <button className="btn btn-xs col-12 col-md-4 btn-success">
                      Download Transaction History
                    </button>
                  </div>
                  <div className="card-body">
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: datasource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        }}
                        columns={columns}
                        dataSource={datasource}
                        expandable={true}
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

export default Mytransactions;

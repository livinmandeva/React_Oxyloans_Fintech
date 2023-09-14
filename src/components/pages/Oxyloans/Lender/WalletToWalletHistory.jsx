import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const WalletToWalletHistory = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const datasource = [
    {
      key: Math.random(),
      ReceiverId: "LR37202",
      ReceiverName: "Lakshmi Anoosha Pasumarthy",
      TransformedDate: "2023-03-07",
      Amount: "1350000",
    },
    {
      key: Math.random(),
      ReceiverId: "LR37207",
      ReceiverName: "Lakshmi Anoosha Pasumarthy",
      TransformedDate: "2023-03-09",
      Amount: "130000",
    },
  ];

  const columns = [
    {
      title: "ReceiverId",
      dataIndex: "ReceiverId",
      sorter: (a, b) => a.ReceiverId.length - b.ReceiverId.length,
    },
    {
      title: "ReceiverName",
      dataIndex: "ReceiverName",
      sorter: (a, b) => a.ReceiverName.length - b.ReceiverName.length,
    },
    {
      title: "TransformedDate",
      dataIndex: "TransformedDate",
      sorter: (a, b) => a.TransformedDate.length - b.TransformedDate.length,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount.length - b.Amount.length,
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
                  <h3 className="page-title">Wallet To Wallet History</h3>
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

export default WalletToWalletHistory;

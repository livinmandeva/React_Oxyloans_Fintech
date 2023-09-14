import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const MyhighvalueDeals = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const datasource = [
    {
      key: Math.random(),
      DealName: "S21 One Month Lock",
      DealAmount: "10,000,000",
      FundsStartDate: "2021-10-04",
      DealClosedDate: "2021-11-03",
      NoofParticipatedLenders: "	2",
    },
    {
      key: Math.random(),
      DealName: "MAHE YlyPay 1.7 YesATW",
      DealAmount: "60,000,000",
      FundsStartDate: "2022-03-02",
      DealClosedDate: "2023-03-07",
      NoofParticipatedLenders: "1",
    },
  ];

  const columns = [
    {
      title: "DealName",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "DealAmount",
      dataIndex: "DealAmount",
      sorter: (a, b) => a.DealAmount.length - b.DealAmount.length,
    },
    {
      title: "FundsStartDate",
      dataIndex: "FundsStartDate",
      sorter: (a, b) => a.FundsStartDate.length - b.FundsStartDate.length,
    },
    {
      title: "DealClosedDate",
      dataIndex: "DealClosedDate",
      sorter: (a, b) => a.DealClosedDate.length - b.DealClosedDate.length,
    },
    {
      title: "NoofParticipatedLenders",
      dataIndex: "NoofParticipatedLenders",
      sorter: (a, b) =>
        a.NoofParticipatedLenders.length - b.NoofParticipatedLenders.length,
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
                  <h3 className="page-title">High Value Deals Info</h3>
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

export default MyhighvalueDeals;

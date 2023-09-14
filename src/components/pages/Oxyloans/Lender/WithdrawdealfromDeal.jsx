import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const WithdrawdealfromDeal = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const datasource = [
    {
      key: Math.random(),
      DealName: "SD-2S-20L-31MAY23",
      DealType: "NORMAL",
      ParticipatedAmount: "30000",
      RoI: "1.75%",
      Duration: "3 Months",
      DealStatus: "Running",
      RequestedAmount: "	0",
      action: (
        <Link to="/withdrawdealFounds">
          <button type="submit" className="btn w-100 btn-primary btn-xs">
            Withdraw
          </button>
        </Link>
      ),
    },
    {
      key: Math.random(),
      DealName: "S21 Exclusive 4 Founding Lenders3",
      DealType: "NORMAL",
      ParticipatedAmount: "	100000",
      RoI: "2%",
      Duration: "39 Months",
      DealStatus: "Running",
      RequestedAmount: "0",
      action: (
        <Link to="/withdrawdealFounds">
          <button type="submit" className="btn w-100 btn-primary btn-xs">
            Withdraw
          </button>
        </Link>
      ),
    },
  ];

  const columns = [
    {
      title: "DealName",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "Deal Type",
      dataIndex: "DealType",
      sorter: (a, b) => a.DealType.length - b.DealType.length,
    },
    {
      title: "ParticipatedAmount",
      dataIndex: "ParticipatedAmount",
      sorter: (a, b) =>
        a.ParticipatedAmount.length - b.ParticipatedAmount.length,
    },
    {
      title: "RoI",
      dataIndex: "RoI",
      sorter: (a, b) => a.RoI.length - b.RoI.length,
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      sorter: (a, b) => a.Duration.length - b.Duration.length,
    },
    {
      title: "DealStatus",
      dataIndex: "DealStatus",
    },
    {
      title: "RequestedAmount",
      dataIndex: "RequestedAmount",
    },
    {
      title: "action",
      dataIndex: "action",
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
                  <h3 className="page-title">Withdraw Funds from Deals</h3>
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
                    <div className="row col-12">
                      <button className="btn btn-xs btn-warning col-md-2 col-xs-6 col-lg-3 mx-lg-2 my-xs-2">
                        Withdraw From Escrow
                      </button>
                      <button className="btn btn-xs btn-success col-md-2 col-xs-6 col-lg-3 ">
                        Withdraw From Normal
                      </button>
                    </div>
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

export default WithdrawdealfromDeal;

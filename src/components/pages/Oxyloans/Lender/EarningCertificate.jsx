import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const EarningCertificate = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const datasource = [
    {
      key: Math.random(),

      SO: "1",
      FY: "2023-2024",
      EARNINGS: "0",
      DOWNLOADFYREPORT: (
        <button type="submit" className="btn w-40 btn-primary btn-xs ">
          Download
        </button>
      ),
      EMAILFYREPORT: (
        <button type="submit" className="btn w-40 btn-warning btn-xs ">
          Email
        </button>
      ),
    },
    {
      SO: "2",
      FY: "2022-2023",
      EARNINGS: "0",
      DOWNLOADFYREPORT: (
        <button type="submit" className="btn w-40 btn-primary btn-xs">
          Download
        </button>
      ),
      EMAILFYREPORT: (
        <button type="submit" className="btn w-40 btn-warning btn-xs">
          Email
        </button>
      ),
    },
  ];

  const columns = [
    {
      title: "S#",
      dataIndex: "SO",
      sorter: (a, b) => a.SO.length - b.SO.length,
    },
    {
      title: "FY",
      dataIndex: "FY",
      sorter: (a, b) => a.FY.length - b.FY.length,
    },
    {
      title: "DOWNLOAD FY REPORT",
      dataIndex: "DOWNLOADFYREPORT",
      sorter: (a, b) => a.DOWNLOADFYREPORT.length - b.DOWNLOADFYREPORT.length,
    },
    {
      title: "EMAIL FY REPORT",
      dataIndex: "EMAILFYREPORT",
      sorter: (a, b) => a.EMAILFYREPORT.length - b.EMAILFYREPORT.length,
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
                  <h3 className="page-title">Financial Reports</h3>
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

export default EarningCertificate;

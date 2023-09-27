import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { getMyfinancialEarnings } from "../../../HttpRequest/afterlogin";

const EarningCertificate = () => {
  const [myfyearnings, setmyfyearnings] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
  });

  const profitearnedCertificate = (pa, er, ey) => {};

  useEffect(() => {
    const response = getMyfinancialEarnings();
    response.then((data) => {
      if (data.request.status == 200) {
        setmyfyearnings({
          ...myfyearnings,
          apiData: data.data,
          loading: false,
          hasdata: data.data.length == 0 ? false : true,
        });
      }
    });
  }, []);

  const datasource = [];
  {
    myfyearnings.apiData != ""
      ? myfyearnings.apiData.map((data) => {
          datasource.push({
            key: Math.random(),
            SO: data.sNo,
            FY: data.financialYear,
            EARNINGS: data.incomeEarned,
            DOWNLOADFYREPORT: (
              <span
                className="badge bg-success"
                onClick={profitearnedCertificate(
                  data.startDate,
                  data.endDate,
                  "DOWNLOAD"
                )}
              >
                Download FY Report
              </span>
            ),
            EMAILFYREPORT: (
              <span
                className="badge bg-info"
                onClick={profitearnedCertificate(
                  data.startDate,
                  data.endDate,
                  "EMAIL"
                )}
              >
                Get FY Email Report
              </span>
            ),
          });
        })
      : "";
  }

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
      title: "Earnings",
      dataIndex: "EARNINGS",
      sorter: (a, b) => a.EARNINGS - b.EARNINGS,
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
                          position: ["topRight"],
                        }}
                        columns={columns}
                        dataSource={myfyearnings.hasdata ? datasource : []}
                        expandable={true}
                        loading={myfyearnings.loading}
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { getMyWithdrawalHistory } from "../../../HttpRequest/afterlogin";

const MywithdrawalHistory = () => {
  const [mywithdrawalHistory, setmywithdrawalHistory] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
  });

  useEffect(() => {
    const response = getMyWithdrawalHistory();
    response.then((data) => {
      if (data.request.status == 200) {
        setmywithdrawalHistory({
          ...mywithdrawalHistory,
          apiData: data.data,
          loading: false,
          hasdata: data.data.results.length == 0 ? false : true,
        });
      }
    });
  }, []);

  const datasource = [];
  {
    mywithdrawalHistory.apiData != ""
      ? mywithdrawalHistory.apiData.results.map((data) => {
          datasource.push({
            key: Math.random(),
            raisedon: data.amountRequiredDate,
            amount: data.amount,
            reason: data.withdrawalReason,
            requestedFrom: data.requestFrom,
            status: data.status,
            action: (
              <button type="submit" className="btn w-100 btn-primary btn-xs">
                Cancel Request
              </button>
            ),
          });
        })
      : "";
  }

  const columns = [
    {
      title: "Raised on",
      dataIndex: "raisedon",
      sorter: (a, b) => a.raisedon.length - b.raisedon.length,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
    },
    {
      title: "Reason",
      dataIndex: "reason",
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Requested From",
      dataIndex: "requestedFrom",
      sorter: (a, b) => a.requestedFrom.length - b.requestedFrom.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.length - b.status.length,
    },
    {
      title: "Action",
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
                  <h3 className="page-title">My Withdrawal Request Info</h3>
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
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={
                          mywithdrawalHistory.hasdata ? datasource : []
                        }
                        expandable={true}
                        loading={mywithdrawalHistory.loading}
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

export default MywithdrawalHistory;

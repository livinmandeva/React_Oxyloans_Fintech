import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { getMyTransactions } from "../../../HttpRequest/afterlogin";

const Mytransactions = () => {
  const [mytransactions, setmytransactions] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
  });

  useEffect(() => {
    const response = getMyTransactions();
    response.then((data) => {
      if (data.request.status == 200) {
        setmytransactions({
          ...mytransactions,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }, []);

  console.log(mytransactions);

  const datasource = [];
  {
    mytransactions.apiData != ""
      ? mytransactions.apiData.map((data) => {
          datasource.push({
            key: Math.random(),
            TransactionDate: data.transactionDate,
            CreditedAmount: data.creditedAmount,
            DebitedAmount: data.debitedAmount,
            Status: data.amountFrom,
          });
        })
      : "";
  }

  const columns = [
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      sorter: (a, b) => a.raisedon - b.raisedon,
    },
    {
      title: "Credited Amount",
      dataIndex: "CreditedAmount",
      sorter: (a, b) => a.CreditedAmount - b.CreditedAmount,
    },
    {
      title: "Debited Amount",
      dataIndex: "DebitedAmount",
      sorter: (a, b) => a.DebitedAmount - b.DebitedAmount,
    },
    {
      title: "Amount From",
      dataIndex: "Status",
      sorter: (a, b) => a.Status - b.Status,
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
                  <h3 className="page-title">My Transactions</h3>
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
                    <button className="btn btn-xs col-12 col-md-2 btn-success pull-right">
                      <i className="fa fa-download"></i> Download
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
                          position: ["topRight"],
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={mytransactions.hasdata ? datasource : []}
                        expandable={true}
                        loading={mytransactions.loading}
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

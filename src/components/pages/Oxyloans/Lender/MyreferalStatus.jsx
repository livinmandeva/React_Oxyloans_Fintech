import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { Myreferal } from "../../../HttpRequest/afterlogin";
import Footer from "../../../Footer/Footer";
import { Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";

const MyreferalStatus = () => {
  const [referdata, setreferaldata] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 10,
    defaultPageSize: 10,
  });

  const referalStatusPagination = (dats) => {
    console.log(dats);
    setreferaldata({
      ...referdata,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  useEffect(() => {
    const response = Myreferal(referdata.pageNo, referdata.pageSize);
    response.then((data) => {
      if (data.request.status == 200) {
        setreferaldata({
          ...referdata,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.listOfLenderReferenceDetails.length == 0 ? false : true,
        });
      }
    });
  }, [referdata.pageNo, referdata.pageSize]);

  const datasource = [];
  {
    referdata.apiData != ""
      ? referdata.apiData.listOfLenderReferenceDetails.map((data) => {
          datasource.push({
            key: Math.random(),
            Email: data.refereeEmail,
            UserName: data.refereeName,
            MobileNumber: data.refereeMobileNumber,
            Status: data.status,
            ReferredOn: data.referredOn,
            ViewReferee: (
              <span className="badge badge-danger">View Referee</span>
            ),
          });
        })
      : "";
  }

  const column = [
    {
      title: "UserName",
      dataIndex: "UserName",
      sorter: (a, b) => a.UserName.length - b.UserName.length,
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email.length - b.Email.length,
    },
    {
      title: "MobileNumber",
      dataIndex: "MobileNumber",
      sorter: (a, b) => a.MobileNumber.length - b.MobileNumber.length,
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => a.Status.length - b.Status.length,
    },

    {
      title: "ReferredOn",
      dataIndex: "ReferredOn",
      sorter: (a, b) => a.ReferredOn.length - b.ReferredOn.length,
    },
    {
      title: "ViewReferee",
      dataIndex: "ViewReferee",
      sorter: (a, b) => a.ViewReferee.length - b.ViewReferee.length,
    },

    ,
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
                  <h3 className="page-title">Referral Infos</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">My Deals</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-body">
                    {/* Page Header */}
                    <div className="page-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="page-title"></h3>
                        </div>
                        <div className="col-auto text-end float-end ms-auto download-grp">
                          <Link to="#" className="btn btn-danger me-2">
                            Referal Status
                          </Link>
                          <Link to="addsalary" className="btn btn-warning me-2">
                            Invite Borrower
                          </Link>
                          <Link to="addsalary" className="btn btn-info me-2">
                            Invite an NRI
                          </Link>

                          <Link to="addsalary" className="btn btn-success me-2">
                            Invite A lender
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /Page Header */}
                    <div className="table-responsive">
                      <Table
                        className="table border-0 star-student table-hover table-center mb-0 datatable table-striped dataTable no-footer"
                        pagination={{
                          total: referdata.apiData.countOfReferees,
                          defaultPageSize: referdata.defaultPageSize,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          size: "default",
                          showLessItems: true,
                          pageSizeOptions: [5, 10, 15, 20],
                          responsive: true,
                        }}
                        columns={column}
                        dataSource={datasource}
                        expandable={true}
                        loading={referdata.loading}
                        onChange={referalStatusPagination}
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

export default MyreferalStatus;

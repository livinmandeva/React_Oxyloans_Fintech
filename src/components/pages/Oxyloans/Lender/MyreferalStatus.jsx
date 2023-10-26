import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { Myreferal, downloadreferal } from "../../../HttpRequest/afterlogin";
import Footer from "../../../Footer/Footer";
import { Button, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { Success, WarningBackendApi } from "../../Base UI Elements/SweetAlert";

const MyreferalStatus = () => {
  const [referdata, setreferaldata] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    datasource: [],
    nriinvite: false,
    inviteborrowerlink: false,
    invaitlenderlink: false,
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [referlink, setrefer] = useState("");

  const downloadReferalStatusFileInfo = () => {
    Success("success", "Referal Status File Download");
    window.open(referlink, "_blank");
  };

  const referdashboardPagination = (Pagination) => {
    console.log(Pagination);
    setreferaldata({
      ...referdata,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
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
    downloadreferalstatus();
    return () => {};
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
              <span className="badge badge-danger" type="button">
                View Referee
              </span>
            ),
          });
        })
      : "";
  }
  const downloadreferalstatus = async () => {
    const response = downloadreferal();

    response.then((data) => {
      if (data.request.status == 200) {
        setrefer(data.data.downloadUrl);
        console.log(data.data);
      }
    });
  };

  const Invitelender = async () => {
    const userId = localStorage.getItem("userType");
    const input = document.createElement("input");
    input.value = `https://www.oxyloans.com/new/register_lender?ref=${userId}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    setreferaldata({
      ...referdata,
      invaitlenderlink: !referdata.invaitlenderlink,
    });
  };

  const column = [
    {
      title: "User Name",
      dataIndex: "UserName",
      sorter: (a, b) => a.UserName - b.UserName,
    },
    {
      title: "Email",
      dataIndex: "Email",
      sorter: (a, b) => a.Email - b.Email,
    },
    {
      title: "Mobile Number",
      dataIndex: "MobileNumber",
      sorter: (a, b) => a.MobileNumber - b.MobileNumber,
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => a.Status - b.Status,
    },

    {
      title: "Referred On",
      dataIndex: "ReferredOn",
      sorter: (a, b) => a.ReferredOn - b.ReferredOn,
    },
    // {
    //   title: "View Referee",
    //   dataIndex: "ViewReferee",
    //   sorter: (a, b) => a.ViewReferee - b.ViewReferee,
    // },
  ];

  const handlenriinvite = () => {
    const userId = localStorage.getItem("userType");
    const input = document.createElement("input");
    input.value = `https://www.oxyloans.com/new/nrilenderregistration?ref=${userId}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    setreferaldata({
      ...referdata,
      nriinvite: !referdata.nriinvite,
    });
  };
  const Inviteborrower = () => {
    const userId = localStorage.getItem("userType");
    const input = document.createElement("input");
    input.value = `https://www.oxyloans.com/new/register_borrower?ref=${userId}`;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    setreferaldata({
      ...referdata,
      inviteborrowerlink: !referdata.inviteborrowerlink,
    });
  };

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
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">myreferal Status</li>
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
                          <a
                            href="#"
                            onClick={downloadReferalStatusFileInfo}
                            className="btn btn-danger me-2 text-white"
                          >
                            Referal Status
                          </a>
                          <Button
                            // to="addsalary"
                            onClick={Inviteborrower}
                            className="btn btn-warning me-2 text-white"
                          >
                            {referdata.inviteborrowerlink ? (
                              <>copied</>
                            ) : (
                              <>Invite Borrower</>
                            )}
                          </Button>
                          <Button
                            onClick={handlenriinvite}
                            className="btn btn-info me-2 text-white"
                          >
                            {referdata.nriinvite ? (
                              <> copied</>
                            ) : (
                              <>Invite an NRI</>
                            )}
                          </Button>

                          <Button
                            onClick={Invitelender}
                            className="btn btn-success me-2 text-white"
                          >
                            {/* {copySuccess ? 'Link Copied!' : 'Invite A lender'} */}

                            {referdata.invaitlenderlink ? (
                              <> copied</>
                            ) : (
                              <>Invite an Lender</>
                            )}
                          </Button>
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
                          size: "default",
                          showLessItems: true,
                          pageSizeOptions: [5, 10, 15, 20],
                          responsive: true,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={column}
                        expandable={true}
                        dataSource={referdata.hasdata ? datasource : []}
                        loading={referdata.loading}
                        onChange={referdashboardPagination}
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

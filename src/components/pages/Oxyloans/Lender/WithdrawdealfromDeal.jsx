import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { getWithdrawaFromDeal } from "../../../HttpRequest/afterlogin";

const WithdrawdealfromDeal = () => {
  const [participatedDeals, setparticipatedDeals] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
  });

  useEffect(() => {
    const response = getWithdrawaFromDeal();
    response.then((data) => {
      if (data.request.status == 200) {
        setparticipatedDeals({
          ...participatedDeals,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }, []);

  console.log(participatedDeals);

  const datasource = [];
  {
    participatedDeals.apiData != ""
      ? participatedDeals.apiData.lenderPaticipatedResponseDto.map((data) => {
          datasource.push({
            key: Math.random(),
            DealName: data.dealName,
            DealType: data.dealType,
            ParticipatedAmount: data.paticipatedAmount,
            RoI: data.rateOfInterest + " % ",
            Duration: data.dealDuration + " M ",
            DealStatus: data.currentStatus,
            RequestedAmount: data.requestedAmount,
            action: (
              <Link to="/withdrawdealFounds">
                <button type="submit" className="btn w-100 btn-primary btn-xs">
                  Withdraw
                </button>
              </Link>
            ),
          });
        })
      : "";
  }

  const columns = [
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "Deal Type",
      dataIndex: "DealType",
      sorter: (a, b) => a.DealType.length - b.DealType.length,
    },
    {
      title: "Participated Amount",
      dataIndex: "ParticipatedAmount",
      sorter: (a, b) => a.ParticipatedAmount - b.ParticipatedAmount,
    },
    {
      title: "RoI",
      dataIndex: "RoI",
      sorter: (a, b) => a.RoI - b.RoI,
    },
    {
      title: "Duration",
      dataIndex: "Duration",
      sorter: (a, b) => a.Duration - b.Duration,
    },
    {
      title: "Deal Status",
      dataIndex: "DealStatus",
      sorter: (a, b) => a.DealStatus.length - b.DealStatus.length,
    },
    {
      title: "Requested Amount",
      dataIndex: "RequestedAmount",
      sorter: (a, b) => a.RequestedAmount - b.RequestedAmount,
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
                          position: ["topRight"],
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        expandable={true}
                        dataSource={participatedDeals.hasdata ? datasource : []}
                        loading={participatedDeals.loading}
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

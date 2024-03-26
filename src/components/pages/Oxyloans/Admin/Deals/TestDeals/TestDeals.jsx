import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, pagination, Table, Tag } from "antd";
import { onShowSizeChange, itemRender } from "../../../../../Pagination";

import SideBar from "../../../../../SideBar/SideBar";
import Footer from "../../../../../Footer/Footer";
import {
  Earning,
  referralEarningsInfo,
} from "../../../../../HttpRequest/afterlogin";
import Header from "../../../../../Header/Header";
import AdminHeader from "../../../../../Header/AdminHeader";
import AdminSidebar from "../../../../../SideBar/AdminSidebar";
import { apidealreopen, handalapicall, handlesubmitapi, listOfDealsInformationForEquityDeals } from "../../../../../HttpRequest/admin";
import { Message } from "../../../../Base UI Elements/SweetAlert";

const TestDeals = () => {



  
  const  [data  , setdata]=  useState({
      pageNo: 1,
      pageSize: 10,
      dealType: "HAPPENING",
      dealName: "TEST"
  })
  const [referalMyearnigs, setreferalMyearnigs] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    Invitelender: "",
    inviteborrower: "",
    invitenri: "",
    date:"",
    borrowerlink: true,
    earninglink: "",
    lenderlink: true,
    invitenrilink: true,
  })

  const referalMyearnigsPagination = (Pagination) => {
    setreferalMyearnigs({
      ...referalMyearnigs,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

  useEffect(() => {
    const response = listOfDealsInformationForEquityDeals(data);
    response.then((data) => {
      if (data.request.status == 200) {
        setreferalMyearnigs({
          ...referalMyearnigs,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }, []);



  const handlechange =(event)=>{
    const {name , value} =event.target;


    setreferalMyearnigs({
      ...referalMyearnigs,
      [name]:value,
        })
  }
console.log(referalMyearnigs.date)

const handelsubmitdealreopen = async () => {
  try {
    const response = await apidealreopen(referalMyearnigs.date);
    console.log(response);
    Message(response.data.status)
    // Assuming response is an object containing the response status
    if (response.status === 200) {
      console.log("Request successful");
      // Additional handling if needed
    } else {
      console.log("Request failed");
      // Additional handling if needed
    }
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle error if needed
  }
};

   useEffect(() => {
    const response = listOfDealsInformationForEquityDeals(data);
    response.then((data) => {
      if (data.request.status == 200) {
        setreferalMyearnigs({
          ...referalMyearnigs,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }, [data.pageNo,data.pageSize,data.dealType,data.dealName]);      
  const   handalapical =(param)=>{
    setdata({
      ...data,
      dealType:param
    })
  }
       const handlesubmit =async()=>{
        try { const response  = await handlesubmitapi (dealId , type)
 
          // const response = await apidealreopen(referalMyearnigs.date);
          console.log(response);
         setreferalMyearnigs({
          ...referalMyearnigs,
         })
          // Assuming response is an object containing the response status
          if (response.status === 200) {
            console.log("Request successful");
            // Additional handling if needed
          } else {
            console.log("Request failed");
            // Additional handling if needed
          }
        } catch (error) {
          console.error("Error occurred:", error);
          // Handle error if needed
        }
       }
  const datasource = [];
  // {
  //   referalMyearnigs.apiData != ""
  //     ? referalMyearnigs.apiData.listOfBorrowersDealsResponseDto.map((data) => {
  //         datasource.push({
  //           key: Math.random(),
  //           RefereeName: (
  //             <>
  //               <div className="tablepara">
  //                 <p>
  //                   <strong>Deal name :</strong>
  //                  {render.dealName}</p>
  //                 <p>Deal Id :10</p>
  //                 <p>Aggrements : PENDING</p>
  //                 <p>
  //                   <strong>First Participation :</strong> 02-01-2024 12:52:13
  //                 </p>
  //                 <p>Last Participation : No Data</p>
  //               </div>
  //             </>
  //           ),
  //           EarnedAmount: (
  //             <>
  //               <div className="tablepara">
  //                 <p>Participate : 15000</p>
  //                 <p>Current Amount : 15000</p>
  //                 <p>To Wallet : 0</p>
  //                 <p>Return Principal : 0</p>
  //               </div>
  //             </>
  //           ),
  //           EarnedAmount: (
  //             <>
  //               <div className="tablepara">
  //                 <p>Participate : 15000</p>
  //                 <p>Current Amount : 15000</p>
  //                 <p>To Wallet : 0</p>
  //                 <p>Return Principal : 0</p>
  //               </div>
  //             </>
  //           ),
  //           PaymentStatus: (
  //             <>
  //               <div className="tablepara">
  //                 <p>Borrower :u</p>
  //                 <p>Borrower ROI :3</p>
  //                 <p>Lender ROI :1.5</p>
  //                 <p>Status :Yet to be Achieved</p>
  //                 <p>Deal Amount : 100,000</p>
  //                 <p>Emi date : 2025-01-02</p>
  //               </div>
  //             </>
  //           ),
  //           TransferredOn: (
  //             <>
  //               <div className="buttongroupline">
  //                 <Button>Edit</Button>
  //                 <Button danger>Edit</Button>
  //                 <Button>Deal Reopen</Button>
  //                 <Button>Tenure Extend</Button>
  //               </div>
  //             </>
  //           ),
  //           Remarks: (
  //             <>
  //               <div className="buttongroupline">
  //                 <Button> View Lenders</Button>
  //                 <Button> Withdrawal Request</Button>
  //                 <Button> Principal Summary</Button>
  //               </div>
  //             </>
  //           ),
  //           intialbutton: (
  //             <>
  //               <div className="buttongroupline">
  //                 <Button> Pay Interest</Button>
  //                 <Button> Initiating Notifications</Button>
  //                 <Button> Interest Summary</Button>
  //               </div>
  //             </>
  //           ),
  //         });
  //       })
  //     : "";
  // }

  {
    referalMyearnigs.apiData != ""
         ? referalMyearnigs.apiData.listOfBorrowersDealsResponseDto.map((data) => {
          datasource.push({
            key: Math.random(),
            RefereeName: data,
            TransactionNumber: data,
            Amount: data,
            Remarks: data,
            documents: data,
            comments: data,
          });
        })
      : "";
  }
  const column = [
    {
      title: "Deal Name",
      dataIndex: "RefereeName",
      sorter: (a, b) => a.RefereeName.length - b.RefereeName.length,

      render: (render) => (
        <>   
         
            <p>Deal name :{render.dealName}</p>
            <p>Deal Id : {render.dealId}</p>
            {/* <p>Aggrements : {}</p> */}
            <p>First Participation :  {render.firstParticipationDate}</p>
            <p>Last Participation :   {render.lastParticipationDate}</p>
        </>
      ),
    },

    {
      title: "Deal Info",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.EarnedAmount.length - b.EarnedAmount.length,

      render: (render) => (
        <>   
        <p>Participate : {render.lenderPaticipationAmount} </p>
        <p>Current Amount :  {render.dealCurrentAmount}  </p>
        <p>To Wallet : 0  </p>
        <p>Return Principal : 0  </p>

        </>
      ),
    },
    {
      title: "Deal User",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.PaymentStatus.length - b.PaymentStatus.length,
         render: (render) => (
        <>   

         <p>Borrower :  {render.borrowerName} </p>
         <p>Borrower ROI :    {render.borrowerRateOfInterest} </p>
         <p>Lender ROI : {render.monthlyInterest}  </p>
         <p>Status :  {render.fundingStatus} </p>
         <p>Deal Amount :   {render.dealAmount} </p>   
        </>
      ),
    },
    {
      title: "Modify",
      dataIndex: "Amount",
      sorter: (a, b) => a.TransferredOn.length - b.TransferredOn.length,
      render: (render) => (
        <> 
        <div  className="col"  style={{display:'flex',flexDirection:'column', gap:'10px'}}> 
          {/* <button></button>     */}
            <Link to={`/editDealInfo?id=${render.dealId}`} ><Tag className="text-center" color="#87d068" >Edit</Tag>    </Link>
              <Tag  className="text-center" color="#00c0ef" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={localStorage.setItem("dealId", render.dealId)}>Deal Reopen</Tag>
          </div> 
          </>
      ),
    },
    {
      title: "View Participated Users",
      dataIndex: "Remarks",
      sorter: (a, b) => a.Remarks.length - b.Remarks.length,
      render: (render) => (
        <> 
        <div  className="col"  style={{display:'flex',flexDirection:'column', gap:'10px'}}> 
          {/* <button></button>     */}
           <Link to={`/viewDealLenders?id=${render.dealId}&dealName=${render.dealName}`}> <Tag color="#87d068" className="text-center"> View Lenders</Tag></Link>
           <Link to={`/dealWithdrawinfo?id=${render.dealId}`}  >  <Tag  color="#00c0ef" className="text-center"> Withdrawal Request</Tag> </Link>
      <Tag  color="rgb(59, 89, 153)"className="text-center"  data-bs-toggle="modal" data-bs-target="#exampleModal1"   onClick={()=>handlesubmit(render.dealId , "PRINCIPAL")}> Principal Summary</Tag>
          </div> 
          </>
      ),
    },
    {
      title: "Know More",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.intialbutton.length - b.intialbutton.length,

      render: (render) => (
        <>   
          
          <div  className="col"  style={{display:'flex',flexDirection:'column', gap:'10px'}}> 
          {/* <button></button>     */}
          <Tag color="#87d068" className="text-center"> Pay Interest</Tag>
          <Tag  color="#00c0ef" className="text-center"> Initiating Notifications</Tag>
          <Tag  color="rgb(59, 89, 153)"className="text-center">   Interest Summary</Tag> 
          </div> 
        </>
      ),
    },
  ];
  const column1 = [
    {
      				
      title: "Paid Date",
      dataIndex: "RefereeName",
      sorter: (a, b) => a.RefereeName.length - b.RefereeName.length,

      render: (render) => (
        <>   
         
            <p>Deal name :{render.dealName}</p>
            <p>Deal Id : {render.dealId}</p>
            {/* <p>Aggrements : {}</p> */}
            <p>First Participation :  {render.firstParticipationDate}</p>
            <p>Last Participation :   {render.lastParticipationDate}</p>
        </>
      ),
    },

    {
      title: "File Status",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.EarnedAmount.length - b.EarnedAmount.length,

      render: (render) => (
        <>   
        <p>Participate : {render.lenderPaticipationAmount} </p>
        <p>Current Amount :  {render.dealCurrentAmount}  </p>
        <p>To Wallet : 0  </p>
        <p>Return Principal : 0  </p>

        </>
      ),
    },
    {
      title: "Amount Type",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.PaymentStatus.length - b.PaymentStatus.length,
         render: (render) => (
        <>   

         <p>Borrower :  {render.borrowerName} </p>
         <p>Borrower ROI :    {render.borrowerRateOfInterest} </p>
         <p>Lender ROI : {render.monthlyInterest}  </p>
         <p>Status :  {render.fundingStatus} </p>
         <p>Deal Amount :   {render.dealAmount} </p>   
        </>
      ),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.TransferredOn.length - b.TransferredOn.length,
      render: (render) => (
        <> 
        <div  className="col"  style={{display:'flex',flexDirection:'column', gap:'10px'}}> 
          {/* <button></button>     */}
            <Link to={`/editDealInfo?id=${render.dealId}`} ><Tag className="text-center" color="#87d068" >Edit</Tag>    </Link>
              <Tag  className="text-center" color="#00c0ef" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={localStorage.setItem("dealId", render.dealId)}>Deal Reopen</Tag>
          </div> 
          </>
      ),
    },
    {
      title: "File Name",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.intialbutton.length - b.intialbutton.length,

      render: (render) => (
        <>   
          
          <div  className="col"  style={{display:'flex',flexDirection:'column', gap:'10px'}}> 
          {/* <button></button>     */}
          <Tag color="#87d068" className="text-center"> Pay Interest</Tag>
          <Tag  color="#00c0ef" className="text-center"> Initiating Notifications</Tag>
          <Tag  color="rgb(59, 89, 153)"className="text-center">   Interest Summary</Tag> 
          </div> 
        </>
      ),
    },
  ];
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <AdminHeader />

        {/* Sidebar */}
        <AdminSidebar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Running & Closed Test Deals</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">My Network</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <!-- Button trigger modal --> */}


{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Reopen the deal</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="col-12 col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                          Date <span className="login-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="date"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the LENDER ID "
                          />
                        </div>
                      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"  onClick={handelsubmitdealreopen}>Save </button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
  
      <Table
                        className="table table-stripped table-hover datatable"
                       
                        columns={column1}
                        dataSource={referalMyearnigs.hasdata ? datasource1 : []}
                        expandable={true}

                      />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"  onClick={handelsubmitdealreopen}>Save </button>
      </div>
    </div>
  </div>
</div>
            {/* /Page Header */}
            <div className="student-group-form">
              <div className="row" style={{ display: "none" }}>
                <div className="col-lg-3 col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Payment Status "
                    />
                  </div>
                </div>

                <div className="col-lg-2 pull-right">
                  <div className="search-student-btn">
                    <button type="btn" className="btn btn-primary">
                      Test Running Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-header">
                    <button className="btn btn-xs col-md-4 btn-info col-12"  onClick={()=>handalapical("HAPPENING")}>
                   Test Closed Deals
                    
                    </button>
                    <button
                      className="btn btn-xs col-md-4 btn-success col-12"
                      style={{ marginLeft: "6px" }}    onClick={()=>handalapical("CLOSED")}
                    >
                      <i className="fa-solid fa-download"></i>
                      Escrow Participation Closed Deals
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="page-header m-0 p-0"></div>
                    <div className="table-responsive">
                      <Table
                        className="table table-stripped table-hover datatable"
                        pagination={{
                          total: referalMyearnigs.apiData.count,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={column}
                        dataSource={referalMyearnigs.hasdata ? datasource : []}
                        expandable={true}
                        loading={referalMyearnigs.loading}
                        onChange={referalMyearnigsPagination}
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

export default TestDeals;

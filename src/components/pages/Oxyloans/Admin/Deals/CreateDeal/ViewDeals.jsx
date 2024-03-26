import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table, Tag } from "antd";

// import "./inserted.css";

import {
    getborrowerapiclick,
  getintrestedapi,
  getintrestedapiclick,
  getloanborrowerandlender,
  getviewdealadmin,
  handelcalcluateapi,
  handleStopPartici,
  handlecalculatapidata,
} from "../../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import Header from "../../../../../Header/Header";
import Sidebar from "../../../../../SideBar/AdminSidebar";
import MainAdminDashboard from "../../MainAdminDashboard";
import AdminSidebar from "../../../../../SideBar/AdminSidebar";
import AdminHeader from "../../../../../Header/AdminHeader";
import { onShowSizeChange } from "../../../../../Pagination";
import { dealreopen, handleextenddealTenureapi } from "../../../../Base UI Elements/SweetAlert";


const ViewDeals = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard: true,
    inputfiledvalue2:false,
    isfiledvaild:false,
    inputfiled2:"",
    inputselectcity:false,
    inpututm:false
  });


  const  [datavalue   ,setdatavalue]=useState({
    inputfiled:"",
    fieldValue:"",
    fieldValue2:"",
    utmamountfiled:"",
    inputfiledvalue:false,
    fieldValue3:"",
    fieldValue31:"",
  })


  const [adminviewdeal , setAdminviewdeal]=useState({
   payload:{
      pageNo: 1,
    pageSize: 10,
    dealType: "HAPPENING"  }
  })
  const [buttonindex, setbuttonindex] = useState({
    btnindex: "",
    isbuttonvalid: false,
  });
  const HandleClick = (id) => {
    setbuttonindex((prevState) => ({
      ...prevState,
      isbuttonvalid: !prevState.isbuttonvalid,
      btnindex: id,
    }));
    console.log(buttonindex.btnindex);
  };


  const extenddealTenure =async(dealId)=>{
    const   response  =await   handleextenddealTenureapi(dealId)

    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data);
        Swal.fire("Deal Closed successfully");
      }
    });
  }
  const handleStopParticipation=(dealId)=>{

    const response =handleStopPartici(dealId);
    console.log(response);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data);
        Swal.fire("Deal Closed successfully");
      }
    });
  }
  const membershiphistoryPagination = (Pagination) => {
    setintrested({
      ...intrested,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

  const handelchange = (event) => {
    const { name, value } = event.target;
    setdatavalue({
      ...datavalue,
      [name]: value
    });
  
    console.log(event.target.value);

  };
  useEffect(() => {
    const response = getviewdealadmin(adminviewdeal.payload.pageNo  ,adminviewdeal.payload.pageSize  ,   adminviewdeal.payload.dealType);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data);
        setintrested({
          ...intrested,
          apiData: data.data.listOfBorrowersDealsResponseDto,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [adminviewdeal.pageNo , adminviewdeal.pageSize]);


     const handelClick =(type)=>{
      setAdminviewdeal({
        ...adminviewdeal,
        dealType:type
      })
      const response = getviewdealadmin(adminviewdeal.payload.pageNo  ,adminviewdeal.payload.pageSize  ,   type);
      response.then((data) => {
        if (data.request.status == 200) {
          console.log(data);
          setintrested({
            ...intrested,
            apiData: data.data.listOfBorrowersDealsResponseDto,
            loading: false,
            hasdata: data.data.count == 0 ? false : true,
          });
        }
      });
     }
  const datasource = [];
  {
    intrested.apiData != ""
      ? intrested.apiData.map((data) => {
          datasource.push({
            key: Math.random(),
            PaymentDate: data,
            TransactionNumber: data,
            Amount: data,
            PaidThrough: data,
            documents: data,
            comments: data,
          });
        })
      : "";
  }



  const columns = [
    {
      title: "Deal Name",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>   
          <p>Deal Id :{render.dealId}</p>
          <p>Deal name : - {render.dealName}</p>
          <p>
            <strong>Aggrements : </strong> 
            {render.agreementsGenerationStatus}
          </p>
          <p>First Participation :     {render.firstParticipationDate}</p>
          <p>Last Participation :     {render.lastParticipationDate}</p>

         




        </>
      ),
    },			
    {
      title: "Deal Info",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
          
           
            <p>  Participate :  {render.dealPaticipatedAmount}</p>
            <p> Current Amount :  {render.dealCurrentAmount}</p>
            <p>  To Wallet :  {render.dealAmountReturnedToWallet}</p>
            <p>  Return Principal :  {render.withdrawalAndPrincipalReturned}</p>
          
          </div>
        </>
      ),
    },
    {
      title: "Deal User",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
               <p>  Borrower :OXYLOANS</p>
            <p> Borrower ROI :2.25</p>
            <p> Status :Yet to be Achieved</p>
            <p> Deal Amount : 10,000</p>
            <p>  Borrower :OXYLOANS</p>
            
          <p>
            <strong>Emi date : </strong>
            2024-06-04
          </p>
        </>
      ),
    },
    {
      title: "Modify",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
      
      
      <div className="divintrested">  
            <Link to={`/editDealInfo?${render.dealId}`}> <Tag color="#0dcaf0"> Edit</Tag>    </Link>
            <Tag color="#3d5ee1" onClick={() => dealreopen(render.dealId)}>
            Deal Reopen
            </Tag>     
              
            <Link to=""> <Tag color="#f50" onClick={()=>handleStopParticipation(render.dealId)}>     Stop Participation</Tag>    </Link>
            <Link to="">  <Tag color="#3c8dbc"  onClick={() => extenddealTenure(render.dealId)}>
            Tenure Extend
            </Tag></Link>
          </div>  
        </>
      ),
    },
    {
      title: "View Participated Users",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>
        <div className="divintrested">
        <Link to=""> <Tag color="#0dcaf0">  View Lenders</Tag>    </Link>
        <Tag color="#3d5ee1" onClick={() => HandleClick(render.id)}>
        Withdrawal Request
        </Tag>     
          
        <Link to=""> <Tag color="#f50">      Principal Summary</Tag>   </Link>
     
      </div>
    </>
      ),
    },
    {
      title: "Know More",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render, index) => (
        <>
            <div className="divintrested">
            <Link to=""> <Tag color="#0dcaf0">  Pay Interest</Tag>    </Link>
            {/* <Tag color="#3d5ee1" onClick={() => HandleClick(render.id)}>
            Withdrawal Request
            </Tag>      */}
              
            <Link to=""> <Tag color="#f50">      Initiating Notifications</Tag>   </Link>
            <Tag color="#3c8dbc" onClick={() => HandleClick(render.id)}>
            Interest Summary
            </Tag>
          </div>
        </>
      ),
    },
   
  ];
  const handleTagClick = () => {
    console.log("but");
  };


  const  handelclickuser=()=>{

    console.log(intrested);
    console.log(datavalue);
    const response = getborrowerapiclick(
      intrested,
      datavalue
   
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.results)
        setintrested({
          ...intrested,
          apiData: data.data.results,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }
   
  return (
    <>
      <div className="main-wrapper">
        <AdminHeader />
        <AdminSidebar />
        {/*Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/*Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">
                      Running & Closed Deals
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Hold Deal Users</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                  
                    <button
               
               className="btn btn-warning col-lg-3 col-sm-6  mx-lg-2"   style={{color:'white'}}   onClick={()=>handelClick("HAPPENING")}
             >
                    <i className="fa fa-user mx-1"></i>  Regular Running Deals 
                  </button>

                  <button
               
                    className="btn btn-warning col-lg-3 col-sm-6  mx-lg-2"   style={{color:'white'}}   onClick={()=>handelClick("CLOSED")}
                  >
                    <i className="fa fa-user mx-1"></i>  Participation Closed Deals 
                  </button>
           
                   
                      
                      
                    </div>
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: intrested.apiData.count,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                        }}
                        columns={columns}
                        dataSource={intrested.hasdata ? datasource : []}
                        expandable={true}
                        loading={intrested.loading}
                        onChange={membershiphistoryPagination}
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

export default ViewDeals;

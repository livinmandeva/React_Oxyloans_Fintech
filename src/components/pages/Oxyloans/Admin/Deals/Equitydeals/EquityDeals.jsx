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
  handlecalculatapidata,
} from "../../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import Header from "../../../../../Header/Header";
import Sidebar from "../../../../../SideBar/AdminSidebar";


const EquityDeals = () => {
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
    const response = getviewdealadmin(adminviewdeal.payload);
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
  }, []);

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

  const handlecalculat = (index) => {
    console.log(index);
    Swal.fire({
      title: "Are you sure?",
      text: "Are You Sure, you want to update the CIBIL Score?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enter the Cibil score",
          text: "Cibil Score*",
          icon: "warning",
          input: "text", // Use 'input' instead of render
          inputAttributes: {
            className: "form-control",
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            const inputValue = result.value; // Retrieve the value entered by the user
            // Now you can use inputValue in your logic
            console.log("User input:", inputValue);
            const response = handlecalculatapidata(inputValue, index);

            response.then((data) => {
              console.log(data);
              if (data.request.status == 200) {
                Swal.fire({
                  title: "CIBIL Score",
                  text: "Updated",
                  icon: "success",
                });
              }
            });
          }
        });
      }
    });
  };

  const handlesendoffer = () => {
    Swal.fire({
      text: "Are You Sure, you want to update the CIBIL Score?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      setintrested({
        ...intrested,
        isvaildcard: !intrested.isvaildcard,
      });
      if (result.isConfirmed) {
        console.log(intrested.isvaildcard);
        console.log(intrested.isvaildcard);
      }
    });
  };
  const handlecalculation = async (index) => {
    const response = await handelcalcluateapi(index);
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        Swal.fire({
          text: "Are You Sure, you want to update the CIBIL Score?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

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
            <Link to=""> <Tag color="#0dcaf0"> Edit</Tag>    </Link>
            <Tag color="#3d5ee1" onClick={() => HandleClick(render.id)}>
            Deal Reopen
            </Tag>     
              
            <Link to=""> <Tag color="#f50">     Stop Participation</Tag>    </Link>
            <Tag color="#3c8dbc" onClick={() => HandleClick(render.id)}>
            Tenure Extend
            </Tag>
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
            <Link to=""> <Tag color="#0dcaf0"> Edit</Tag>    </Link>
            <Tag color="#3d5ee1" onClick={() => HandleClick(render.id)}>
            Deal Reopen
            </Tag>     
              
            <Link to=""> <Tag color="#f50">       Stop Participation</Tag>    </Link>
            <Tag color="#3c8dbc" onClick={() => HandleClick(render.id)}>
            Tenure Extend 
            </Tag>
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
            <Link to=""> <Tag color="#0dcaf0"> Edit</Tag>    </Link>
            <Tag color="#3d5ee1" onClick={() => HandleClick(render.id)}>
            Tenure Extend 
            </Tag>     
              
            <Link to=""> <Tag color="#f50">   Stop Participation</Tag>   </Link>
            <Tag color="#3c8dbc" onClick={() => HandleClick(render.id)}>
             Deal Reopen
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
        <Header />
        <Sidebar />
        {/*Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/*Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">
                     Running & Closed Equity Deals
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
                  
                  <Link
                    to="/myRunningDelas"
                    className="btn btn-success col-lg-3 col-sm-6  mx-lg-2"
                  >
                    <i className="fa fa-user mx-1"></i>  
                                    Equity Running Deals 
                  </Link>

                  <Link
                    to="/myRunningDelas"
                    className="btn btn-warning col-lg-3 col-sm-6  mx-lg-2"   style={{color:'white'}}
                  >
                    <i className="fa fa-user mx-1"></i>  
                                    Equity Participation Closed Deals 
                  </Link>
           
                   
                      
                      
                    </div>
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        // pagination={{
                        //   total: membershiphistory.apiData.count,
                        //   showTotal: (total, range) =>
                        //     `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        //   position: ["topRight"],
                        //   showSizeChanger: false,
                        //   onShowSizeChange: onShowSizeChange,
                        // }}
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

export default EquityDeals;

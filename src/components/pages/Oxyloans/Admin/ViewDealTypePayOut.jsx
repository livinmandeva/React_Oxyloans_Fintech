import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table, Tag } from "antd";

import {
    getborrowerapiclick,
  getdealpay,
  getintrestedapi,
  getintrestedapiclick,
  getloanborrowerandlender,
  handelcalcluateapi,
  handlecalculatapidata,
} from "../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import AdminHeader from "../../../Header/AdminHeader";
import AdminSidebar from "../../../SideBar/AdminSidebar";


const ViewDealTypePayOut = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: false,
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
  
     if (event.target.value === "viewdealsPayouts") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"viewdealsPayouts",
        inputselectcity:false,
        inputfiledvalue2:false,
        inpututm:false,
      });
    }else if (event.target.value === "roi") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue2:true,
        inputfiled:"Min Roi",
        inputfiled2:"Max",
        inputselectcity:false,
        inpututm:false,
      });
    }else if (event.target.value === "amount") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue2:true,
        inputfiled:"Min Amount",
        inputselectcity:false,
        inpututm:false,
        inputfiled2:"Max ",
      });
    }else if (event.target.value === "amount&city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue2:true,
        inputfiled:"amount&city",
        inputfiled1:"Min Amount",
        inputfiled2:"Max ",
        inputselectcity:true,
        inpututm:false
      });
    }else if (event.target.value === "city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: false,
        inputfiledvalue2:false,
        inputselectcity:true,
        isfiledvaild:false,
        inpututm:false
      });
    }
  };


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
     		
      title: "Deal Info",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
    <p> Deal name: {render.dealName}</p> 
   <p> Deal Amount :  {render.dealAmount} </p> 
     <p> Rate Of Interest {render.rateOfInterest} </p> 
        </>
      ),
    },
    {
      title: "Dates Info",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
          <p> Funds Acceptance End Date : {render.fundsAcceptanceEndDate}</p> 
   <p> Funds Acceptance Start Date :{render.fundsAcceptanceStartDate} </p> 
     <p> Loan Active Date:{render.loanActiveDate} </p> 
          </div>


        </>
      ),
    },
    {
      title: "Duration",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
       


       <p> Duration :{render.duration}</p> 
   <p> WithDrawalRoi: {render.withDrawalRoi}</p> 

 
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
    const response = getdealpay(
      intrested,
      datavalue
   
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.results)
        setintrested({
          ...intrested,
          apiData: data.data.listOfBorrowersDealsResponseDto,
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
                  Deal Payout
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Deal Payout</li>
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
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Choose Deal Type and Payout
                            <span className="login-danger"></span>
                          </label>
                          <select
                            type="text"
                            name="inputfiled"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                            onChange={handelchange}
                          >
                            <option>-- Choose  --</option>
                            <option value="viewdealsPayouts">Dealtype & payout</option>
                         
                       

                        
                          </select>
                        </div>
                      </div>
                      
           
{datavalue.inputfiledvalue  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Deal Type
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="fieldValue3"  
                            className="form-control" 
                            onChange={handelchange}
                            // placeholder={datavalue.inputfiled}
                          >


                    {/* <option value=""> Utm</option> */}
                    <option value="CLOSED">CLOSED</option>
                    <option value="OPENED">OPENED</option>

                          </select>
                        </div>
                      </div></>}   

                        
                      {datavalue.inputfiledvalue  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Payout
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="fieldValue31"  
                            className="form-control" 
                            onChange={handelchange}
                            // placeholder={datavalue.inputfiled}
                          >


                    {/* <option value=""> Utm</option> */}
                    <option value="YEARLY">YEARLY</option>
                    <option value="MONTHLY">MONTHLY</option>
                    <option value="QUARTERLY">QUARTERLY</option>
                    <option value="ENDOFTHEDEAL">ENDOFTHEDEAL</option>

                          </select>
                        </div>
                      </div></>}
                
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={()=>handelclickuser()}>
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
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

export default ViewDealTypePayOut;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table, Tag } from "antd";

import Header from "../../../../Header/Header";
// import "./inserted.css";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import {
    getborrowerapiclick,
  getintrestedapi,
  getintrestedapiclick,
  getloanborrowerandlender,
  handelcalcluateapi,
  handlecalculatapidata,
  sendpdfapi1,
  updateemicommentsapi,
} from "../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import AdminSidebar from "../../../../SideBar/AdminSidebar";
import AdminHeader from "../../../../Header/AdminHeader";
import { changeprimarytypeapi, commentapi, updateuserstatus } from "../../../Base UI Elements/SweetAlert";


const LendersLoansinfo = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    type:"LENDER",
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
  
    if (event.target.value === "Name") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"Name",
        inputselectcity:false,
        inputfiledvalue2:false,
        inpututm:false,
      });

     
    } else if (event.target.value === "borrowersid") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"borrowers id",
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
    }else if (event.target.value === "mobileNumber") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"mobileNumber",
        inputfiledvalue2:false,
        inputselectcity:false,
      });
    }else if (event.target.value === "oxyscore") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue1:false,
        inputfiled:"oxyscore",
        
        inpututm:false,
      });
    }else if (event.target.value === "pannumber") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"pannumber",
        inputfiledvalue2:false,
        inputfiled2:"OxyScore",
        inputselectcity:false,
        inpututm:false,
        inputselectcity:false,
      });
    }else if (event.target.value === "utm") {
      setdatavalue({
        ...datavalue,
        inputfiled:"utm",
        inputfiledvalue: false,
        inputfiledvalue2: false,
        inputselectcity:false,
        inpututm:true
      });
    }else if (event.target.value === "utm&amount") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        utmamountfiled:"utm&amount",
        inputfiled:"Min Amount",
        inputfiled2:"Max Amount",
        inputfiledvalue2: true,
        inputselectcity:false,
        inpututm:true
      });
    }else if (event.target.value === "utm&city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: false,
        inputfiled:"utm&city",
        inputfiledvalue2:false,
        inpututm:true,
        inputselectcity:true
      });
    }else if (event.target.value === "utm&city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"utm&city",
        inpututm:true
      });
    }
  };
  useEffect(() => {
    const response = getintrestedapi(intrested.pageNo, intrested.pageSize);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.results);
        setintrested({
          ...intrested,
          apiData: data.data.results,
          loading: false,
          hasdata: data.data.totalCount == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [intrested.pageNo, intrested.pageSize]);


 

  const  sendpdfapi=async(id)=>{
   
    const response =await sendpdfapi1(
id);

      if (data.request.status == 200) {
        console.log(data.data.results)
  
      }
  }



  const updateEmiComments =async(id)=>{

    try{
      const response = await  updateemicommentsapi(id);
        

      console.log(response);
      if(response.request === 200){
        console.log(response.data);
    
      }
    }catch{
          console.log("error" , error);
    }


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
      title: "Borrower Info",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
 <p>Lr {render.userDisplayId}</p>      

<p>Loan Process Type:- {render.loanProcessType}</p>

<p>Lender Group ID {render.groupId}</p>
<p>Lender Group:-  {render.groupName}</p>



        </>
      ),
    },
    {
      title: "Regd Date & Exp Date",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
          <p>Regd Date :- {render.loanRequestedDate}  </p>

<p>Exp Date :- {render.expectedDate}</p>

<p>Wallet Value:- {render.walletAmount}</p>

<p>PAN NUMBER {render.user.panNumber}</p>

<p>DOB: {render.user.dob}</p>


          </div>
        </>
      ),
    },
    {
      title: "Name & Mobile",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
          <p>{render.lenderUser.firstName}</p>
          <p>{render.lenderUser.mobileNumber}</p>
          <p>{render.lenderUser.city}</p>
          <p>UTM From :- {render.lenderUser.utmSource}  </p>

<p>City :- {render.lenderUser.city}</p>


<p>INR {render.loanRequestAmount}</p>
<p>{render.rateOfInterest} %</p>
          </div>
        </>
      ),
    },
    {
      title: "Email & Address",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
    <p> {render.lenderUser.email}</p>
    <p>{render.lenderUser.address}</p>
    <p>Bank Account Details</p>
<p>{render.lenderUser.firstName}</p>
<p>{render.lenderUser.accountNumber}</p>
<p>{render.lenderUser.ifscCode}</p>
<p>{render.branchName}</p>
        </>
      ),
    },
    {
      title: "View Documents",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>


        
<div className="">


{documents &&
            documents.lenderKycDocuments &&
            documents.lenderKycDocuments.map((document, docIndex) => (
              <div key={docIndex}>
                <Link
                  to={document.documentSubType == "PAN" && document.downloadUrl}
                >
                  <p>
                    {document.documentSubType == "PAN" &&
                      document.documentSubType}
                  </p>
                </Link>

                <Link
                  to={
                    document.documentSubType == "AADHAR" && document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "AADHAR" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "Bank Statement" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "Bank Statement" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "PASSPORT" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "PASSPORT" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "DRIVINGLICENCE" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "DRIVINGLICENCE" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "VOTERID" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "VOTERID" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "PAYSLIPS" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "PAYSLIPS" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "BANKSTATEMENT" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "BANKSTATEMENT" &&
                      document.documentSubType}
                  </p>
                </Link>
              </div>
            ))}
</div>
<div className="divintrested">

            <Tag color="#2db7f5" onClick={() => sendpdfapi(render.id)}>
            send loan statement
          </Tag>
          <Tag color="#2db7f5" onClick={() => updateEmiComments(render.id)}>
          update emi Comments   
          </Tag>
           
          </div>
        </>
      ),
    },
    {
      title: "Comments",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          {/* <Button size="small"> Risk Calculation</Button>
         <Button size="small">Cibil score</Button>
         <Button size="small">Send Offer</Button>
         <Button size="small">Reject Offer</Button>
         <Button size="small">Approved & Create Deal</Button> */}

          <div className="divintrested">
          <Tag color="#2db7f5" onClick={() => changeprimarytypeapi(render.userDisplayId , "BORROWER")}>
            Change to Borrower
          </Tag>
          <Tag color="#2db7f5" onClick={() => changeprimarytypeapi(render.userDisplayId , "LENDER")}>
          Change to Test Lender
          </Tag>
            <Tag color="#f50">
            Interested</Tag>
            <Tag color="#3d5ee1"  onClick={() => commentapi(render.userDisplayId)}>
            Write to comments 
            </Tag>
          </div>
        </>
      ),
    },
    {
      title: "Change Role & User Status",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          {/* <Button size="small"> Risk Calculation</Button>
         <Button size="small">Cibil score</Button>
         <Button size="small">Send Offer</Button>
         <Button size="small">Reject Offer</Button>
         <Button size="small">Approved & Create Deal</Button> */}

          <div className="divintrested">

            <Tag color="#2db7f5" onClick={() => changeprimarytypeapi(render.userDisplayId , "BORROWER")}>
            Change to Borrower
          </Tag>
          <Tag color="#2db7f5" onClick={() => changeprimarytypeapi(render.userDisplayId , "LENDER")}>
          Change to Test Lender
          </Tag>
            <Tag color="#f50"    onClick={() => updateuserstatus(render.userDisplayId , "LENDER")}>
            Interested</Tag>
            <Tag color="#f50"   onClick={() => commentapi(render.userDisplayId)}>
            Write to comments </Tag>
           
          </div>
        </>
      ),
    },
  ];
  const handleTagClick = () => {
    console.log("but");
  };
// useEffect(()=>{
//   const response = getborrowerapiclick(
//     intrested,
//     datavalue
 
//   );
//   response.then((data) => {
//     if (data.request.status == 200) {
//       console.log(data.data.results)
//       setintrested({
//         ...intrested,
//         apiData: data.data.results,
//         loading: false,
//         hasdata: data.data.count == 0 ? false : true,
//       });
//     }
//   });
// },[])



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
   

  const sendlenderMonthlyStatements =(userID , data)=>{

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
                  Lenders Loan Applications
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
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Choose
                            <span className="login-danger"></span>
                          </label>
                          <select
                            type="text"
                            name="inputfiled"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                            onChange={handelchange}
                          >
                            <option>-- Choose --</option>
                            <option value="borrowersid">LENDER id</option>
                            <option value="Name">Name</option>
                            <option value="roi">ROI</option>
                            <option value="amount">Amount</option>
                            <option value="amount&city">Amount&city</option>
                            <option value="city">City</option>
                            <option value="mobileNumber">Mobile Number</option>
                            <option value="oxyscore">Oxyscore</option>
                            <option value="pannumber">Pan Number</option>
                            <option value="utm">UTM</option>
                            <option value="utm&amount">UTM&Amount</option>
                            <option value="utm&city">UTM&city</option>
                            {/* <option value="Name">Name</option>
                            <option value="Name">Name</option> */}

                        
                          </select>
                        </div>
                      </div>
                      
                      {datavalue.inputselectcity  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          Select City 
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="fieldValue3"  
                            className="form-control" 
                            onChange={handelchange}
                            // placeholder={datavalue.inputfiled}
                          >


                    <option value=""> Select City</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Pune">Pune</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Other">Other</option>

                          </select>
                        </div>
                      </div></>}
{datavalue.inputfiledvalue  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            {datavalue.inputfiled}  
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="fieldValue"  
                            className="form-control" 
                            onChange={handelchange}
                            // placeholder={datavalue.inputfiled}
                          />
                        </div>
                      </div></>}   

                        
                      {datavalue.inpututm  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                          utm
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
                    <option value="WEB">Web</option>
                    <option value="MOBILE">Mobile</option>

                          </select>
                        </div>
                      </div></>}
                      {datavalue.inputfiledvalue2  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            {datavalue.inputfiled2}  
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="fieldValue2"   
                            className="form-control" 
                            onChange={handelchange}
                            // placeholder={datavalue.inputfiled}
                          />
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

export default LendersLoansinfo;

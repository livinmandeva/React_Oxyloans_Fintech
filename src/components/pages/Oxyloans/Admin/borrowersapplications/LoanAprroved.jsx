import React,{ useEffect, useState }  from "react";
import { Link } from "react-router-dom";

import { Button, Table } from "antd";

import Header from "../../../../Header/Header";
import './inserted.css';
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getintrestedapi, getintrestedapiclick, handelcalcluateapi, handelmodelopen, handlecalculatapidata } from "../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import Model from "./Model";


const LoanAprroved = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard:false,
    modeldata:[],
  });

const [buttonindex , setbuttonindex]=useState({
  btnindex:"",
  isbuttonvalid:false
})   

const [datavalue , setdatavalue]= useState({
  fieldValue: "",
  inputfiled:"",
  inputfiledvalue:false,



})

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
      inputfiled:"Name"
    });
  } else if (event.target.value === "Borrowers id") {
    setdatavalue({
      ...datavalue,
      inputfiledvalue: true,
      inputfiled:"Borrowers id",
    });
  }
};
const HandleClick = (id) => {
  setbuttonindex(prevState => ({
    ...prevState,
    isbuttonvalid: !prevState.isbuttonvalid,
    btnindex: id,
  }));
  console.log(buttonindex.btnindex);
}
  const membershiphistoryPagination = (Pagination) => {
    setintrested({
      ...intrested,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

 
  useEffect(() => {
    const response = getintrestedapi(
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
    return () => {};
  }, [intrested.pageNo, intrested.pageSize ]);

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
            documents:data,
            comments:data,
          });
        })
      : "";
  }    


  const handlecalculation=async(index)=>{
    const response= await handelcalcluateapi(index);
    response.then((data) => {

      console.log(data)
      if (data.request.status == 200) {
        Swal.fire({
          text: "Are You Sure, you want to update the CIBIL Score?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
  }});

}


const  handelclickuser=()=>{
  const response = getintrestedapiclick(
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
  const columns = [
    {
      title: "User Info",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
          <p>BR : -{render.user.id}</p>
          <p><strong>Status:</strong> {render.user.status}</p>
        </>
      )
    },
    {
      title: "Req Date & Exp Date",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render)=>(
        <>
        <div  className="insertstart">
       <p><strong>Req Date:-</strong> {render.loanRequestedDate}</p>
       <p><strong>Exp Date:-</strong> {render.expectedDate}</p>
       </div>
        </>
      )
    },
    {
      title: "Name & Mobile",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
       <p> {render.user.firstName} {render.user.mobileNumber}</p>
       <p><strong>city :</strong>{render.borrowerUsercity}</p>
       <p><strong>oxyScore :{render.lenderUser.oxyScore}</strong></p>

        </>
      )
    },
    {
      title: "Email & Address",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
        {/* rateOfInterestToBorrower

       <p>{render.rateOfInterest}% Monthly</p> */}
       <p>{render.user.email}</p>
       <p>{render.user.address}</p>
       {/* <p><strong>INR</strong> {render.loanRequestAmount}</p>
       <p>{render.rateOfInterest}% Monthly</p> */}
        </>
      )
    },
    {
      title: "Amount & ROI",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
       <p><strong>INR </strong> {render.loanRequestAmount}</p>
       <p>{render.rateOfInterest}% Monthly</p>
        </>
      )
    },
    {
      title: "View documents",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>
        {documents && documents.borrowerKycDocuments && documents.borrowerKycDocuments.map((document, docIndex) => (
          <div key={docIndex}>
            <Link to={document.documentSubType =="PAN" && document.downloadUrl} ><p>{document.documentSubType =="PAN" && document.documentSubType}</p>
            </Link>

            <Link to={document.documentSubType =="AADHAR" && document.downloadUrl} ><p>{document.documentSubType =="AADHAR" && document.documentSubType}</p></Link>

            <Link to={document.documentSubType =="PAN" && document.downloadUrl} ><p>{document.documentSubType =="PAN" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="Bank Statement" && document.downloadUrl} ><p>{document.documentSubType =="Bank Statement" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="PAYSLIPS" && document.downloadUrl} ><p>{document.documentSubType =="PAYSLIPS" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="DRIVING LICENCE" && document.downloadUrl} ><p>{document.documentSubType =="DRIVING LICENCE" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="VOTERID" && document.downloadUrl} ><p>{document.documentSubType =="VOTERID" && document.documentSubType}</p></Link>
        
            {/* <p>AADHAR</p>
        <p>Passport</p>
        <p>Bank Statement</p>
        <p>PAYSLIPS</p>
        <p>DRIVING LICENCE</p>
        <p>VOTERID</p> */}
          </div>
        ))}
  
      </>
      )
    },
    {
      title: "Comments",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render , index)=>(
        <>
 

{render.id == buttonindex.btnindex  && <p>

 {render.comments}
</p>}
    
        </>
      )
    },
    {
      title: "Risk calculations & send offer",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
         

         <div  className="divintrested">  
   
                         <a data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={()=>handelmodel(render.user.id)}><p>View Requests & <br></br> Responses to this borrower</p> </a>
                      <Button type="primary" size="small" style={{     background: 'tomato'}}  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Reject Offer</Button>
       
         </div>

    
        </>
      )
    },
   
  ];
   const handelmodel =async(userid)=>{
  const response =await handelmodelopen(userid);

  console.log(response.data.results)
  setintrested({
    ...intrested,
    modeldata:data.data.results,
  })
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
                    Intrested Borrower Loan Applications
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
                            <option value="Borrowers id">Borrowers id</option>
                            <option value="Name">Name</option>
                          </select>
                        </div>
                      </div>

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
                      
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={()=>handelclickuser()}>
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
                    </div>{intrested.isvaildcard  && <>   <Model />
                    </>}
                    <div>       

                      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog  modal-dialog-centered modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <>
      
      <table class="table">
  <thead>
    <tr>			
      <th scope="col">Lender Id</th>
      <th scope="col">Req Date & Exp Date</th>
      <th scope="col">Name & Mobile</th>
      <th scope="col">Email & Address</th>
      <th scope="col">Amount & ROI</th>
      <th scope="col">View documents</th>
      <th scope="col">Comments</th>
    </tr>
  </thead>
  <tbody>
  {intrested.modeldata.length !== 0 ? 

  intrested.modeldata.map((data, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
    </tr>
  ))
  : <tr>No Offers found!</tr>
}

   
  </tbody>
</table></>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Close</button>
      </div>
    </div>
  </div>
</div>  




<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Reject the offer</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      Are You Sure, do you want to Reject the offer to this user?
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary">Yes</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    
      </div>
    </div>
  </div>
</div>
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

export default LoanAprroved;

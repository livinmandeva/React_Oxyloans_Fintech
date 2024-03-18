import React,{ useEffect, useState }  from "react";
import { Link, useLocation } from "react-router-dom";

import { Button, Table } from "antd";

import Header from "../../../../Header/Header";

import Sidebar from "../../../../SideBar/AdminSidebar";
import './helpdesk.css'
import { getintrestedapi, handelcalcluateapi, handlecalculatapidata, handlesubmitqueymessageapi, ticketHistoryapiget, uploadscrreenshort, userquerydetails, userquerydetailsAPI } from "../../../../HttpRequest/admin";
import Swal from "sweetalert2";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { uploadkyc } from "../../../../HttpRequest/afterlogin";
import { Success, WarningBackendApi } from "../../../Base UI Elements/SweetAlert";



const UserQueryDetails = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard:true,
    filename:"",
    queryDetailsview:[]
  });
  const location = useLocation();
  const [userquery ,  setuserquery]=useState({

        pageNo: 1,
        pageSize: 10,
        status: "Pending",
        primaryType: "LENDER"

  })
  const [resolvingUserQuery , setresolvingUserQuery]=useState({
    
    id: "15",
    userId: "5",
    status: "Completed",
    comments: "testing",
    resolvedBy: "Subash",
    adminDocumentId: "103"
  })
  

const handlechange =(event)=>{
  const {name  , value}=event.target;
  setresolvingUserQuery({
    ...resolvingUserQuery,
    [name]:value,
  })
}
const [buttonindex , setbuttonindex]=useState({
  btnindex:"",
  isbuttonvalid:false
})
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
    const response = userquerydetailsAPI(
      "Pending", "LENDER"  , userquery
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.results)
        setintrested({
          ...intrested,
          apiData: data.data.listOfUserQueryDetailsResponseDto,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }

    console.log(data.data.listOfUserQueryDetailsResponseDto)
    });
    return () => {};
  }, [intrested.pageNo, intrested.pageSize]);

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

  const columns = [
    {
      title: "User Info",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
      <p><strong>User Id :</strong> {render.userNewId}</p>
      <p><strong>Mobile No :</strong> {render.mobileNumber}</p>
      <p><strong>Email:</strong>{render.mobileNumber}</p>
      <p><strong>Ticket Id:</strong> {render.ticketId}</p>
      <p><strong>User Name:</strong> {render.name}</p>

        </>
      )
    },
    {
      title: "User Query",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents) => (
        <>
     <p>{documents.query}</p>
  
      </>
      )
    },
    {
      title: "Admin & User replies",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render , index)=>(
        <>
      <p><strong>Comments</strong></p>
     
      {console.log('List of pending queries:', render.listOfPendingQueries)}
      {render.listOfPendingQueries && render.listOfPendingQueries.length > 0 ?
        render.listOfPendingQueries.map((query, queryIndex) => (
          <React.Fragment key={queryIndex}>
             <p><strong>Query :</strong> {render.status}</p>
            <p><strong>Respond By: </strong>{query.respondedBy}</p>
            <p><strong>Respond on: </strong>{query.respondedOn}</p>
          </React.Fragment>
        )) : (
          <p>No pending queries</p>
        )
      }
    </>
      )
    },
    {
      title: "	Status",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>

<p><strong>Status :</strong> {render.status}</p>

<p><strong>received On : </strong>{render.receivedOn}</p>



        </>
      )
    },
    {
        title: "Actions",
        dataIndex: "Amount",
        sorter: (a, b) => a.Amount - b.Amount,
        render: (render)=>(
          <>
  <div className="queryreslovebutton">
   <Button type="primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=> onclickreslove(render.id , render.userId ,render.adminDocumentId)}> Resolved </Button>
   <Button  danger data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=> onclickPending(render.id , render.userId ,render.adminDocumentId)}> Pending  </Button>
   <Button type="primary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop1" onClick={()=> ticketHistoryapi11(render.id , render.userId)}>  Ticket History  </Button>
   </div>
  
  
          </>
        )
      },
   
  ];



  const  onclickreslove =(id , userId , adminDocumentId)=>{
 console.log(id)

 setresolvingUserQuery({
  ...resolvingUserQuery,
  id:id,
  status:"Completed",
  userId:userId,
  adminDocumentId:adminDocumentId
 })
  }
  // /resolvingUserQuery
  // {
  //   "id": "15",
  //   "userId": "5",
  //   "status": "Completed",
  //   "comments": "testing",
  //   "resolvedBy": "Subash",
  //   "adminDocumentId": "103"
  // }   


  const  onclickPending =(id , userId , adminDocumentId)=>{
    console.log(id)
   
    setresolvingUserQuery({
     ...resolvingUserQuery,
     id:id,
     status:"Pending",
     userId:userId,
     adminDocumentId:adminDocumentId
    })
     }

 
  const handlefileupload = (event) => {
    const files= event.target.files[0].name;
    setintrested({
      ...intrested,
      filename:files
    })
    const response = uploadscrreenshort(event);
    response
      .then((data) => {
        if (data && data.request && data.request.status === 200) {
      
          Success("success", ` Uploaded Successfully`);
        } else if (
          data &&
          data.response &&
          data.response.data &&
          data.response.data.errorCode !== "200"
        ) {
          WarningBackendApi("warning", data.response.data.errorMessage);
        } else {
          console.error("Unexpected response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Error during file upload:", error);
      });
  };


  const  ticketHistoryapi11 =async(id , userId)=>{
  // alert("")
    try {
      const response = await ticketHistoryapiget(id , userId);
      console.log(response.data);
      setintrested({
        ...intrested,
        queryDetailsview:response.data
      })
    } catch (error) {
      console.error(error);
    }
  }
  const handlesubmitqueymessage = async () => {
    try {
      const response = await handlesubmitqueymessageapi(resolvingUserQuery);
      console.log(response.data.message);
      Success("success", `${response.data.message}`);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handelClickPendinglender  =async (status  , type)=>{

    // setuserquery({
    //   ...userquery,
    //   status:status,
    //   primaryType:type
    // })

    // setuserquery(prevState => ({
    //   ...prevState,
    //   status: status,
    //   primaryType: type
    // }));

    const response = userquerydetailsAPI(
      status  , type , intrested
  );
  response.then((data) => {
    if (data.request.status == 200) {
      console.log(data.data.results)
      setintrested({
        ...intrested,
        apiData: data.data.listOfUserQueryDetailsResponseDto,
        loading: false,
        hasdata: data.data.count == 0 ? false : true,
      });
    }
  })
  }
 const handelClickPendingborrower  =async (status  , type ,)=>{

  // setuserquery({
  //   ...userquery,
  //   status:status,
  //   primaryType:type
  // })

  // setuserquery(prevState => ({
  //   ...prevState,
  //   status: status,
  //   primaryType: type
  // }));
  


  const response = userquerydetailsAPI(
    status  , type , intrested
);
response.then((data) => {
  if (data.request.status == 200) {
    console.log(data.data.results)
    setintrested({
      ...intrested,
      apiData: data.data.listOfUserQueryDetailsResponseDto,
      loading: false,
      hasdata: data.data.count == 0 ? false : true,
    });
  }
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
                  Resolved Queries
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

               
                          <button type="button" className="btn btn-success col-lg-3 col-sm-6" onClick={()=>handelClickPendingborrower("pending"  ,"BORROWER")}>
                         
                          Pending Borrower Queries
                    
                          </button>

                 
  
    
                          <button type="button" className="btn btn-info col-lg-3 col-sm-6" onClick={()=>handelClickPendinglender("pending" ,"LENDER")}     style={{marginLeft: '10px',}}>
                      
                  
                          Pending Lender Queries
                    
                          </button>


           

                      <>

<div class="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel1"> User Info </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <table class="table   table table-bordered border-primary"  style={{border:'1px soild blue'}}>
  <thead>
    <tr>
      <th scope="col">User Info</th>
      <th scope="col">Query</th>

    </tr>
  </thead>
  <tbody>    

  {intrested.queryDetailsview.length !== 0 && (
  <>
    {intrested.queryDetailsview.map((data, index) => (
      <React.Fragment key={index}>
        <tr>
          <td>
            Name: {data.name}
            <br />
            Mobile Number: {data.mobileNumber}
            <br />
            Ticket Id: {data.ticketId}
            <br />
            Received On: {data.receivedOn}
            <br />
          </td>
          <td>{data.query}</td>
        </tr>
      </React.Fragment>
    ))}
  </>
)}

  
  </tbody>
</table>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Close</button>
      </div>
    </div>
  </div>
</div></>
                      <>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Comments </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      <div className="form-group col-12 col-md-8">
                                <label>
                                Comments
                                  <span className="login-danger">*</span>
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter comments"
                                  col={2}
                                  onChange={handlechange}
                                  name="comments"
                              
                                  >  
                                  </textarea></div>
                                  <div className="form-group col-12 col-md-8">
                                <label>
                                Updating By
                                  <span className="login-danger">*</span>
                                </label>
                                <select
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Email Id"   
                                  onChange={handlechange}   
                                  name="resolvedBy"
                                >
                                  <option>-- Choose Your Name --</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="Ramadevi">Ramadevi</option>
                                    <option value="Subash">Subash</option>
                                   
                                </select>
                              </div>
      <div className="form-group col-12 col-md-8">
                                <p className="settings-label">
                                Attach File <span className="star-red">*</span>
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    name="USERQUERYSCREENSHOT"
                                    id="USERQUERYSCREENSHOT"
                                    onChange={handlefileupload}
                                    className="hide-input"  
                                 
                                  
                                  />
                                  <label htmlFor="file" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>   

                                {intrested.filename && <div className="success"><i class="fa-regular fa-image"></i>{" "} {intrested.filename}</div>} </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  onClick={handlesubmitqueymessage}>Save</button>
        <button type="button" class="btn btn-primary">Close</button>
      </div>
    </div>
  </div>
</div></>
                    </div>
                    <p  className="mt-2 mb-2"   style={{textTransform:'capitalize'}}><strong>No of {userquery.primaryType} Pending queries : {intrested.apiData.length !== 0  && intrested.apiData.length}</strong> </p>
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                       
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

export default UserQueryDetails;

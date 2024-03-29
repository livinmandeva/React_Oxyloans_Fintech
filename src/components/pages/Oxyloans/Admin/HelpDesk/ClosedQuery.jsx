import React,{ useEffect, useState }  from "react";
import { Link } from "react-router-dom";

import { Button, Table } from "antd";

import Header from "../../../../Header/Header";

import Sidebar from "../../../../SideBar/AdminSidebar";
import './helpdesk.css'
import { getintrestedapi, handelcalcluateapi, handlecalculatapidata, userquerydetails, userquerydetailsAPI } from "../../../../HttpRequest/admin";
import Swal from "sweetalert2";
import AdminSidebar from "../../../../SideBar/AdminSidebar";
import AdminHeader from "../../../../Header/AdminHeader";



const ClosedQuery = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard:true,
  });
   const [reslove , setreslove] =useState({
    pageNo: 1,
    pageSize: 10,
    status: "Cancelled",
    primaryType: "LENDER"  
   })    
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



  const datasource = [];
  if (intrested.apiData && intrested.apiData !== "") {
    intrested.apiData.map((data) => {
      datasource.push({
        key: Math.random(),
        PaymentDate: data,
        TransactionNumber: data,
        Amount: data,
        PaidThrough: data,
        documents: data,
        comments: data,
      });
    });
  } 

  const handlecalculat=(index)=>{
    

    console.log(index)
    Swal.fire({
      title: "Are you sure?",
      text: "Are You Sure, you want to update the CIBIL Score?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Enter the Cibil score",
          text: "Cibil Score*",
          icon: "warning",
          input: 'text', // Use 'input' instead of render
          inputAttributes: {
              className: 'form-control'
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result)=> {

          if(result.isConfirmed)  {
            const inputValue = result.value; // Retrieve the value entered by the user
            // Now you can use inputValue in your logic
            console.log("User input:", inputValue);
            const response=  handlecalculatapidata(inputValue  ,index);

            response.then((data) => {
    
              console.log(data)
              if (data.request.status == 200) {
                Swal.fire({
                  title: "CIBIL Score",
                  text: "Updated",
                  icon: "success",
                });
          }});
          }
        })
   
    
     
      }
    });

}


const handlesendoffer =()=>{
  Swal.fire({
    text: "Are You Sure, you want to update the CIBIL Score?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    setintrested({
      ...intrested,
      isvaildcard:!intrested.isvaildcard,
    })
    if (result.isConfirmed) {
    
      
      console.log(intrested.isvaildcard)
      console.log(intrested.isvaildcard)
    }
})
}

const handelClickPendinglender = async (status, type) => {

  const response = userquerydetailsAPI(  status, type, reslove ,);
  response.then((data) => {
    if (data.request.status == 200) {
      console.log(data.data.listOfUserQueryDetailsResponseDto)
      setintrested({
        ...intrested,
        apiData: data.data.listOfUserQueryDetailsResponseDto,
        loading: false,
        hasdata: data.data.count == 0 ? false : true,
      });
    }
  });

};


useEffect(()=>{
  handelClickPendingborrower("Cancelled" , "BORROWER")
},[])
const handelClickPendingborrower = async (status, type,) => {



  const response = userquerydetailsAPI( status, type, reslove ,);
  response.then((data) => {
    if (data.request.status == 200) {
      console.log(data.data.listOfUserQueryDetailsResponseDto)
      setintrested({
        ...intrested,
        apiData: data.data.listOfUserQueryDetailsResponseDto,
        loading: false,
        hasdata: data.data.count == 0 ? false : true,
      });
    }
  });
};
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





  const columns = [

    {
        				
      title: "User Info",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
      <p><strong>User Id :</strong> {render.userNewId}</p>
      <p><strong>Mobile No :</strong> {render.mobileNumber}</p>
      <p><strong>Email:</strong> {render.email}</p>
      <p><strong>Ticket Id:</strong> {render.ticketId}</p>
      <p><strong>User Name:</strong> {render.name}</p>

        </>
      )
    },
    {
      title: "Query",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>
     <p>{documents.query}</p>
  
      </>
      )
    },
    {
      title: "Query Status",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render , index)=>(
        <>
          	<p><strong>Admin comments :</strong> {render.comments}</p>

             <p><strong>Resolved By : </strong>{render.resolvedBy}</p>
        </>
      )
    },
     {
      title: "Status",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>

<p>{render.status}</p>
<p><strong>Responded On:</strong> {render.respondedOn}</p>



        </>
      )
    }, 
    {
        title: "Actions",
        dataIndex: "comments",
        sorter: (a, b) => a.Amount - b.Amount,
        render: (render , index)=>(
          <>
                <p><strong>Admin comments :</strong> {render.comments}</p>
  
               <p><strong>Resolved By : </strong>{render.resolvedBy}</p>
          </>
        )
      },

   
  ];

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
                
                     Cancelled Queries
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">  Cancelled Queries    </li>
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


          
                          <button type="button" className="btn btn-success col-lg-3 col-sm-6" onClick={()=>handelClickPendinglender("Cancelled" , "LENDER")}>  
                        Cancelled Lender Queries
                          </button>
      
  

                          <button type="button" className="btn btn-info col-lg-3 col-sm-6" onClick={()=>handelClickPendingborrower("Cancelled" , "BORROWER")}    style={{marginLeft: '10px',}}>  
                        Cancelled Borrower Queries
                          </button>

        
                    </div>
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

export default ClosedQuery;

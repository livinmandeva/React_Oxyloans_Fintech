import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Header from "../../../../Header/Header";
import './style.css'
import Sidebar from "../../../../SideBar/AdminSidebar";
import { fdstatitckapi } from "../../../../HttpRequest/admin";

const FdStatistics = () => {

  
  const  [fdstatisticsdata , setfdstatisticsdata]=useState({
      type: "ALL",
      startDate: null,
      endDate: null,
      isfiledvaild:false
  });   

const [apdata  , setapidata]=useState({
    rsponsedata:""
})
const handlechange = (event) => {
  const { value, name } = event.target;

  // Set the value in state
  setfdstatisticsdata({
    ...fdstatisticsdata,
    [name]: value,
  });

  // Check the value after it's updated
  if (value === "dateRange") {
    // Since state updates are asynchronous, we can't rely on fdstatisticsdata.type immediately after setting it
    // Therefore, we should directly check 'value' instead of 'fdstatisticsdata.type'
    setfdstatisticsdata((prevData) => ({
      ...prevData,
      type: null,
      isfiledvaild: !prevData.isfiledvaild,
    }));
  }

  console.log(value);
};

const  handlefdstatistic =async()=>{
  const   response = await fdstatitckapi(fdstatisticsdata);

  setapidata({
    ...apdata,
    rsponsedata:response.data
  });
  console.log(response.data)
  console.log(apdata.rsponsedata)
}

 useEffect(()=>{

  const  fdstatisticsdataapi =async()=>{
      const   response = await fdstatitckapi(fdstatisticsdata);

      setapidata({
        ...apdata,
        rsponsedata:response.data
      });
      console.log(response.data)
      console.log(apdata.rsponsedata)
    }

    fdstatisticsdataapi()
 },[])

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <Sidebar />

        {/* Page Wrapper */}

        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title"> FD Statistics </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Transfer The Funds
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header"></div>
                  <div className="card-body">
                    {/* <form> */}
                    <div className="row">
  <div className="col-12 col-sm-4">
    <div className="form-group local-forms">
      <label>
        Borrower Id :<span className="login-danger">*</span>
      </label>
      <select
        type="text"
        // name="userid" 
        className="form-control"
        name="type"
        placeholder="Enter the Borrower Id"
        onChange={handlechange}
      >
        <option >Please choose an option</option>
        <option value="dateRange">Date Range</option>
      </select>
    </div>
  </div>
  {fdstatisticsdata.isfiledvaild && <>
    <div className="col-12 col-sm-4">
      <div className="form-group local-forms">
        <label>
        Start Date  :<span className="login-danger">*</span>
        </label>

<input type="date" className="form-control"   name="startDate"  onChange={handlechange} />
      </div>
    </div>
    <div className="col-12 col-sm-4">
      <div className="form-group local-forms">
        <label>
        End Date :<span className="login-danger">*</span>
        </label>
        <input type="date" className="form-control"   
         name="endDate" 
         onChange={handlechange} />
      </div>
    </div>
  </>}
  <div className="col-12">
    <div className="student-submit">
      <button type="button" className="btn btn-primary"   onClick={handlefdstatistic}>
        Fetch details
      </button>
    </div>
  </div>
</div>


                    {/* <div className="row col-6" style={{ marginTop: "1rem" }}>
                      <table className="table table-hover tableinfo">
                        <tr>
                          <td className="table-primary">No of FDs Done</td>
                          <td className="table-secondary"> 4</td>
                        </tr>

                        <tr>
                          <td className="table-primary">Value of the FDS</td>
                          <td className="table-secondary">INR 2600000</td>
                        </tr>

                        <tr>
                          <td className="table-primary">
                            No of the active FDS
                          </td>
                          <td className="table-secondary"> 0</td>
                        </tr>

                        <tr>
                          <td className="table-primary">
                            Value of the active Fds
                          </td>
                          <td className="table-secondary"> INR 0</td>
                        </tr>

                        <tr>
                          <td className="table-primary">
                            Total Interest Received to ICICI
                          </td>
                          <td className="table-secondary">INR 3000</td>
                        </tr>
                        <tr>
                          <td className="table-primary">
                            Total Interest Received to HDFC
                          </td>
                          <td className="table-secondary"> INR 550</td>
                        </tr>
                        <tr>
                          <td className="table-primary">
                            Total Fd Closed Interest
                          </td>
                          <td className="table-secondary"> INR 2510000</td>
                        </tr>
                      </table>
                    </div> */}
<div>
<table class="content-table">
  <thead>
    <tr>
      <th>FD Statistics</th>
      <th>Table</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>No of FDs Done</td>
 
      <td>{apdata.rsponsedata  !="" ?  <>{apdata.rsponsedata.noOfFdsDone}</>  : null}</td>
    </tr>
    <tr class="active-row">
    <td>Value of the FDS</td>
    <td>{apdata.rsponsedata  !="" && apdata.rsponsedata.valueOfFd}</td>
    </tr>
    <tr>
    <td>No of the active FDS</td>
    <td>{apdata.rsponsedata  !="" && apdata.rsponsedata.noOfActiveFds}</td>
    </tr>
    <tr class="active-row">
    <td>Value of the active Fds</td>
    <td>{apdata.rsponsedata  !="" && apdata.rsponsedata.noOfActiveFdsAmount}</td>
    </tr>
    <tr>
    <td>Total Interest Received to ICICI</td>
    <td>{apdata.rsponsedata  !="" && apdata.rsponsedata.amountReceivedToIcici}</td>
    </tr>
    <tr class="active-row">
    <td>Total Interest Received to HDFC</td>
    <td>{apdata.rsponsedata  !="" && apdata.rsponsedata.amountReceivedToHdfc}</td>
    </tr>
    {/* <tr>
    <td>No of the active FDS</td>
    </tr> */}
      <tr>
    <td>Total Fd Closed Interest</td>
    <td>{apdata.rsponsedata  !="" && apdata.rsponsedata.totalFdClosedInterest}</td>
    </tr>
  </tbody>
</table>
</div>

                    <div>

            </div>
                    {/*   </form> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default FdStatistics;

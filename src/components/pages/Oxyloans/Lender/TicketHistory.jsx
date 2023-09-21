import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
  import {TicketHistoryapi}  from '../../../HttpRequest/afterlogin'
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ViewTicketHistory from "./ViewTicketHistory";import './InvoiceGrid.css'


const TicketHistory = () => {


  const [ticket,setticketdata]= useState({})
  const [apires,setapires]=useState([])

  useEffect(()=>{  handleWriteClick()


  },[])
  const handleWriteClick = async () => {
   

    const response = TicketHistoryapi();
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        console.log(data)
        setticketdata(data)
        // alert("success");
        var queryDetailsArray = data.data.listOfUserQueryDetailsResponseDto;
        

        // Initialize an array to store email addresses
        var emailAddresses = [];
        
        // Loop through the array and extract the "email" property for each item
        for (var i = 0; i < queryDetailsArray.length; i++) {
            var email = queryDetailsArray[i];
            emailAddresses.push(email);
        }
        
        // Now, the "emailAddresses" array contains all the email addresses
        console.log(emailAddresses);
        setapires(queryDetailsArray)
        // console.log(queryDetailsArray)
      } else {
        alert("error");
      }
    });
  };
  // console.log("api" + apires)
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <SideBar />

        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">Ticket History </h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/students">DashBoard</Link>
                      </li>
                      <li className="breadcrumb-item active">Ticket History</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row col-12">
                  <div className="col-xl-12 d-flex">
                    {/* Star Students */}
                    <div className="card flex-fill student-space comman-shadow">
                      {/* <div className="card-header d-flex align-items-center">
                        <h5 className="card-title">Investment / Wallet</h5>
                        <ul className="chart-list-out student-ellips">
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div> */}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th className="text-center">S#</th>
                                <th className="text-center"> Ticket Id</th>
                                <th className="text-center"> Query</th>
                                <th className="text-center">Admin Comments</th>
                              </tr>
                            </thead>
                            <tbody>
                            {apires.map((item ,index) => (
                              
                         <tr key={index}>
                                <td className="text-center">
                                  <div>{item.sNo}</div>
                                </td>
                                <td className="text-center">
                                  <div><strong>Ticket Id :</strong>{item.ticketId}</div>
                                  <div> <strong>Received On :</strong> {item.receivedOn}</div>
                                  <div><strong>Status </strong>  {item.status}</div>
                            
                                </td>
                                <td className="text-center">{item.query}</td>
                                <td className="text-center">
                                  <div className="buttn">
                                   <button className=" btn btn-secondary statusbutton">View Comments</button>
                                   <button className=" btn btn-dark statusbutton statusbutton2">Inquiries Reply</button>
                                   <Link to="/writetous" ><button className=" btn btn-warning statusbutton statusbutton3">Write Reply</button>  </Link>
                                   <button className=" btn btn-info statusbutton statusbutton4">Cancel</button>
                                  </div>
                                </td>
                              </tr>

                            ))}
                              {/* <tr>
                                <td className="text-center">
                                  <div>5</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-07-14</div>
                                </td>
                                <td className="text-center">36months2.2ROI</td>
                                <td className="text-center">1185</td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* /Star Students */}
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

export default TicketHistory;

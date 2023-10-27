import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import { TicketHistoryapi, ticketcommentapi } from "../../../HttpRequest/afterlogin";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import ViewTicketHistory from "./ViewTicketHistory";
import "./InvoiceGrid.css";
import Comment from "../Utills/Modals/Comment";

const TicketHistory = () => {
  const [ticket, setticketdata] = useState({});
  const [apires, setapires] = useState([]);const  [dataapi ,setdataapi]    =useState()
  const [ticketcomment ,  setticketcommit]=useState(false)

  useEffect(() => {
    handleWriteClick();
    return () => {};
  }, []);
  const handleWriteClick = async () => {
    const response = TicketHistoryapi();
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        console.log(data);
        setticketdata(data);
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
        setapires(queryDetailsArray);
        // console.log(queryDetailsArray)
      } else {
        alert("error");
      }
    });
  };

  useEffect(()=>{

  },[ticketcomment])


  const handeticketcomment= async(id)=>{
const response =  ticketcommentapi(id)
     setticketcommit(!ticketcomment)
      response.then((data)=>{
        console.log(data) 
        setdataapi(data)
      }) 
  }
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
                    {ticketcomment && (<Comment   data={dataapi} />)}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table border-0 star-student  table-center mb-0">
                            <thead>
                              <tr>
                                <th className="text-center"> Ticket Id</th>
                                <th className="text-center"> Received On</th>
                                <th className="text-center"> Status</th>
                                <th className=""> Query</th>
                                <th className="text-center">Admin Comments</th>
                              </tr>
                            </thead>
                            <tbody>
                              {apires.map((item, index) => (
                                <tr key={index} className={`tablerow${index % 2 === 0 ? 'event' : 'odd'}`}>
                                  <td className="text-center">
                                    <div>{item.ticketId}</div>
                                  </td>
                                  <td className="text-center">
                                    <div>{item.receivedOn}</div>
                                  </td>
                                  <td>
                                    <div
                                      className={
                                        item.status === "Completed"
                                          ? "badge badge-success"
                                          : "badge badge-danger"
                                      }
                                    >
                                      {item.status}
                                    </div>
                                  </td>
                                  <td
                                    className=""
                                    style={{
                                      width: "20px",
                                      whiteSpace: "break-spaces",
                                    }}
                                  >
                                    {item.query}
                                  </td>
                                  <td className="text-center">
                                    <div className="buttn">
                                      <div  className="badgedat">
                                      <div className="badge bg-success" onClick={()=>handeticketcomment(item.id)} >
                                        View Comments
                                      </div>
                                      <div className="badge bg-warning  ">
                                        Inquiries Reply
                                      </div>
                                      </div>
                                      <div  className="badgedat">
                                      <Link
                                        className=" badge bg-info col-md-9 col-12"
                                        to="/writetous"
                                      >
                                        <div className="">Write Reply</div>{" "}
                                      </Link>
                                      <div className=" badge bg-success-dark  col-md-8 col-12">
                                        Cancel
                                      </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
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

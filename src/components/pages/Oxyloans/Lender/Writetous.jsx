import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import {
  getUserDetails,
  writequery,
  fileuploads,
} from "../../../HttpRequest/afterlogin";
import Footer from "../../../Footer/Footer";
import { allqueries, cancelled, resolved, pending } from "../../../imagepath";
import { HandleClick } from "../../Base UI Elements/SweetAlert";
import { Upload } from "feather-icons-react/build/IconComponents";
import MyRichTextEditor from "./MyRichTextEditor";

const Writetous = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [userdata, setuserdata] = useState({
    profileData: {},
  });
  const [files, setfile] = useState(null);
  const [queryfiledinput, setqueryfiledinput] = useState("");

  useEffect(() => {
    getUserDetails().then((data) => {
      setuserdata({
        ...userdata,
        profileData: data,
      });
    });
    return () => {};
    // alert(userdata)
  }, []);

  console.log(userdata);

  const handleWriteClick = async () => {
    handleimageupload();

    const response = writequery(userdata, queryfiledinput);
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        alert(data.status);
      } else {
        alert("error");
      }
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setqueryfiledinput({
      ...queryfiledinput,
      [name]: value,
    });
  };

  const imageSubmit = (event) => {
    const file = event.target.files[0];
    setfile(file);
  };

  const handleimageupload = async () => {
    const response = fileuploads(files);

    console.log("file", files);
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        alert("success");
      } else {
        alert("error");
      }
    });
  };

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
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Write To Us </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">writetous</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="student-group-form">
              <div className="row">
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card inovices-card">
                    <div className="card-body">
                      <div className="inovices-widget-header">
                        <span className="inovices-widget-icon">
                          <img src={allqueries} alt="" className="queyImage" />
                        </span>
                        <div className="inovices-dash-count">
                          <div className="inovices-amount">10</div>
                        </div>
                      </div>
                      <p className="inovices-all">
                        All Queries <span></span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card inovices-card">
                    <div className="card-body">
                      <div className="inovices-widget-header">
                        <span className="inovices-widget-icon">
                          <img src={resolved} alt="" className="queyImage" />
                        </span>
                        <div className="inovices-dash-count">
                          <div className="inovices-amount">5</div>
                        </div>
                      </div>
                      <p className="inovices-all">
                        Resolved Queries <span></span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card inovices-card">
                    <div className="card-body">
                      <div className="inovices-widget-header">
                        <span className="inovices-widget-icon">
                          <img src={cancelled} alt="" className="queyImage" />
                        </span>
                        <div className="inovices-dash-count">
                          <div className="inovices-amount">3</div>
                        </div>
                      </div>
                      <p className="inovices-all">
                        Cancelled Queries <span></span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card inovices-card">
                    <div className="card-body">
                      <div className="inovices-widget-header">
                        <span className="inovices-widget-icon">
                          <img src={pending} alt="" className="queyImage" />
                        </span>
                        <div className="inovices-dash-count">
                          <div className="inovices-amount pull-left">2</div>
                        </div>
                      </div>
                      <p className="inovices-all">
                        Pending Queries <span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-body">
                    {/* Page Header */}
                    <div className="page-header">
                      <div className="row align-items-center">
                        <div className="col">
                          <h3 className="page-title">Write A Query</h3>
                        </div>
                      </div>
                    </div>
                    {/* /Page Header */}

                    <div className="row col-12">
                      <div className="col-12 col-sm-6">
                        <MyRichTextEditor  />
                        {/* <div className="form-group local-forms">
                          <label>
                            Write A query
                            <span className="login-danger">*</span>
                          </label>
                          <textarea
                            className="form-control"
                            name="queryfiledinput"
                            onChange={handleChange}
                          ></textarea> */}
                          {/* <input type="textarea" className="form-control" /> */}
                        {/* </div> */}
                      </div>
                      <div className="col-12 col-sm-6 ">
                        <div className="form-group local-forms pull-right" style={{marginLeft:'2.2rem',}}>
                          <div className="form-group service-upload">
                            <span>Upload Image</span>
                            <input
                              type="file"
                              multiple=""
                              onChange={imageSubmit}
                            />
                          </div>

                          {/* <input type="text" className="form-control" /> */}
                        </div>
                      </div>
                    </div> 
                    {/* <MyRichTextEditor  /> */}
                    {/* <p>Email: {userdata.profileData.data.email}</p>     <p>mobileNumber: {userdata.profileData.data.mobileNumber}</p> */}
                    <div className="row col-12" style={{marginTop:'2.9rem'}}>
                      <button
                        className="btn btn-primary col-md-3 mx-3"
                        onClick={handleWriteClick}
                      >
                        Submit
                      </button>
                  </div></div> 
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

export default Writetous;

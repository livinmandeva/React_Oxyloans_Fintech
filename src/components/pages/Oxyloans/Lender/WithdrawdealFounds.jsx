import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { handleapicall } from "../../../HttpRequest/afterlogin";
const WithdrawdealFounds = () => {
  const [data, setdata] = useState({
    resdata: "",
    dealname: "",
    dealID: "",
    roi: "",
    participatedamount: "",
    withdrawalamount: "",
  });

  const handlechange = (event) => {
    const [name, value] = event.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  const handlewith = async () => {
    const response = handleapicall(data);
    response.then((data) => {
      if (data.request.status === 200) {
        alert("success");
        console.log(data);
      }
    });
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const dealId = urlSearchParams.get("dealId");
    const currentAmount = urlSearchParams.get("currentAmount");
    const requestedAmount = urlSearchParams.get("requestedAmount");
    const dealName = urlSearchParams.get("dealName");
    const roi = urlSearchParams.get("roi");
    console.log(roi);
    setdata({
      ...data,
      dealname: dealName,
      dealID: dealId,
      roi: roi,
      participatedamount: currentAmount,
      withdrawalamount: requestedAmount,
    });
  }, []);

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
                  <h3 className="page-title">Withdrawal Deal Funds</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/subject">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Ongoing Delas</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <p>
                      <code>
                        <b>Note : </b>
                      </code>
                      Funds Will be Credited to your bank account within 30
                      working days.
                    </p>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Deal Name <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.dealname}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Deal ID
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.dealID}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              ROI <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.roi}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Participated Amount{" "}
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={data.participatedamount}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-4">
                          <div className="form-group local-forms">
                            <label>
                              Withdrawal Amount:
                              <span className="login-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="withdrawalamount"
                              onChange={handlechange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="student-submit">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={handlewith}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default WithdrawdealFounds;

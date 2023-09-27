import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import { LoadwaletThroughQr1 } from "../../../HttpRequest/afterlogin";

const LoadwaletThroughQr = () => {
  const [qrcode, setqrcode] = useState(false);
  const [loadwaletThroughQr, setloadwaletThroughQr] = useState({
    qrcode: false,
    qrcodeimage: "",
    amount: "",
    link: "",
    qrUrlpath: "",
    showqrcode: true,
    qrcodeStatus: "",
    qrUrlID: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;

    setloadwaletThroughQr({
      ...loadwaletThroughQr,
      [name]: value,
    });
  };
  const LoadwaletThroughQr = async () => {
    const response = LoadwaletThroughQr1(loadwaletThroughQr.amount);
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        console.log(data);
        setloadwaletThroughQr({
          ...loadwaletThroughQr,
          qrUrlpath: data.data.qrGenerationString,
          qrcodeStatus: data.data.status,
          qrUrlID: data.data.qrTableId,
        });
      }
    });
  };

  useEffect(() => {
    // This effect will run 10 seconds after component mounts and set qrcode to false
    const timerId = setTimeout(() => {
      setqrcode(false);
    }, 16000);

    // Clear the timer when the component unmounts or when you want to cancel it
    return () => clearTimeout(timerId);
  }, []);

  const checkqrcodetransaction = (qrUrlID) => {
    console.log(qrUrlID);
    // Implement your checkqrcodetransaction logic here
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
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">
                      Load Your wallet with QR Scan
                    </h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/students">DashBoard</Link>
                      </li>
                      <li className="breadcrumb-item active">QR Code</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="student-personals-grp">
                      <div className="card mb-0">
                        <div className="card-body">
                          <div className="heading-detail">
                            <h4>
                              <i className="fa-solid fa-qrcode"></i> Load Your
                              wallet with QR Scan
                            </h4>
                          </div>

                          {qrcode ? (
                            <>
                              {/* {loadwaletThroughQr.showqrcode && (
                                <QRCodeGenerator
                                  qrUrlpath={loadwaletThroughQr.qrUrlpath}
                                />
                              )} */}
                              {/* //{" "}
                              <div className="row col-12 d-flex justify-content-center">
                                // <QRCode value={"-"} />
                                //{" "}
                              </div> */}
                            </>
                          ) : (
                            <>
                              <input
                                className="form-control"
                                placeholder="Enter the Amount"
                                name="amount"
                                onChange={handlechange}
                              />
                              <div className="d-grid gap-2 d-md-block mt-2 button-qr">
                                <button
                                  className="btn btn-primary btn-primary-1"
                                  type="button"
                                  onClick={() => {
                                    setqrcode(true);
                                    setTimeout(() => {
                                      LoadwaletThroughQr();
                                    }, 0);
                                  }}
                                >
                                  Button
                                </button>
                              </div>
                            </>
                          )}
                          <ul style={{ listStyle: "block" }}>
                            <code>Note:</code>
                            <li>Transaction limit is INR 1,00,000 Only.</li>

                            <li>
                              If you want to load more than a lakh, you have to
                              scan multiple times.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="student-personals-grp">
                      <div className="card">
                        <h4 className="header-title">
                          How to load the wallet through UPI
                        </h4>
                        <p className="sub-header"></p>

                        <div className="ratio ratio-16x9">
                          <iframe src="https://www.youtube.com/embed/RUg_WsZ-90g?rel=0" />
                        </div>
                      </div>
                    </div>
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

export default LoadwaletThroughQr;

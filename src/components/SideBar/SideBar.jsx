import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Scrollbars } from "react-custom-scrollbars";
// import { LogoImg, LogoSmallImg } from "../_components/imagepath";

const Sidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenuLevel, setSideMenuLevel] = useState("");
  const [isSideMenuLevel2, setSideMenuLevel2] = useState("");

  const toggleSidebar = (value) => {
    console.log(value);
    setSideMenu(value);
  };
  const toggleSidebar1 = (value) => {
    console.log(value);
    setSideMenuLevel(value);
  };
  const toggleSidebar2 = (value) => {
    console.log(value);
    setSideMenuLevel2(value);
  };

  useEffect(() => {
    function handleMouseOver(e) {
      e.stopPropagation();
      if (
        document.body.classList.contains("mini-sidebar") &&
        document.querySelector("#toggle_btn").offsetParent !== null
      ) {
        var targ = e.target.closest(".sidebar");
        if (targ) {
          document.body.classList.add("expand-menu");
          document
            .querySelectorAll(".subdrop + ul")
            .forEach((ul) => (ul.style.display = "block"));
        } else {
          document.body.classList.remove("expand-menu");
          document
            .querySelectorAll(".subdrop + ul")
            .forEach((ul) => (ul.style.display = "none"));
        }
        return false;
      }
    }

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    $(document).on("change", ".sidebar-type-four input", function () {
      if ($(this).is(":checked")) {
        $(".sidebar").addClass("sidebar-eight");
        $(".sidebar-menu").addClass("sidebar-menu-eight");
        $(".menu-title").addClass("menu-title-eight");
        $(".header").addClass("header-eight");
        $(".header-left-two").addClass("header-left-eight");
        $(".user-menu").addClass("user-menu-eight");
        $(".dropdown-toggle").addClass("dropdown-toggle-eight");
        $(".white-logo").addClass("show-logo");
        $(
          ".header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)"
        ).addClass("hide-logo");
        $(".header-two .header-left-two .logo:not(.logo-small)").removeClass(
          "hide-logo"
        );
        $(".header-two .header-left-two .dark-logo").removeClass("show-logo");
      } else {
        $(".sidebar").removeClass("sidebar-eight");
        $(".sidebar-menu").removeClass("sidebar-menu-eight");
        $(".menu-title").removeClass("menu-title-eight");
        $(".header").removeClass("header-eight");
        $(".header-left-two").removeClass("header-left-eight");
        $(".user-menu").removeClass("user-menu-eight");
        $(".dropdown-toggle").removeClass("dropdown-toggle-eight");
        $(".white-logo").removeClass("show-logo");
        $(
          ".header-one .header-left-one .logo:not(.logo-small), .header-five .header-left-five .logo:not(.logo-small)"
        ).removeClass("hide-logo");
      }
    });
  }, []);

  let pathName = props.location.pathname;

  console.log("Working", pathName);

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              {/* Main Menu */}
              <ul>
                <li
                  className={`${
                    "/admindashboard" === pathName ? "active" : ""
                  }`}
                >
                  <Link to="/admindashboard">
                    <i className="fa-solid fa-gauge"></i>{" "}
                    <span> Dashboard </span>
                    <span className="menu-arrow"></span>
                  </Link>
                </li>

                <li
                  className={`${
                    "/dashboardTransactions" === pathName ? "active" : ""
                  }`}
                >
                  <Link to="/dashboardTransactions">
                    <i className="fa-solid fa-right-to-bracket"></i>
                    <span> Transactions </span>
                    <span className="menu-arrow"></span>
                  </Link>
                </li>
                <li className={`${"/profile" === pathName ? "active" : ""}`}>
                  <Link to="/profile">
                    <i className="fa-solid fa-user"></i>
                    <span> Profile </span>
                    <span className="menu-arrow"></span>
                  </Link>
                </li>

                {/* <li className="menu-title">
                  <span></span>
                </li> */}
                <li
                  className={`${
                    "/loadwaletThroughQr" === pathName ||
                    "/loadwalletThroughVirtualAccount" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "LoadYourWallet" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "LoadYourWallet" ? "" : "LoadYourWallet"
                      )
                    }
                  >
                    <i className="fa-solid fa-qrcode"></i>
                    <span> Load Your Wallet </span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "LoadYourWallet" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "LoadYourWallet" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/loadwaletThroughQr"
                          className={`${
                            "/loadwaletThroughQr" === pathName ? "active" : ""
                          }`}
                        >
                          Through QR
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/loadwalletThroughVirtualAccount"
                          className={`${
                            "/loadwalletThroughVirtualAccount" === pathName
                              ? "active"
                              : ""
                          }`}
                        >
                          Through Virtual Account
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={`${
                    "/regularRunningDeal" === pathName ||
                    "/regularEscrowDeals" === pathName ||
                    "/regularPersonalDeal" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "Subjects" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Subjects" ? "" : "Subjects")
                    }
                  >
                    <i className="fas fa-book-reader" />{" "}
                    <span> Ongoing Deals</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Subjects" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Subjects" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/regularRunningDeal"
                          className={`${
                            "/regularRunningDeal" === pathName ? "active" : ""
                          }`}
                        >
                          Regular Running Delas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/regularEscrowDeals"
                          className={`${
                            "/regularEscrowDeals" === pathName ? "active" : ""
                          }`}
                        >
                          Regular Escrow Delas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/regularPersonalDeal"
                          className={`${
                            "/regularPersonalDeal" === pathName ? "active" : ""
                          }`}
                        >
                          Personal Loans Delas
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={`${
                    "/myinterestEarning" === pathName ||
                    "/myhighvalueDeals" === pathName ||
                    "/myRunningDelas" === pathName ||
                    "/myholdamount" === pathName ||
                    "/earningCertificate" === pathName ||
                    "/loansStatement" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "Invoices" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Invoices" ? "" : "Invoices")
                    }
                  >
                    <i className="fas fa-clipboard" /> <span> My Deals</span>
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Invoices" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Invoices" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/myRunningDelas"
                          className={`${
                            "/myRunningDelas" === pathName ? "active" : ""
                          }`}
                        >
                          Running Deals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/myclosedDeals"
                          className={`${
                            "/myclosedDeals" === pathName ? "active" : ""
                          }`}
                        >
                          Closed Delas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/myholdamount"
                          className={`${
                            "/myholdamount" === pathName ? "active" : ""
                          }`}
                        >
                          Hold Amount
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/myinterestEarning"
                          className={`${
                            "/myinterestEarning" === pathName ? "active" : ""
                          }`}
                        >
                          My Interest Earning
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/myhighvalueDeals"
                          className={`${
                            "/myhighvalueDeals" === pathName ? "active" : ""
                          }`}
                        >
                          High Value Deals
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/earningCertificate"
                          className={`${
                            "/earningCertificate" === pathName ? "active" : ""
                          }`}
                        >
                          Earning Certificate
                        </Link>
                      </li>

                      {/* <li>
                        <Link
                          to="/loansStatement"
                          className={`${
                            "/loansStatement" === pathName ? "active" : ""
                          }`}
                        >
                          loans Statement
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/withdrawdealfromDeal" === pathName ||
                    "/withdrawalFromWallet" === pathName ||
                    "/MywithdrawalHistory" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "WithdrawFunds" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "WithdrawFunds" ? "" : "WithdrawFunds"
                      )
                    }
                  >
                    <i className="fa-solid fa-wallet"></i>
                    <span>Withdraw Funds</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "WithdrawFunds" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "WithdrawFunds" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/withdrawdealfromDeal"
                          className={`${
                            "/withdrawdealfromDeal" === pathName ? "active" : ""
                          }`}
                        >
                          From Deals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/withdrawalFromWallet"
                          className={`${
                            "/withdrawalFromWallet" === pathName ? "active" : ""
                          }`}
                        >
                          From Wallet
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/MywithdrawalHistory"
                          className={`${
                            "/MywithdrawalHistory" === pathName ? "active" : ""
                          }`}
                        >
                          My Withdraw History
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={`${
                    "/mytransactions" === pathName ||
                    "/membershipHistory" === pathName ||
                    "/walletToWalletHistory" === pathName ||
                    "/WalletToWallet" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "WalletTrans" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "WalletTrans" ? "" : "WalletTrans"
                      )
                    }
                  >
                    <i className="fa-solid fa-suitcase"></i>
                    <span>Wallet Transactions</span>
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "WalletTrans" ? (
                    <ul
                      style={{
                        display: isSideMenu == "WalletTrans" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/WalletToWallet"
                          className={`${
                            "/WalletToWallet" === pathName ? "active" : ""
                          }`}
                        >
                          Wallet To Wallet
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/walletToWalletHistory"
                          className={`${
                            "/walletToWalletHistory" === pathName
                              ? "active"
                              : ""
                          }`}
                        >
                          Wallet To Wallet History
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/mytransactions"
                          className={`${
                            "/mytransactions" === pathName ? "active" : ""
                          }`}
                        >
                          Wallet Transactions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/membershipHistory"
                          className={`${
                            "/membershipHistory" === pathName ? "active" : ""
                          }`}
                        >
                          Membership History
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={`${
                    "/writetous" === pathName ||
                    "/emicalculator" === pathName ||
                    "/addteacher" === pathName ||
                    "/editteacher" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "HelpDesk" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "HelpDesk" ? "" : "HelpDesk")
                    }
                  >
                    <i className="fa-solid fa-handshake-angle"></i>
                    <span> Help Desk</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "HelpDesk" ? (
                    <ul
                      style={{
                        display: isSideMenu == "HelpDesk" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/writetous"
                          className={`${
                            "/writetous" === pathName ? "active" : ""
                          }`}
                        >
                          Write To us
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/teachersprofile"
                          className={`${
                            "/teachersprofile" === pathName ? "active" : ""
                          }`}
                        >
                          View Ticket History
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/emicalculator"
                          className={`${
                            "/emicalculator" === pathName ? "active" : ""
                          }`}
                        >
                          Emi Calculator
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          to="/editteacher"
                          className={`${
                            "/editteacher" === pathName ? "active" : ""
                          }`}
                        >
                          Teacher Edit
                        </Link>
                      </li> */}
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={`${
                    "/configautoInvest" === pathName ||
                    "/autoInvestHistory" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "AutoInvest" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "AutoInvest" ? "" : "AutoInvest"
                      )
                    }
                  >
                    <i className="fas fa-building" /> <span> Auto Invest</span>
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "AutoInvest" ? (
                    <ul
                      style={{
                        display: isSideMenu == "AutoInvest" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/configautoInvest"
                          className={`${
                            "/configautoInvest" === pathName ? "active" : ""
                          }`}
                        >
                          Config Auto Invest
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/autoInvestHistory"
                          className={`${
                            "/autoInvestHistory" === pathName ? "active" : ""
                          }`}
                        >
                          Auto Invest History
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /Main Menu*/}
              {/* Management */}
              <ul>
                <li className="menu-title">
                  <span>Refer A Friend</span>
                </li>
                <li
                  className={`${
                    "/referaFriend" === pathName ||
                    "/myreferalStatus" === pathName ||
                    "/myreferalStatus" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "MyNetwork" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "MyNetwork" ? "" : "MyNetwork"
                      )
                    }
                  >
                    <i className="fa-solid fa-network-wired"></i>
                    <span> My Network</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "MyNetwork" ? (
                    <ul
                      style={{
                        display: isSideMenu == "MyNetwork" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/referaFriend"
                          className={`${
                            "/referaFriend" === pathName ? "active" : ""
                          }`}
                        >
                          Refer A friend
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/myreferalStatus"
                          className={`${
                            "/myreferalStatus" === pathName ? "active" : ""
                          }`}
                        >
                          Referal Status
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/mycontacts"
                          className={`${
                            "/mycontacts" === pathName ? "active" : ""
                          }`}
                        >
                          My contact
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/myEarnings"
                          className={`${
                            "/myEarnings" === pathName ? "active" : ""
                          }`}
                        >
                          My Earning
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

                <li
                  className={`${
                    "/timetable" === pathName ||
                    "/addtimetable" === pathName ||
                    "/edittimetable" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/timetable">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>

                <li
                  className={`${
                    "/blog" === pathName ||
                    "/addblog" === pathName ||
                    "/editblog" === pathName ||
                    "/pendingblog" === pathName ||
                    "/blogdetails" === pathName ||
                    "/profile" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                  style={{ display: "none" }}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "Blogs" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Blogs" ? "" : "Blogs")
                    }
                  >
                    <i className="fa fa-newspaper" /> <span> Blogs</span>
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Blogs" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Blogs" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/blog"
                          className={`${"/blog" === pathName ? "active" : ""}`}
                          style={{ display: "none" }}
                        >
                          All Blogs
                        </Link>
                      </li>
                      <li style={{ display: "none" }}>
                        <Link
                          to="/addblog"
                          className={`${
                            "/addblog" === pathName ? "active" : ""
                          }`}
                        >
                          Add Blog
                        </Link>
                      </li>
                      <li style={{ display: "none" }}>
                        <Link
                          to="/editblog"
                          className={`${
                            "/editblog" === pathName ? "active" : ""
                          }`}
                        >
                          Edit Blog
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/generalsettings" === pathName ||
                    "/localization" === pathName ||
                    "/paymentsettings" === pathName ||
                    "/emailsettings" === pathName ||
                    "/socialsettings" === pathName ||
                    "/sociallinks" === pathName ||
                    "/seo" === pathName ||
                    "/othersettings" === pathName
                      ? "active"
                      : ""
                  }`}
                  style={{ display: "none" }}
                >
                  <Link to="/generalsettings">
                    <i className="fas fa-cog" /> <span>Settings</span>
                  </Link>
                </li>
              </ul>
              {/* /Management */}
              {/* Pages */}
              <ul style={{ display: "none" }}>
                <li className="menu-title">
                  <span>Pages</span>
                </li>
                <li
                  className={`${
                    "/login" === pathName ||
                    "/register" === pathName ||
                    "/forgotpassword" === pathName ||
                    "/error404" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "Authentication" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "Authentication" ? "" : "Authentication"
                      )
                    }
                  >
                    <i className="fas fa-shield-alt" />{" "}
                    <span> Authentication </span>{" "}
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Authentication" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "Authentication" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/login"
                          className={`${"/login" === pathName ? "active" : ""}`}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className={`${
                            "/register" === pathName ? "active" : ""
                          }`}
                        >
                          Register
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/forgotpassword"
                          className={`${
                            "/forgotpassword" === pathName ? "active" : ""
                          }`}
                        >
                          Forgot Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/error404"
                          className={`${
                            "/error404" === pathName ? "active" : ""
                          }`}
                        >
                          Error Page
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li className={`${"/blankpage" === pathName ? "active" : ""}`}>
                  <Link to="/blankpage">
                    <i className="fas fa-file" /> <span>Blank Page</span>
                  </Link>
                </li>
              </ul>
              {/* /Pages */}
              {/* Others */}
              <ul style={{ display: "none" }}>
                <li className="menu-title">
                  <span>Others</span>
                </li>
                <li
                  className={`${
                    "/sports" === pathName ||
                    "/addsports" === pathName ||
                    "/editsports" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/sports">
                    <i className="fas fa-baseball-ball" /> <span>Sports</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/hostel" === pathName ||
                    "/addhostel" === pathName ||
                    "/edithostel" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/hostel">
                    <i className="fas fa-hotel" /> <span>Hostel</span>
                  </Link>
                </li>
                <li
                  className={`${
                    "/transport" === pathName ||
                    "/addtransport" === pathName ||
                    "/edittransport" === pathName
                      ? "active"
                      : ""
                  }`}
                >
                  <Link to="/transport">
                    <i className="fas fa-bus" /> <span>Transport</span>
                  </Link>
                </li>
              </ul>
              {/* /Others */}
              {/* UI Interface */}
              <ul style={{ display: "none" }}>
                <li className="menu-title">
                  <span>UI Interface</span>
                </li>
                <li
                  className={`${
                    "/alert" === pathName ||
                    "/accordion" === pathName ||
                    "/avatar" === pathName ||
                    "/badge" === pathName ||
                    "/buttons" === pathName ||
                    "/buttongroup" === pathName ||
                    "/cards" === pathName ||
                    "/breadcrumbs" === pathName ||
                    "/carousel" === pathName ||
                    "/dropdown" === pathName ||
                    "/grid" === pathName ||
                    "/images" === pathName ||
                    "/lightbox" === pathName ||
                    "/media" === pathName ||
                    "/modal" === pathName ||
                    "/offcanvas" === pathName ||
                    "/pagination" === pathName ||
                    "/popover" === pathName ||
                    "/progressbar" === pathName ||
                    "/placeholder" === pathName ||
                    "/rangeslider" === pathName ||
                    "/spinner" === pathName ||
                    "/sweetalert" === pathName ||
                    "/tabs" === pathName ||
                    "/toast" === pathName ||
                    "/tooltip" === pathName ||
                    "/typography" === pathName ||
                    "/video" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "Alerts" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Alerts" ? "" : "Alerts")
                    }
                  >
                    <i className="fab fa-get-pocket" /> <span>Base UI </span>{" "}
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Alerts" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Alerts" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/alert"
                          className={`${"/alert" === pathName ? "active" : ""}`}
                        >
                          Alerts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/accordion"
                          className={`${
                            "/accordion" === pathName ? "active" : ""
                          }`}
                        >
                          Accordions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/avatar"
                          className={`${
                            "/avatar" === pathName ? "active" : ""
                          }`}
                        >
                          Avatar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/badge"
                          className={`${"/badge" === pathName ? "active" : ""}`}
                        >
                          Badges
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/buttons"
                          className={`${
                            "/buttons" === pathName ? "active" : ""
                          }`}
                        >
                          Buttons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/buttongroup"
                          className={`${
                            "/buttongroup" === pathName ? "active" : ""
                          }`}
                        >
                          Button Group
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/breadcrumbs"
                          className={`${
                            "/breadcrumbs" === pathName ? "active" : ""
                          }`}
                        >
                          Breadcrumb
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cards"
                          className={`${"/cards" === pathName ? "active" : ""}`}
                        >
                          Cards
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/carousel"
                          className={`${
                            "/carousel" === pathName ? "active" : ""
                          }`}
                        >
                          Carousel
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dropdown"
                          className={`${
                            "/dropdown" === pathName ? "active" : ""
                          }`}
                        >
                          Dropdowns
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/grid"
                          className={`${"/grid" === pathName ? "active" : ""}`}
                        >
                          Grid
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/images"
                          className={`${
                            "/images" === pathName ? "active" : ""
                          }`}
                        >
                          Images
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lightbox"
                          className={`${
                            "/lightbox" === pathName ? "active" : ""
                          }`}
                        >
                          Lightbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/media"
                          className={`${"/media" === pathName ? "active" : ""}`}
                        >
                          Media
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/modal"
                          className={`${"/modal" === pathName ? "active" : ""}`}
                        >
                          Modals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/offcanvas"
                          className={`${
                            "/offcanvas" === pathName ? "active" : ""
                          }`}
                        >
                          Offcanvas
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/pagination"
                          className={`${
                            "/pagination" === pathName ? "active" : ""
                          }`}
                        >
                          Pagination
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/popover"
                          className={`${
                            "/popover" === pathName ? "active" : ""
                          }`}
                        >
                          Popover
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/progressbar"
                          className={`${
                            "/progprogressbarress" === pathName ? "active" : ""
                          }`}
                        >
                          Progress Bars
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/placeholder"
                          className={`${
                            "/placeholder" === pathName ? "active" : ""
                          }`}
                        >
                          Placeholders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/rangeslider"
                          className={`${
                            "/rangeslider" === pathName ? "active" : ""
                          }`}
                        >
                          Range Slider
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/spinner"
                          className={`${
                            "/spinner" === pathName ? "active" : ""
                          }`}
                        >
                          Spinner
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/sweetalert"
                          className={`${
                            "/sweetalert" === pathName ? "active" : ""
                          }`}
                        >
                          Sweet Alerts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tabs"
                          className={`${"/tabs" === pathName ? "active" : ""}`}
                        >
                          Tabs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/toast"
                          className={`${"/toast" === pathName ? "active" : ""}`}
                        >
                          Toasts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/tooltip"
                          className={`${
                            "/tooltip" === pathName ? "active" : ""
                          }`}
                        >
                          Tooltip
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/typography"
                          className={`${
                            "/typography" === pathName ? "active" : ""
                          }`}
                        >
                          Typography
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/video"
                          className={`${"/video" === pathName ? "active" : ""}`}
                        >
                          Video
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/ribbon" === pathName ||
                    "/clipboard" === pathName ||
                    "/dragdrop" === pathName ||
                    "/texteditorr" === pathName ||
                    "/counter" === pathName ||
                    "/scrollbar" === pathName ||
                    "/notification" === pathName ||
                    "/stickynote" === pathName ||
                    "/timeline" === pathName ||
                    "/horizontaltimeline" === pathName ||
                    "/formwizard" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "ribbon" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "ribbon" ? "" : "ribbon")
                    }
                  >
                    <FeatherIcon icon="box" /> <span>Elements</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "ribbon" ? (
                    <ul
                      style={{
                        display: isSideMenu == "ribbon" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/ribbon"
                          className={`${
                            "/ribbon" === pathName ? "active" : ""
                          }`}
                        >
                          Ribbon
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/clipboard"
                          className={`${
                            "/clipboard" === pathName ? "active" : ""
                          }`}
                        >
                          Clipboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dragdrop"
                          className={`${
                            "/dragdrop" === pathName ? "active" : ""
                          }`}
                        >
                          Drag & Drop
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/rating"
                          className={`${
                            "/rating" === pathName ? "active" : ""
                          }`}
                        >
                          Rating
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/texteditor"
                          className={`${
                            "/texteditor" === pathName ? "active" : ""
                          }`}
                        >
                          Text Editor
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/counter"
                          className={`${
                            "/counter" === pathName ? "active" : ""
                          }`}
                        >
                          Counter
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/scrollbar"
                          className={`${
                            "/scrollbar" === pathName ? "active" : ""
                          }`}
                        >
                          Scrollbar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/notification"
                          className={`${
                            "/notification" === pathName ? "active" : ""
                          }`}
                        >
                          Notification
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/stickynote"
                          className={`${
                            "/stickynote" === pathName ? "active" : ""
                          }`}
                        >
                          Sticky Note
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/timeline"
                          className={`${
                            "/timeline" === pathName ? "active" : ""
                          }`}
                        >
                          Timeline
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/horizontaltimeline"
                          className={`${
                            "/horizontaltimeline" === pathName ? "active" : ""
                          }`}
                        >
                          Horizontal Timeline
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/formwizard"
                          className={`${
                            "/formwizard" === pathName ? "active" : ""
                          }`}
                        >
                          Form Wizard
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/apexchart" === pathName ||
                    "/chartjs" === pathName ||
                    "/morrischart" === pathName ||
                    "/flotchart" === pathName ||
                    "/peitychart" === pathName ||
                    "/c3chart" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "apexchart" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "apexchart" ? "" : "apexchart"
                      )
                    }
                  >
                    <FeatherIcon icon="bar-chart" /> <span>Charts</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "apexchart" ? (
                    <ul
                      style={{
                        display: isSideMenu == "apexchart" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/apexchart"
                          className={`${
                            "/apexchart" === pathName ? "active" : ""
                          }`}
                        >
                          Apex Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/chartjs"
                          className={`${
                            "/chartjs" === pathName ? "active" : ""
                          }`}
                        >
                          Chart Js
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/morrischart"
                          className={`${
                            "/morrischart" === pathName ? "active" : ""
                          }`}
                        >
                          Morris Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/flotchart"
                          className={`${
                            "/flotchart" === pathName ? "active" : ""
                          }`}
                        >
                          Float Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/peitychart"
                          className={`${
                            "/peitychart" === pathName ? "active" : ""
                          }`}
                        >
                          Piety Charts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/c3chart"
                          className={`${
                            "/c3chart" === pathName ? "active" : ""
                          }`}
                        >
                          C3 Charts
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/fontawesomeicons" === pathName ||
                    "/feathericons" === pathName ||
                    "/iconicicons" === pathName ||
                    "/materialicons" === pathName ||
                    "/pe7icons" === pathName ||
                    "/simplelineicons" === pathName ||
                    "/themifyicons" === pathName ||
                    "/weathericons" === pathName ||
                    "/typiconicons" === pathName ||
                    "/flagicons" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={
                      isSideMenu == "fontawesomeicons" ? "subdrop" : ""
                    }
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "fontawesomeicons"
                          ? ""
                          : "fontawesomeicons"
                      )
                    }
                  >
                    <FeatherIcon icon="award" /> <span>Icons</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "fontawesomeicons" ? (
                    <ul
                      style={{
                        display:
                          isSideMenu == "fontawesomeicons" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/fontawesomeicons"
                          className={`${
                            "/fontawesomeicons" === pathName ? "active" : ""
                          }`}
                        >
                          Fontawesome Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/feathericons"
                          className={`${
                            "/feathericons" === pathName ? "active" : ""
                          }`}
                        >
                          Feather Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/iconicicons"
                          className={`${
                            "/iconicicons" === pathName ? "active" : ""
                          }`}
                        >
                          Ionic Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/materialicons"
                          className={`${
                            "/materialicons" === pathName ? "active" : ""
                          }`}
                        >
                          Material Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/pe7icons"
                          className={`${
                            "/pe7icons" === pathName ? "active" : ""
                          }`}
                        >
                          Pe7 Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/simplelineicons"
                          className={`${
                            "/simplelineicons" === pathName ? "active" : ""
                          }`}
                        >
                          Simpleline Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/themifyicons"
                          className={`${
                            "/themifyicons" === pathName ? "active" : ""
                          }`}
                        >
                          Themify Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/weathericons"
                          className={`${
                            "/weathericons" === pathName ? "active" : ""
                          }`}
                        >
                          Weather Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/typiconicons"
                          className={`${
                            "/typiconicons" === pathName ? "active" : ""
                          }`}
                        >
                          Typicon Icons
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/flagicons"
                          className={`${
                            "/flagicons" === pathName ? "active" : ""
                          }`}
                        >
                          Flag Icons
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/basicinput" === pathName ||
                    "/forminputgroup" === pathName ||
                    "/horizontalform" === pathName ||
                    "/verticalform" === pathName ||
                    "/formmask" === pathName ||
                    "/formvalidation" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "basicinput" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "basicinput" ? "" : "basicinput"
                      )
                    }
                  >
                    <FeatherIcon icon="sidebar" /> <span>Forms</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "basicinput" ? (
                    <ul
                      style={{
                        display: isSideMenu == "basicinput" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/basicinput"
                          className={`${
                            "/basicinput" === pathName ? "active" : ""
                          }`}
                        >
                          Basic Inputs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/forminputgroup"
                          className={`${
                            "/forminputgroup" === pathName ? "active" : ""
                          }`}
                        >
                          Input Groups
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/horizontalform"
                          className={`${
                            "/horizontalform" === pathName ? "active" : ""
                          }`}
                        >
                          Horizontal Form
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/verticalform"
                          className={`${
                            "/verticalform" === pathName ? "active" : ""
                          }`}
                        >
                          Vertical Form
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/formmask"
                          className={`${
                            "/formmask" === pathName ? "active" : ""
                          }`}
                        >
                          Form Mask
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/formvalidation"
                          className={`${
                            "/formvalidation" === pathName ? "active" : ""
                          }`}
                        >
                          Form Validation
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/basictable" === pathName || "/datatable" === pathName
                      ? "active submenu"
                      : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "basictable" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "basictable" ? "" : "basictable"
                      )
                    }
                  >
                    <FeatherIcon icon="layout" /> <span>Tables</span>
                    <span className="menu-arrow"></span>
                  </Link>
                  {isSideMenu == "basictable" ? (
                    <ul
                      style={{
                        display: isSideMenu == "basictable" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/basictable"
                          className={`${
                            "/basictable" === pathName ? "active" : ""
                          }`}
                        >
                          Basic Tables
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/datatable"
                          className={`${
                            "/datatable" === pathName ? "active" : ""
                          }`}
                        >
                          Data Table
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                <li
                  className={`${
                    "/Level1" === pathName ? "active submenu" : "submenu"
                  }`}
                >
                  <Link
                    to="#"
                    className={isSideMenu == "Multilevel" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "Multilevel" ? "" : "Multilevel"
                      )
                    }
                  >
                    <i className="fas fa-code" /> <span>Multi Level</span>{" "}
                    <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Multilevel" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Multilevel" ? "block" : "none",
                      }}
                    >
                      <li
                        className={`${
                          "#" === pathName ? "active submenu" : "submenu"
                        }`}
                      >
                        <Link
                          to="#"
                          className={
                            isSideMenuLevel == ">Level 1" ? "subdrop" : ""
                          }
                          onClick={() =>
                            toggleSidebar1(
                              isSideMenuLevel == ">Level 1" ? "" : ">Level 1"
                            )
                          }
                        >
                          <span>Level 1</span>{" "}
                          <span className="menu-arrow"></span>
                        </Link>
                        {isSideMenuLevel == ">Level 1" ? (
                          <ul
                            style={{
                              display:
                                isSideMenuLevel == ">Level 1"
                                  ? "block"
                                  : "none",
                            }}
                          >
                            <li>
                              <Link
                                to="#"
                                className={`${
                                  "/#" === pathName ? "active" : ""
                                }`}
                              >
                                Level 2
                              </Link>
                            </li>
                            <li
                              className={`${
                                "#" === pathName ? "active submenu" : "submenu"
                              }`}
                            >
                              <Link
                                to="#"
                                className={
                                  isSideMenuLevel2 == ">Level 2"
                                    ? "subdrop"
                                    : ""
                                }
                                onClick={() =>
                                  toggleSidebar2(
                                    isSideMenuLevel2 == ">Level 2"
                                      ? ""
                                      : ">Level 2"
                                  )
                                }
                              >
                                <span>Level 2</span>{" "}
                                <span className="menu-arrow"></span>
                              </Link>
                              {isSideMenuLevel2 == ">Level 2" ? (
                                <ul
                                  style={{
                                    display:
                                      isSideMenuLevel2 == ">Level 2"
                                        ? "block"
                                        : "none",
                                  }}
                                >
                                  <li>
                                    <Link
                                      to="#"
                                      className={`${
                                        "/#" === pathName ? "active" : ""
                                      }`}
                                    >
                                      Level 3
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      to="#"
                                      className={`${
                                        "#" === pathName ? "active" : ""
                                      }`}
                                    >
                                      Level 3
                                    </Link>
                                  </li>
                                </ul>
                              ) : (
                                ""
                              )}
                            </li>
                            <li>
                              <Link
                                to="#"
                                className={`${
                                  "#" === pathName ? "active" : ""
                                }`}
                              >
                                Level 2
                              </Link>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                      <li>
                        <Link
                          to="/#"
                          className={`${"/#" === pathName ? "active" : ""}`}
                        >
                          Level 1
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* /UI Interface */}
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default withRouter(Sidebar);

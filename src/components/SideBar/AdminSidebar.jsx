import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

const AdminSidebar = (props) => {
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenuLevel, setSideMenuLevel] = useState("");
  const [isSideMenuLevel2, setSideMenuLevel2] = useState("");

  const toggleSidebar = (value) => {
    setSideMenu(value);
  };
  const toggleSidebar1 = (value) => {
    setSideMenuLevel(value);
  };
  const toggleSidebar2 = (value) => {
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

  let pathName = useLocation().pathname;

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight={true}
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbSize={300}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              {/* Main Menu */}
              <ul>
                <li className={`${"/mainadmindashboard" === pathName ? "active" : ""}`}>
                  <Link to="/mainadmindashboard">
                    <i className="fa-solid fa-gauge"></i>{" "}
                    <span> Dashboard </span>
                    <span className="menu-arrow"></span>
                  </Link>
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
                    className={isSideMenu == "Deals" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(isSideMenu == "Deals" ? "" : "Deals")
                    }
                  >
                    <i className="fa-solid fa-network-wired"></i>
                    <span>  Deals </span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Deals" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Deals" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/createDeal"
                          className={`${
                            "/createDeal" === pathName ? "active" : ""
                          }`}
                        >
                          Create New Deal
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/ViewDealsadmin"
                          className={`${
                            "/ViewDealsadmin" === pathName ? "active" : ""
                          }`}
                        >
                          View & Edit Deals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/equityDeals"
                          className={`${
                            "/equityDeals" === pathName ? "active" : ""
                          }`}
                        >
                          View Equity Deals
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/escrowDealsadmin"
                          className={`${
                            "/escrowDealsadmin" === pathName ? "active" : ""
                          }`}
                        >
                          View Escrow Deals
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/testDeals"
                          className={`${
                            "/testDeals" === pathName ? "active" : ""
                          }`}
                        >
                          View Test Deals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/salariedDeals"
                          className={`${
                            "/salariedDeals" === pathName ? "active" : ""
                          }`}
                        >
                          View Personal Deals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/feependingusers"
                          className={`${
                            "/feependingusers" === pathName ? "active" : ""
                          }`}
                        >
                       Pending Fee users
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/pendingFiles"
                          className={`${
                            "/pendingFiles" === pathName ? "active" : ""
                          }`}
                        >
                           Pending Files
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/offlineInterest"
                          className={`${
                            "/offlineInterest" === pathName ? "active" : ""
                          }`}
                        >
                         Offline Interest
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/offlineInterest"
                          className={`${
                            "/offlineInterest" === pathName ? "active" : ""
                          }`}
                        >
                         Deal Notification
                        </Link>
                      </li> 
                       <li>
                        <Link
                          to="/testDeals"
                          className={`${
                            "/testDeals" === pathName ? "active" : ""
                          }`}
                        >
                          View Test Deals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/viewclosedDeals"
                          className={`${
                            "/viewclosedDeals" === pathName ? "active" : ""
                          }`}
                        >
                          View Closed Deals
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/getGroupofLender"
                          className={`${
                            "/getGroupofLender" === pathName ? "active" : ""
                          }`}
                        >
                       Oxy Founding Groups
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/whatsappNotification"
                          className={`${
                            "/whatsappNotification" === pathName ? "active" : ""
                          }`}
                        >
                       WhatsApp Notification
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/lenderparticipateddeal"
                          className={`${
                            "/lenderparticipateddeal" === pathName ? "active" : ""
                          }`}
                        >
                              Update Lender Participation
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/equityInvestors"
                          className={`${
                            "/equityInvestors" === pathName ? "active" : ""
                          }`}
                        >
                        Equity Investors List
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/paytmTransactions"
                          className={`${
                            "/paytmTransactions" === pathName ? "active" : ""
                          }`}
                        >
                        Paytm Nodal
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/runningDealInfo"
                          className={`${
                            "/runningDealInfo" === pathName ? "active" : ""
                          }`}
                        >
                        Running Deals Info
                        </Link>
                      </li> 

                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              

                {/* <li className="menu-title">
                  <span></span>
                </li> */}
                <li
                  className={`${
                    "/holdAmountRequest" === pathName ||
                    "/holdAmountBreakUp" === pathName
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
                    <span>  Hold Amount </span>
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
                          to="/holdAmountRequest"
                          className={`${
                            "/holdAmountRequest" === pathName ? "active" : ""
                          }`}
                        >
                            Hold Request 
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/holdAmountBreakUp"
                          className={`${
                            "/holdAmountBreakUp" === pathName
                              ? "active"
                              : ""
                          }`}
                        >
                       Hold Amount 
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
                    <span> Student Loan Process </span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "Subjects" ? (
                    <ul
                      style={{
                        display: isSideMenu == "Subjects" ? "block" : "none",
                      }}
                    >
                      <li>
                        <Link
                          to="/borrowerRunningsinfo"
                          className={`${
                            "/borrowerRunningsinfo" === pathName ? "active" : ""
                          }`}
                        >
                           Add Student Bank Ac 
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/holdAmountRequest"
                          className={`${
                            "/holdAmountRequest" === pathName ? "active" : ""
                          }`}
                        >
                         Bank Verified User 
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/uploadFdData"
                          className={`${
                            "/uploadFdData" === pathName ? "active" : ""
                          }`}
                        >
                           Book FD 
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/verifyPaymentDetail"
                          className={`${
                            "/verifyPaymentDetail" === pathName ? "active" : ""
                          }`}
                        >
                            Verify Payment Details
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/fdPaymentDetails"
                          className={`${
                            "/fdPaymentDetails" === pathName ? "active" : ""
                          }`}
                        >
                            Payment Details 
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/searchfdUsers"
                          className={`${
                            "/searchfdUsers" === pathName ? "active" : ""
                          }`}
                        >
                            Search FD Types
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/transferFunds"
                          className={`${
                            "/transferFunds" === pathName ? "active" : ""
                          }`}
                        >
                           Transfer Funds
                        </Link>
                      </li> 
                         <li>
                        <Link
                          to="/viewListOfFds"
                          className={`${
                            "/viewListOfFds" === pathName ? "active" : ""
                          }`}
                        >
                              View List Of FD'S  
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
                    "/loansStatement" === pathName ||
                    "/myclosedDeals" === pathName
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
                    <i className="fas fa-clipboard" /> <span> Lender Pending Amount </span>
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
                          to="/pendingamountUser"
                          className={`${
                            "/pendingamountUser" === pathName ? "active" : ""
                          }`}
                        >
                            Insert Details
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/pendingamountUser"
                          className={`${
                            "/pendingamountUser" === pathName ? "active" : ""
                          }`}
                        >
                                    Pending amount User
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
                    <span>FD Statistics </span> <span className="menu-arrow" />
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
                          to="/fdStatistics"
                          className={`${
                            "/fdStatistics" === pathName ? "active" : ""
                          }`}
                        >
                          Statistics
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/fddownloadInvoice"
                          className={`${
                            "/fddownloadInvoice" === pathName ? "active" : ""
                          }`}
                        >
                         Download Invoice 
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
                    <span>Borrower Loan Process</span>
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
                          to="/borrowersapplications"
                          className={`${
                            "/borrowersapplications" === pathName ? "active" : ""
                          }`}
                        >
                           Borrowers Loan Applications 
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/intrested"
                          className={`${
                            "/intrested" === pathName
                              ? "active"
                              : ""
                          }`}
                        >
                         Intrested (L1)
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/newDisbursed"
                          className={`${
                            "/newDisbursed" === pathName ? "active" : ""
                          }`}
                        >
                           New Disbursed(L4)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/loanAprroved"
                          className={`${
                            "/loanAprroved" === pathName ? "active" : ""
                          }`}
                        >
                        Offer Accepted Users (L2)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/ApplicationLevelDisbursed"
                          className={`${
                            "/ApplicationLevelDisbursed" === pathName ? "active" : ""
                          }`}
                        >
                Deal Level Disbursed(L4)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/ApplicationLevelDisbursed"
                          className={`${
                            "/ApplicationLevelDisbursed" === pathName ? "active" : ""
                          }`}
                        >
                      Deal Level Disbursed(L4)
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/ApplicationLevelDisbursed"
                          className={`${
                            "/ApplicationLevelDisbursed" === pathName ? "active" : ""
                          }`}
                        >
                        Disburse Application Level
                        </Link>
                      </li> 

                      <li>
                        <Link
                          to="/ApplicationLevelDisbursed"
                          className={`${
                            "/ApplicationLevelDisbursed" === pathName ? "active" : ""
                          }`}
                        >
                                Closure
                        </Link>
                      </li> 
                      <li>
                        <Link
                          to="/ApplicationLevelDisbursed"
                          className={`${
                            "/ApplicationLevelDisbursed" === pathName ? "active" : ""
                          }`}
                        >
                        View Van Number
                        </Link>
                      </li> 
                      
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
                

              
              
              </ul>
              <ul>
                {/* <li className="menu-title">
                  <span>Refer A Friend</span>
                </li> */}
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
                    className={isSideMenu == "LENDERS" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "LENDERS" ? "" : "LENDERS"
                      )
                    }
                  >
                    <i className="fa-solid fa-network-wired"></i>
                    <span> LENDERS⚡</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "LENDERS" ? (
                    <ul
                      style={{
                        display: isSideMenu == "LENDERS" ? "block" : "none",
                      }}
                    >
                             <li>
                        <Link
                          to="/lendersapplications"
                          className={`${
                            "/lendersapplications" === pathName ? "active" : ""
                          }`}
                        >
                        Lenders Loan Applications
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/registerLenderUsers"
                          className={`${
                            "/registerLenderUsers" === pathName ? "active" : ""
                          }`}
                        >
                           First Time Investment
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/lenderWallettransactions"
                          className={`${
                            "/lenderWallettransactions" === pathName ? "active" : ""
                          }`}
                        >
                          Lender Wallet Trasactions 
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/uploadtransactions"
                          className={`${
                            "/uploadtransactions" === pathName ? "active" : ""
                          }`}
                        >
                        Upload Transaction
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/poolingLendrs"
                          className={`${
                            "/poolingLendrs" === pathName ? "active" : ""
                          }`}
                        >
                          Pooling Lenders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lenderreferalinfo"
                          className={`${
                            "/lenderreferalinfo" === pathName ? "active" : ""
                          }`}
                        >
                           Lender Referee Info
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/monthlyReferalEarning"
                          className={`${
                            "/monthlyReferalEarning" === pathName ? "active" : ""
                          }`}
                        >
                         Monthly Referrer Earnings
                        </Link>
                      </li>   <li>
                        <Link
                          to="/approveReferenceamount"
                          className={`${
                            "/approveReferenceamount" === pathName ? "active" : ""
                          }`}
                        >
                      Approve Reference Amount
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/editReferenceDeatils"
                          className={`${
                            "/editReferenceDeatils" === pathName ? "active" : ""
                          }`}
                        >
                        Edit Reference Details
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/editGroupinfo"
                          className={`${
                            "/editGroupinfo" === pathName ? "active" : ""
                          }`}
                        >
                        Update Lender Group
                
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lenderstatistics"
                          className={`${
                            "/lenderstatistics" === pathName ? "active" : ""
                          }`}
                        >
                    Lender Deal Statistics
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lendersInAllEquityDeals"
                          className={`${
                            "/lendersInAllEquityDeals" === pathName ? "active" : ""
                          }`}
                        >
                  Equity Lenders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lenderstatistics"
                          className={`${
                            "/lenderstatistics" === pathName ? "active" : ""
                          }`}
                        >
                        Lender's Participated Amount
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

              <li
                  className={`${
                    "/writetous" === pathName ||
                    "/emicalculator" === pathName ||
                    "/ticketHistory" === pathName
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
                          to="/ticketHistory"
                          className={`${
                            "/ticketHistory" === pathName ? "active" : ""
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
                          EMI Calculator
                        </Link>
                      </li>
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
                    style={{ display: "none" }}
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
              <ul>

<li
    className={`${
      "/writetous" === pathName ||
      "/emicalculator" === pathName ||
      "/ticketHistory" === pathName
        ? "active submenu"
        : "submenu"
    }`}
  >
    <Link
      to="#"
      className={isSideMenu == "WithdrawalRequest" ? "subdrop" : ""}
      onClick={() =>
        toggleSidebar(isSideMenu == "WithdrawalRequest" ? "" : "WithdrawalRequest")
      }
    >
      <i className="fa-solid fa-handshake-angle"></i>
      <span>  Withdrawal Requests </span> <span className="menu-arrow" />
    </Link>
    {isSideMenu == "WithdrawalRequest" ? (
      <ul
        style={{
          display: isSideMenu == "WithdrawalRequest" ? "block" : "none",
        }}
      >
        <li>
          <Link
            to="/dealWithdrawRequest"
            className={`${
              "/dealWithdrawRequest" === pathName ? "active" : ""
            }`}
          >
          From Deal
          </Link>
        </li>
        <li>
          <Link
            to="/displaylenderwithdrawalfundsList"
            className={`${
              "/displaylenderwithdrawalfundsList" === pathName ? "active" : ""
            }`}
          >
           dealWithdrawRequest
          </Link>
        </li>
        <li>
          <Link
            to="/walletToWalletHistory"
            className={`${
              "/walletToWalletHistory" === pathName ? "active" : ""
            }`}
          >
           Wallet To Wallet 
          </Link>
        </li>
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
      style={{ display: "none" }}
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

                       <ul>

<li
    className={`${
      "/writetous" === pathName ||
      "/emicalculator" === pathName ||
      "/ticketHistory" === pathName
        ? "active submenu"
        : "submenu"
    }`}
  >
    <Link
      to="#"
      className={isSideMenu == " LendersWalletAmount" ? "subdrop" : ""}
      onClick={() =>
        toggleSidebar(isSideMenu == " LendersWalletAmount" ? "" : "LendersWalletAmount")
      }
    >
      <i className="fa-solid fa-handshake-angle"></i>
      <span>   Lenders Wallet Amount </span> <span className="menu-arrow" />
    </Link>
    {isSideMenu == "LendersWalletAmount" ? (
      <ul
        style={{
          display: isSideMenu == "LendersWalletAmount" ? "block" : "none",
        }}
      >
        <li>
          <Link
            to="/checkLenderDashboard"
            className={`${
              "/checkLenderDashboard" === pathName ? "active" : ""
            }`}
          >
          Check Lender Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/lenderwalletamountdetails"
            className={`${
              "/lenderwalletamountdetails" === pathName ? "active" : ""
            }`}
          >
             wallet Transactions history
          </Link>
        </li>
        <li>
          <Link
            to="/lendersemiamount"
            className={`${
              "/lendersemiamount" === pathName ? "active" : ""
            }`}
          >
        Lenders EMI Amount Detail
          </Link>
        </li>
        <li>
          <Link
            to="/borrowersemiamount"
            className={`${
              "/borrowersemiamount" === pathName ? "active" : ""
            }`}
          >
        Loan Owners Info
          </Link>
        </li>
        <li>
          <Link
            to="/lendersemiamount"
            className={`${
              "/lendersemiamount" === pathName ? "active" : ""
            }`}
          >
      Add Loan owner
          </Link>
        </li>
        <li>
          <Link
            to="/getOxyFoundingGroups"
            className={`${
              "/getOxyFoundingGroups" === pathName ? "active" : ""
            }`}
          >
       Lenders wallet
          </Link>
        </li>
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
      style={{ display: "none" }}
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


<ul>
                {/* <li className="menu-title">
                  <span>Refer A Friend</span>
                </li> */}
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
                    className={isSideMenu == "LoanRecord" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "LoanRecord" ? "" : "LoanRecord"
                      )
                    }
                  >
                    <i className="fa-solid fa-network-wired"></i>
                    <span> Loan Records </span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "LoanRecord" ? (
                    <ul
                      style={{
                        display: isSideMenu == "LoanRecord" ? "block" : "none",
                      }}
                    >
                       <li>
          <Link
            to="/runningLoans"
            className={`${
              "/runningLoans" === pathName ? "active" : ""
            }`}
          >
         Running Loans
          </Link>
        </li>
        <li>
          <Link
            to="/closedLoansByPlatform"
            className={`${
              "/closedLoansByPlatform" === pathName ? "active" : ""
            }`}
          >
            Closed By Platform
          </Link>
        </li>
        <li>
          <Link
            to="/closedLoans"
            className={`${
              "/closedLoans" === pathName ? "active" : ""
            }`}
          >
           Closed Loans
          </Link>
        </li>
        
        <li>
          <Link
            to="/closedLoansByPlatform"
            className={`${
              "/closedLoansByPlatform" === pathName ? "active" : ""
            }`}
          >
      Closed By Platform
          </Link>
        </li>
        <li>
          <Link
            to="/lenderRunningsloans"
            className={`${
              "/lenderRunningsloans" === pathName ? "active" : ""
            }`}
          >
      Lenders Running loans
          </Link>
        </li>
        <li>
          <Link
            to="/lenderRunningsloans"
            className={`${
              "/lenderRunningsloans" === pathName ? "active" : ""
            }`}
          >
      Paid Borrowers
          </Link>
        </li>
        <li>
          <Link
            to="/lenderRunningsloans"
            className={`${
              "/lenderRunningsloans" === pathName ? "active" : ""
            }`}
          >
       Highest Paid Borrowers
          </Link>
        </li>
        <li>
          <Link
            to="/lendersemiamount"
            className={`${
              "/lendersemiamount" === pathName ? "active" : ""
            }`}
          >
      Add Loan owner
          </Link>
        </li>

                   
                    </ul>
                  ) : (
                    ""
                  )}
                </li>

              </ul>

              <ul>
                {/* <li className="menu-title">
                  <span>Refer A Friend</span>
                </li> */}
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
                    className={isSideMenu == "PAYMENT" ? "subdrop" : ""}
                    onClick={() =>
                      toggleSidebar(
                        isSideMenu == "PAYMENT" ? "" : "PAYMENT"
                      )
                    }
                  >
                    <i className="fa-solid fa-network-wired"></i>
                    <span> PAYMENTS</span> <span className="menu-arrow" />
                  </Link>
                  {isSideMenu == "PAYMENT" ? (
                    <ul
                      style={{
                        display: isSideMenu == "PAYMENT" ? "block" : "none",
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
                          My contacts
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

                <li className={`${"/" === pathName ? "active" : ""}`}>
                  <Link to="/">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
              <ul>
                {/* <li className="menu-title">
                  <span>Refer A Friend</span>
                </li> */}
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
                          My contacts
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

                <li className={`${"/" === pathName ? "active" : ""}`}>
                  <Link to="/">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Sign Out</span>
                  </Link>
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
export default AdminSidebar;
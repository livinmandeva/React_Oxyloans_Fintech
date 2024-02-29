import moment from "moment";
import React from "react";
import SideBar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import { avatar02 } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
import { useState, useEffect } from "react";
import {
  Success,
  WarningAlerterror,
  WarningBackendApi,
} from "../Base UI Elements/SweetAlert";
import { toastrSuccess, toastrWarning } from "../Base UI Elements/Toast";

import {
  profileupadate,
  getUserDetails,
  handleapicall,
  sendMoblieOtp,
  loadlendernomineeDetails,
  savenomineeDeatailsApi,
  verifyBankAccountAndIfsc,
  updatebankDetails,
  uploadkyc,
  getAllUploadedDocs,
  getPanDoc,
  getdataPassport,
  getdatachequeLeaf,
  getdataDrivingLicence,
  getdataVoterId,
  getdataAadhar,
  handelnomeeclickapi,
  handlepincodeapicall,
} from "../../HttpRequest/afterlogin";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Redux/Slice";

const Profile = () => {
  const reduxStoreData = useSelector((data) => data.counter.userProfile);
  const reduxStoreDataDashboard = useSelector(
    (data) => data.dashboard.fetchDashboard
  );

  const [dashboarddata, setdashboarddata] = useState({
    sendotpbtn: false,
    sendotpbtnText: "Send OTP",
    sendOtpsession: "",
    verifyotp: true,
    verifyotpText: "Verify IFSC",
    submitbankdeatail: false,
    profileData: null,
    isValid: false,
  });
  const [userProfile, setUserProfile] = useState({
    address: "",
    city: "",
    dob: "",
    facebookUrl: "",
    fatherName: "",
    firstName: "",
    lastName: "",
    linkedinUrl: "",
    locality: "",
    middleName: "",
    panNumber: "",
    permanentAddress: "",
    pinCode: "",
    state: "",
    twitterUrl: "",
    whatsAppNumber: "",
    aadharNumber: "",
    aadharerror: "",
    mobileNumber: "",
    email: "",
    addresserror: "",
    cityer: "",
    doberror: "",
    fatherNameerror: "",
    firstNamrror: "",
    lastNamerror: "",
    panNumbererror: "",
    permanentAddresserror: "",
    pinCodeerror: "",
    stateerror: "",
    whatsAppNumbererror: "",
    aadhaarNumbererror: "",
    aadhaarNumbererror: "",
    mobileNumbererror: "",
    emailerror: "",
  });

  const [bankaccountprofile, setBankaccountProfile] = useState({
    sendMobileOtp: "",
    moblieNumber: "",
    bankAccount: "",
    accountNumber: "",
    bankAddress: "",
    bankName: "",
    branchName: "",
    confirmAccountNumber: "",
    ifscCode: "",
    mobileOtp: "",
    mobileOtpSession: "",
    bankAccountError: "",
    updateBankDetails: true,
    nameAtBank: "eerr",
    bankCity: "",
    moblieNumbererror: "",
    bankAccounterror: "",
    accountNumbererror: "",
    bankAddresserror: "",
    bankNameerror: "",
    branchNameerror: "",
    confirmAccountNumbererror: "",
    ifscCodeerror: "",
    mobileOtperror: "",
    mobileOtpSessionerror: "",
    bankAccountError: "",
    nameAtBankerror: "",
    bankCityerror: "",
    isbankprofilevaild: true,
  });

  const [nomineeDetails, setnomineeDetails] = useState({
    nomineeName: "",
    relation: "",
    nomineeEmail: "",
    nomineeMobile: "",
    accountNo: "",
    nomineeNameerror: "",
    relationerror: "",
    nomineeEmaileeror: "",
    nomineeMobileerror: "",
    accountNoerror: "",
    nomineeIfsc: "",
    bank: "",
    branch: "",
    nomineecity: "",
    bankerror: "",
    brancherror: "",
    nomineecityerror: "",
    copyerror: "",
    isdeatail: false,
    isbtndisable: true,
  });

  const [kyc, setKyc] = useState({
    aadhar: "",
    Passport: "",
    PanCard: "",
    CHEQUELEAF: "",
    DRIVINGLICENCE: "",
    VOTERID: "",
    isValid: true,
  });

  const handlebankchange = (event) => {
    const { value, name } = event.target;
    setBankaccountProfile({
      ...bankaccountprofile,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userProfile.aadharerror >= 12) {
      setUserProfile({
        ...userProfile,
        aadharerror: "aadhaar Number must be 12 digit",
      });
    } else {
      setUserProfile({
        ...userProfile,
        aadharerror: "",
      });
    }
  }, [userProfile.aadharerror]);
  const handlerNominee = (event) => {
    const { value, name } = event.target;
    setnomineeDetails({
      ...nomineeDetails,
      [name]: value,
    });
  };

  useEffect(() => {
    const isvalid =
      nomineeDetails.accountNo != "" &&
      nomineeDetails.bank != "" &&
      nomineeDetails.branch != "" &&
      nomineeDetails.nomineeEmail != "" &&
      nomineeDetails.nomineeIfsc != "" &&
      nomineeDetails.nomineeMobile != "" &&
      nomineeDetails.nomineeName != "" &&
      nomineeDetails.relation != "" &&
      nomineeDetails.city != "";
    if (isvalid) {
      setnomineeDetails({
        ...nomineeDetails,
        isbtndisable: false,
        isdeatail: true,
      });
    } else {
      setnomineeDetails({
        ...nomineeDetails,
        isbtndisable: true,
      });
    }
  }, [
    nomineeDetails.accountNo,
    nomineeDetails.bank,
    nomineeDetails.branch,
    nomineeDetails.nomineeEmail,
    nomineeDetails.nomineeIfsc,
    nomineeDetails.nomineeMobile,
    nomineeDetails.nomineeName,
    nomineeDetails.relation,
    nomineeDetails.city,
  ]);

  const handleKeyPress = (event) => {
    console.log("Key pressed:", event.key); // Check if the function is triggered
    const inputChar = event.key;
    const regex = /^[a-zA-Z]*$/; // Regular expression to allow only alphabets

    // Check if the pressed key is an alphabetic character or backspace
    if (!regex.test(inputChar) && inputChar !== "Backspace") {
      event.preventDefault();
    }
  };
  useEffect(() => {
    if (
      bankaccountprofile.accountNumber ===
        bankaccountprofile.confirmAccountNumber ||
      bankaccountprofile.confirmAccountNumber === "" ||
      bankaccountprofile.accountNumber === ""
    ) {
      setBankaccountProfile({
        ...bankaccountprofile,
        confirmAccountNumbererror: "",
        isbankprofilevaild: false,
      });
    } else {
      setBankaccountProfile({
        ...bankaccountprofile,
        confirmAccountNumbererror: "Account numbers do not match!",
        isbankprofilevaild: true,
      });
    }
  }, [
    bankaccountprofile.accountNumber,
    bankaccountprofile.confirmAccountNumber,
  ]);
  const savebankdetailsProfile = () => {
    if (dashboarddata.isValid === true) {
      console.log("data");
      if (bankaccountprofile.mobileOtp === "") {
        console.log("data");
        setBankaccountProfile({
          ...bankaccountprofile,
          mobileOtperror: "Enter the OTP",
        });
      }
    }
    const response = updatebankDetails(bankaccountprofile);
    response.then((data) => {
      if (data.request.status == 200) {
        Success("success", "Bank Details Saved Successfully");
      } else if (data.response.data.errorCode != "200") {
        WarningBackendApi("warning", data.response.data.errorMessage);
      }
    });
  };

  const handleNomineeclick = async (event) => {
    event.preventDefault();
    setnomineeDetails({
      ...nomineeDetails,
      nomineeNameerror:
        nomineeDetails.nomineeName === "" ? "Enter the nomineeName" : "",
      relationerror: nomineeDetails.relation === "" ? "Enter the Relation" : "",
      nomineeEmaileeror:
        nomineeDetails.nomineeEmail === "" ? "Enter the Nominee Email" : "",
      nomineeMobileerror:
        nomineeDetails.nomineeMobile === ""
          ? "Enter the Nominee Mobile Number"
          : "",
      accountNoerror:
        nomineeDetails.accountNo === "" ? "Enter the   Account No" : "",
      emailerror: nomineeDetails.nomineeEmail === "" ? "Enter the Email" : "",
      bankerror: nomineeDetails.bank === "" ? "Enter the bank" : "",
      brancherror: nomineeDetails.branch === "" ? "Enter the accountNo" : "",
      nomineecityerror:
        nomineeDetails.nomineecity === "" ? "Enter the nomineecity" : "",
    });

    if (
      nomineeDetails.nomineeName !== "" &&
      nomineeDetails.nomineeName !== null &&
      nomineeDetails.relation !== "" &&
      nomineeDetails.relation !== null &&
      nomineeDetails.nomineeEmail !== "" &&
      nomineeDetails.nomineeEmail !== null &&
      nomineeDetails.nomineeMobile !== "" &&
      nomineeDetails.nomineeMobile !== null &&
      nomineeDetails.accountNo !== "" &&
      nomineeDetails.accountNo !== null &&
      nomineeDetails.nomineeEmail !== "" &&
      nomineeDetails.nomineeEmail !== null &&
      nomineeDetails.bank !== "" &&
      nomineeDetails.bank !== null &&
      nomineeDetails.branch !== "" &&
      nomineeDetails.branch !== null &&
      nomineeDetails.nomineecity !== "" &&
      nomineeDetails.nomineecity !== null &&
      nomineeDetails.nomineeNameerror === "" &&
      nomineeDetails.relationerror === "" &&
      nomineeDetails.nomineeEmaileeror === "" &&
      nomineeDetails.nomineeMobileerror === "" &&
      nomineeDetails.accountNoerror === "" &&
      nomineeDetails.emailerror === "" &&
      nomineeDetails.bankerror === "" &&
      nomineeDetails.nomineecityerror === ""

      // nomineeNameerror:  nomineeDetails.nomineeName === "" ? "Enter the nomineeName" : "",
      // relationerror: nomineeDetails.relation === "" ? "Enter the Relation" : "",
      // nomineeEmaileeror: nomineeDetails.nomineeEmail === "" ? "Enter the Nominee Email" : "",
      // nomineeMobileerror: nomineeDetails.nomineeMobile === "" ? "Enter the Nominee Mobile Number" : "",
      // accountNoerror: nomineeDetails.accountNo === "" ? "Enter the   Account No" : "",
      // emailerror: nomineeDetails.nomineeEmail === "" ? "Enter the Email" : "",
      // bankerror: nomineeDetails.bank === "" ? "Enter the bank" : "",
      // brancherror: nomineeDetails.branch === "" ? "Enter the accountNo" : "",
      // nomineecityerror: nomineeDetails.nomineecity === "" ? "Enter the nomineecity" : "",
    ) {
      console.log("suceess");

      const response = savenomineeDeatailsApi(nomineeDetails);
      response.then((data) => {
        if (data.request.status == 200) {
          Success("success", "Nominee Details Save Successfully");
        } else if (data.response.data.errorCode != "200") {
          WarningBackendApi("warning", data.response.data.errorMessage);
        }
      });
    } else {
      console.log("suceess1");
    }
  };
  const submitNomineeDetails = (event) => {
    event.preventDefault();
    if (nomineeDetails.isdeatail == true) {
      const response = savenomineeDeatailsApi(nomineeDetails);
      response.then((data) => {
        if (data.request.status == 200) {
          Success("success", "Nominee Details Save Successfully");
        } else if (data.response.data.errorCode != "200") {
          WarningBackendApi("warning", data.response.data.errorMessage);
        }
      });
    } else {
      WarningBackendApi("warning");
    }
  };

  const verifybankAccountCashfree = () => {
    setBankaccountProfile((bankaccountprofile) => ({
      ...bankaccountprofile,
      nameAtBankerror:
        bankaccountprofile.nameAtBank === "" ? "Enter the Name" : "",
      moblieNumbererror:
        bankaccountprofile.moblieNumber === "" ||
        bankaccountprofile.moblieNumber.length != 10
          ? "Enter 10 Digit Mobile Number "
          : "",
      accountNumbererror:
        bankaccountprofile.accountNumber === ""
          ? "Enter the Account Number"
          : "",
      confirmAccountNumbererror:
        bankaccountprofile.confirmAccountNumber === "" ||
        bankaccountprofile.confirmAccountNumber !==
          bankaccountprofile.accountNumber
          ? "Enter the Confirm Account Number"
          : "",
      ifscCodeerror:
        bankaccountprofile.ifscCode === "" ? "Enter the IFSC Code" : "",
      bankNameerror:
        bankaccountprofile.bankName === "" ? "Enter the Bank Name" : "",
      branchNameerror:
        bankaccountprofile.branchName === "" ? "Enter the Branch Name" : "",
      bankCityerror:
        bankaccountprofile.bankCity === "" ? "Enter the Bank City" : "",
    }));

    if (
      bankaccountprofile.moblieNumber !== null &&
      bankaccountprofile.moblieNumber !== "" &&
      bankaccountprofile.accountNumber !== null &&
      bankaccountprofile.accountNumber !== "" &&
      bankaccountprofile.confirmAccountNumber !== null &&
      bankaccountprofile.confirmAccountNumber !== "" &&
      bankaccountprofile.ifscCode !== null &&
      bankaccountprofile.ifscCode !== "" &&
      bankaccountprofile.bankName !== null &&
      bankaccountprofile.bankName !== "" &&
      bankaccountprofile.branchName !== null &&
      bankaccountprofile.branchName !== "" &&
      bankaccountprofile.confirmAccountNumbererror === "" &&
      bankaccountprofile.moblieNumber.length === 10 &&
      bankaccountprofile.bankCity !== null &&
      bankaccountprofile.bankCity !== ""
    ) {
      const response = verifyBankAccountAndIfsc(bankaccountprofile);
      response.then((data) => {
        if (data.request.status == 200) {
          if (data.data.status == "SUCCESS") {
            setdashboarddata({
              ...dashboarddata,
              verifyotpText: "Verifed IFSC",
              // submitbankdeatail: true,
              sendotpbtn: true,
            });

            setBankaccountProfile({
              ...bankaccountprofile,
              nameAtBank: data.data.data.nameAtBank,
              bankName: data.data.data.bankName,
              bankCity: data.data.data.city,
              branchName: data.data.data.branch,
            });
            toastrSuccess("Verifed BankAccount Ifsc");
          } else {
            WarningBackendApi("warning", data.data.message);
          }
        } else if (data.response.data.errorCode != "200") {
          WarningBackendApi("warning", data.response.data.errorMessage);
        }
      });
    } else {
      console.log("enter all input");
    }
  };

  useEffect(() => {
    const inputDate = moment(
      userProfile.dob,
      ["DD/MM/YYYY", "YYYY-MM-DD"],
      true
    );

    // Calculate today's date
    const today = moment();

    // Calculate the minimum date for someone to be 18 years old
    const minDate = moment().subtract(18, "years");

    // Check if the input date is valid and the user is at least 18 years old
    setUserProfile((prevProfile) => {
      if (inputDate.isValid() && inputDate.isSameOrBefore(minDate)) {
        return {
          ...prevProfile,
          doberror: "", // Clear error message
        };
      } else {
        return {
          ...prevProfile,
          doberror: "You must be at least 18 years old",
        };
      }
    });
  }, [userProfile.dob]);
  const handlefileupload = (event) => {
    const response = uploadkyc(event);
    response
      .then((data) => {
        if (data && data.request && data.request.status === 200) {
          setKyc((prevKyc) => ({
            ...prevKyc,
            isValid: !prevKyc.isValid,
          }));
          Success("success", `${event.target.name} Uploaded Successfully`);
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

  useEffect(() => {
    // Check state for numbers
    if (/\d/.test(userProfile.state)) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        stateerror: "Enter characters only!",
      }));
    } else {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        stateerror: "",
      }));
    }

    // Check city for numbers
    if (/\d/.test(userProfile.city)) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        cityerror: "Enter characters only!",
      }));
    } else {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        cityerror: "",
      }));
    }

    if (/\d/.test(nomineeDetails.nomineeName)) {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        nomineeNameerror: "Enter characters only!",
      }));
    } else {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        nomineeNameerror: "",
      }));
    }

    if (/\d/.test(nomineeDetails.relation)) {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        relationerror: "Enter characters only!",
      }));
    } else {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        relationerror: "",
      }));
    }

    if (/\d/.test(nomineeDetails.bank)) {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        bankerror: "Enter characters only!",
      }));
    } else {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        bankerror: "",
      }));
    }

    if (/\d/.test(nomineeDetails.nomineecity)) {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        nomineecityerror: "Enter characters only!",
      }));
    } else {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        nomineecityerror: "",
      }));
    }

    if (/\d/.test(userProfile.lastName)) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        lastNamerror: "Enter characters only!",
      }));
    } else {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        lastNamerror: "",
      }));
    }

    if (
      /^\d+$/.test(userProfile.mobileNumber) ||
      userProfile.mobileNumber === "" ||
      userProfile.mobileNumber === null
    ) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        mobileNumbererror: "",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,

        mobileNumbererror: "Enter digits only!",
      }));
    }

    if (
      /^\d+$/.test(userProfile.whatsAppNumber) ||
      userProfile.whatsAppNumber === "" ||
      userProfile.whatsAppNumber === null
    ) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        whatsAppNumbererror: "",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,

        whatsAppNumbererror: "Enter digits only!",
      }));
    }
    if (
      /^\d+$/.test(userProfile.aadharNumber) ||
      userProfile.aadharNumber === "" ||
      userProfile.aadharNumber === null
    ) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        aadhaarNumbererror: "",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,

        aadhaarNumbererror: "Enter digits only!",
      }));
    }

    if (/\d/.test(userProfile.fatherName)) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        fatherNameerror: "Enter characters only!",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        fatherNameerror: "",
      }));
    }

    if (/\d/.test(userProfile.city)) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        cityer: "Enter characters only!",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        cityer: "",
      }));
    }

    if (/\d/.test(bankaccountprofile.bankCity)) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        bankCityerror: "Enter characters only!",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        bankCityerror: "",
      }));
    }

    if (/\d/.test(bankaccountprofile.branchName)) {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        branchNameerror: "Enter characters only!",
      }));
    } else {
      setUserProfile((prevDetails) => ({
        ...prevDetails,
        branchNameerror: "",
      }));
    }

    if (
      /^\d+$/.test(nomineeDetails.nomineeMobile) ||
      nomineeDetails.nomineeMobile === "" ||
      nomineeDetails.nomineeMobile === null
    ) {
      // Nominee mobile contains only digits or is empty or null
      console.log(nomineeDetails.nomineeMobile);
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        nomineeMobileerror: "", // No error
      }));
    } else {
      // Nominee mobile contains non-digit characters
      console.log(nomineeDetails.nomineeMobile);
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        nomineeMobileerror: "Enter digits only!",
      }));
    }

    if (
      /^\d+$/.test(nomineeDetails.accountNo) ||
      nomineeDetails.accountNo === "" ||
      nomineeDetails.accountNo === null
    ) {
      // Nominee mobile contains only digits or is empty or null
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        accountNoerror: "", // No error
      }));
    } else {
      // Nominee mobile contains non-digit characters
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        accountNoerror: "Enter digits only!",
      }));
    }

    if (
      /^\d+$/.test(bankaccountprofile.moblieNumber) ||
      bankaccountprofile.moblieNumber === "" ||
      bankaccountprofile.moblieNumber === null
    ) {
      setBankaccountProfile((prevDetails) => ({
        ...prevDetails,
        moblieNumbererror: "",
      }));
    } else {
      setBankaccountProfile((prevDetails) => ({
        ...prevDetails,
        moblieNumbererror: "Enter digits only!",
      }));
    }

    if (/\d/.test(bankaccountprofile.bankCity)) {
      setBankaccountProfile((prevDetails) => ({
        ...prevDetails,
        bankCityerror: "Enter characters only!",
      }));
    } else {
      setBankaccountProfile((prevDetails) => ({
        ...prevDetails,
        bankCityerror: "",
      }));
    }

    if (/\d/.test(nomineeDetails.branch)) {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        brancherror: "Enter characters only!",
      }));
    } else {
      setnomineeDetails((prevDetails) => ({
        ...prevDetails,
        brancherror: "",
      }));
    }
  }, [
    userProfile.state,
    userProfile.lastName,
    userProfile.aadharNumber,
    userProfile.fatherName,
    userProfile.city,
    nomineeDetails.nomineeName,
    nomineeDetails.relation,
    bankaccountprofile.moblieNumber,
    userProfile.whatsAppNumber,
    nomineeDetails.accountNo,
    nomineeDetails.bank,
    nomineeDetails.nomineecity,
    userProfile.mobileNumber,
    userProfile.city,
    nomineeDetails.nomineeMobile,
    nomineeDetails.branch,
    nomineeDetails.accountN,
    bankaccountprofile.bankCity,
  ]);

  const handlechange = (event) => {
    const { name, value } = event.target;

    if (name === "pinCode") {
      // Validate input to allow only numeric characters
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      // Limit the input to 6 digits
      const updatedValue = numericValue.slice(0, 6);
      if (updatedValue.length !== 6) {
        // Check against the expected length of 6 digits
        setUserProfile({
          ...userProfile,
          pinCodeError: "PIN code must be exactly 6 digits long",
          [name]: updatedValue,
        });
        return; // Exit the function early to prevent setting state again
      }

      // Only proceed with API call if pin code is exactly 6 digits long
    }

    // Calculate today's date
    const today = new Date();

    // Calculate the minimum date for someone to be 18 years old
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    // Convert the input value to a Date object
    const inputDate = new Date(value);

    // Check if the input date is valid and the user is at least 18 years old
    if (!isNaN(inputDate.getTime()) && inputDate <= minDate) {
      setUserProfile({
        ...userProfile,
        [name]: value,
        doberror: "", // Clear error message
      });
    } else {
      setUserProfile({
        ...userProfile,
        [name]: value,
        doberror: "You must be at least 18 years old",
      });
    }

    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handlePaste = (event) => {
    event.preventDefault();
    // alert('Copying and pasting is disabled for this field.');
    setnomineeDetails({
      ...nomineeDetails,
      copyerror: "Copying and pasting is disabled for this field.",
    });
  };

  const handleCopy = (event) => {
    event.preventDefault();
    // alert('Copying and pasting is disabled for this field.');
    setnomineeDetails({
      ...nomineeDetails,
      copyerror: "Copying and pasting is disabled for this field.",
    });
  };

  const handleprofileUpdate = () => {
    setUserProfile({
      ...userProfile,
      addresserror:
        userProfile.address === "" ? "Please enter the address" : "",
      cityer: userProfile.city === ("" || null) ? "Please enter the city" : "",
      doberror: userProfile.dob === "" ? "Please enter the dob" : "",
      fatherNameerror:
        userProfile.fatherName === "" ? "Please enter the father Name" : "",
      firstNamrror:
        userProfile.firstName === "" ? "Please enter the first Name" : "",
      panNumbererror:
        userProfile.panNumber === "" ? "Please enter the panNumber" : "",

      permanentAddresserror:
        userProfile.permanentAddress === ""
          ? "Please Enter The Residence Address"
          : "",
      cityer: userProfile.city === "" ? "Please Enter The city" : "",
      pinCodeerror:
        userProfile.pinCode === "" ? "Please Enter The Pincode" : "",
      stateerror: userProfile.state === "" ? "Please Enter The State" : "",
      whatsAppNumbererror:
        userProfile.whatsAppNumber === "" ||
        userProfile.whatsAppNumber.length < 10
          ? " WhatsApp Number should be 10 digits"
          : "",
  

      mobileNumbererror:
        userProfile.mobileNumber === "" || userProfile.mobileNumber.length < 10
          ? " MobileNumber should be 10 digits"
          : "",
      emailerror: userProfile.email === "" ? "Please Enter The Email" : "",
    });

    if (
      userProfile.email !== null &&
      userProfile.email !== "" &&
      userProfile.firstName !== null &&
      userProfile.firstName !== "" &&
      userProfile.doberror === "" &&
      userProfile.mobileNumber !== null &&
      userProfile.mobileNumber !== "" &&
      userProfile.mobileNumber.length > 10 &&
      userProfile.whatsAppNumber !== null &&
      userProfile.whatsAppNumber !== "" &&
      userProfile.pinCode !== null &&
      userProfile.pinCode !== "" &&
      userProfile.fatherName !== null &&
      userProfile.fatherName !== "" &&
      userProfile.state !== null &&
      userProfile.state !== "" &&
      userProfile.panNumber !== null &&
      userProfile.panNumber !== "" &&
      userProfile.address !== null &&
      userProfile.address !== "" &&
      userProfile.city !== null &&
      userProfile.city !== ""
    ) {
      console.log("sucss");
      const response = profileupadate(userProfile);
      response.then((data) => {
        if (data.request.status == 200) {
          Success("success", "Personal Details Save Successfully");
        } else if (data.response.data.errorCode != "200") {
          WarningBackendApi("warning", data.response.data.errorMessage);
        }
      });
    } else {
      toastrWarning("fill the mandatory fields");
    }
  };

  const sendotp = async () => {
    setBankaccountProfile((bankaccountprofile) => ({
      ...bankaccountprofile,
      moblieNumbererror:
        bankaccountprofile.moblieNumber === "" ||
        bankaccountprofile.moblieNumber.length != 10
          ? "Enter 10 Digit Mobile Number "
          : "",
    }));

    if (
      bankaccountprofile.moblieNumber !== null &&
      bankaccountprofile.moblieNumber !== "" &&
      bankaccountprofile.moblieNumber.length == 10
    ) {
      console.log("valid");

      const response = await sendMoblieOtp(bankaccountprofile);
      if (response.request.status === 200) {
        setdashboarddata({
          ...dashboarddata,
          sendotpbtn: true,
          verifyotp: true,
          sendotpbtnText: "ReSend OTP",
          sendOtpsession: response.data.mobileOtpSession,
          isValid: true,
          submitbankdeatail: true,
        });

        setBankaccountProfile({
          ...bankaccountprofile,
          mobileOtpSession: response.data.mobileOtpSession,
        });

        toastrSuccess("Otp Sent Successfully!", "top-right");
      } else {
        toastrWarning(response.response.data.errorMessage);
      }
    } else {
      console.log("fill the form");
    }

    // verifybankAccountCashfree();
  };

  useEffect(() => {
    if (userProfile.pinCode.length == 6) {
      const response = handlepincodeapicall(userProfile.pinCode);
      response
        .then((data) => {
          if (data.request.status === 200 && data.data !== "") {
            setUserProfile({
              ...userProfile,
              state: data.data.state,
              city: data.data.city,
            });
          }
        })
        .catch((error) => {
          console.error("Error occurred during API call:", error);
          // Handle error if necessary
        });
    }
  }, [userProfile.pinCode]);
  const openTheActiveTabs = (type) => {
    var i, j;
    let tablinks = document.getElementsByClassName("nav-link");
    let tapPan = document.getElementsByClassName("tab-pane");

    for (i = 0; i < tablinks.length; i++) {
      if (tablinks[i].classList.contains(type)) {
        tablinks[i].classList.add("active");
      } else {
        tablinks[i].classList.remove("active");
      }
    }

    for (j = 0; j < tapPan.length; j++) {
      if (tapPan[j].classList.contains(type)) {
        tapPan[j].classList.add("active");
        tapPan[j].classList.add("show");
      } else {
        tapPan[j].classList.remove("active");
        tapPan[j].classList.remove("show");
      }
    }
  };

  useEffect(() => {
    const nomineresponse = loadlendernomineeDetails();
    nomineresponse.then((data) => {
      if (data.request.status == 200) {
        setnomineeDetails({
          ...nomineeDetails,
          nomineeName: data.data.name == null ? "" : data.data.name,
          relation: data.data.relation == null ? "" : data.data.relation,
          nomineeEmail: data.data.emial == null ? "" : data.data.emial,
          nomineeMobile:
            data.data.mobileNumber == null ? "" : data.data.mobileNumber,
          accountNo:
            data.data.accountNumber == null ? "" : data.data.accountNumber,
          nomineeIfsc: data.data.ifscCode == null ? "" : data.data.ifscCode,
          bank: data.data.bankName == null ? "" : data.data.bankName,
          branch: data.data.branchName == null ? "" : data.data.branchName,
          nomineecity: data.data.city == null ? "" : data.data.city,
        });
      }
    });
  }, []);

  useEffect(() => {
    getUserDetails().then((data) => {
      localStorage.setItem("userType", data.data.userDisplayId);
      setdashboarddata({
        ...dashboarddata,
        profileData: data,
      });
      setUserProfile({
        ...userProfile,
        address: data.data.address,
        city: data.data.city,
        dob: data.data.dob,
        facebookUrl: data.data.urlsDto.faceBookUrl,
        fatherName: data.data.fatherName,
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        linkedinUrl: data.data.urlsDto.linkdinUrl,
        locality: data.data.locality,
        middleName: data.data.middleName,
        panNumber: data.data.panNumber,
        permanentAddress: data.data.permanentAddress,
        pinCode: data.data.pinCode,
        state: data.data.state,
        twitterUrl: data.data.urlsDto.twitterUrl,
        whatsAppNumber: data.data.whatsAppNumber,
        aadharNumber: data.data.aadharNumber,
        mobileNumber: data.data.mobileNumber,
        email: data.data.email,
      });
      setBankaccountProfile({
        ...bankaccountprofile,
        accountNumber: data.data.accountNumber,
        bankAddress: data.data.bankAddress,
        bankName: data.data.bankName,
        branchName: data.data.branchName,
        confirmAccountNumber: data.data.accountNumber,
        ifscCode: data.data.ifscCode,
        nameAtBank: data.data.userName,
        bankCity: data.data.bankAddress,
        moblieNumber: data.data.mobileNumber,
      });
    });
  }, []);

  useEffect(() => {
    const fetchApiData1 = () => {
      return getPanDoc();
    };
    const fetchApiData2 = () => {
      return getdataPassport();
    };
    const fetchApiData3 = () => {
      return getdatachequeLeaf();
    };
    const fetchApiData4 = () => {
      return getdataDrivingLicence();
    };
    const fetchApiData5 = () => {
      return getdataVoterId();
    };
    const fetchApiData6 = () => {
      return getdataAadhar();
    };

    Promise.all([
      fetchApiData1(),
      fetchApiData2(),
      fetchApiData3(),
      fetchApiData4(),
      fetchApiData5(),
      fetchApiData6(),
    ])
      .then((responses) => {
        setKyc({
          ...kyc,
          PanCard: responses[0].data,
          Passport: responses[1].data,
          CHEQUELEAF: responses[2].data,
          DRIVINGLICENCE: responses[3].data,
          VOTERID: responses[4].data,
          aadhar: responses[5].data,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [kyc.isValid]);

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
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Profile</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Profile</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <div className="col-md-12">
                <div className="profile-header">
                  <div className="row align-items-center">
                    <div className="col-auto profile-image">
                      <Link to="#">
                        <img
                          className="rounded-circle"
                          alt="User Image"
                          src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-512.png"
                        />
                      </Link>
                    </div>
                    <div className="col ms-md-n2 profile-user-info">
                      <h4 className="user-name mb-0">
                        {reduxStoreData.length != 0
                          ? reduxStoreData.firstName
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.firstName
                          : ""}
                      </h4>
                      <h6 className="text-muted">
                        LR
                        {reduxStoreData.length != 0
                          ? reduxStoreData.userId
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.userId
                          : "LR18"}
                        {`, ${
                          reduxStoreData.length != 0
                            ? reduxStoreData.groupName
                            : dashboarddata.profileData != null
                            ? dashboarddata.profileData.data.groupName
                            : "NewLender"
                        }`}
                      </h6>
                      <div className="user-Location">
                        <i className="fas fa-map-marker-alt" />{" "}
                        {reduxStoreData.length != 0
                          ? reduxStoreData.city
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.city
                          : ""}
                      </div>
                      <div className="about-text">
                        {reduxStoreData.length != 0
                          ? reduxStoreData.address
                          : dashboarddata.profileData != null
                          ? dashboarddata.profileData.data.address
                          : ""}
                      </div>

                      {reduxStoreData.groupName != "NewLender" &&
                      reduxStoreDataDashboard?.validityDate != null ? (
                        <div className="user-Location my-1">
                          <i className="fa-solid fa-calendar-days" /> Validity :
                          {reduxStoreDataDashboard.validityDate}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-auto profile-btn">
                      <Link
                        className="btn btn-primary"
                        to="#"
                        onClick={(e) => {
                          openTheActiveTabs("Personal");
                        }}
                      >
                        <i className="far fa-edit me-1" /> Edit
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="profile-menu">
                  <ul className="nav nav-tabs nav-tabs-solid">
                    <li className="nav-item">
                      <Link
                        className="nav-link About active"
                        data-bs-toggle="tab"
                        to="#per_details_tab"
                      >
                        <i className="fa-regular fa-address-card"></i> About
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Personal"
                        data-bs-toggle="tab"
                        to="#profile_tab"
                      >
                        <i className="fa-regular fa-user"></i> Profile Details
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link Bank"
                        data-bs-toggle="tab"
                        to="#bankAccount_tab"
                      >
                        <i className="fa-solid fa-building-columns"></i> Bank
                        Account Details
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Nominee"
                        data-bs-toggle="tab"
                        to="#nominee_tab"
                      >
                        <i className="fa-solid fa-user-plus"></i> Nominee
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link Kyc"
                        data-bs-toggle="tab"
                        to="#uploadKyc_tab"
                      >
                        <i className="fa-solid fa-upload"></i> Upload KYC
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="tab-content profile-tab-cont">
                  {/* Personal Details Tab */}
                  <div
                    className="tab-pane fade show active"
                    id="per_details_tab"
                  >
                    {/* Personal Details */}
                    <div className="row">
                      <div className="col-lg-9">
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Personal Details</span>

                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Personal");
                                }}
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Name
                              </p>
                              <p className="col-sm-9">
                                {reduxStoreData.firstName}
                              </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Date of Birth
                              </p>
                              <p className="col-sm-9">{reduxStoreData.dob}</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Email ID
                              </p>
                              <p className="col-sm-9">{reduxStoreData.email}</p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
                                Mobile
                              </p>
                              <p className="col-sm-9">
                                {reduxStoreData.mobileNumber}
                              </p>
                            </div>
                            <div className="row">
                              <p className="col-sm-3 text-muted text-sm-end mb-0">
                                Address
                              </p>
                              <p className="col-sm-9 mb-0">
                                {reduxStoreData.address}
                                <br />

                                {reduxStoreData.city}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        {/* Account Status */}
                        <div className="card">
                          <div className="card-body profile-blog">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Bank Account</span>
                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Bank");
                                }}
                              >
                                <i className="far fa-edit me-1" /> Edit
                              </Link>
                            </h5>
                          </div>
                        </div>
                        {/* /Account Status */}
                        {/* Skills */}
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>KYC </span>
                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Kyc");
                                }}
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                          </div>
                        </div>
                        {/* /Skills */}
                        <div className="card">
                          <div className="card-body">
                            <h5 className="card-title d-flex justify-content-between">
                              <span>Nominee </span>
                              <Link
                                className="edit-link"
                                to="#"
                                onClick={(e) => {
                                  openTheActiveTabs("Nominee");
                                }}
                              >
                                <i className="far fa-edit me-1" />
                                Edit
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Personal Details */}
                  </div>
                  {/* /Personal Details Tab */}
                  {/* Change Password Tab */}
                  <div id="bankAccount_tab" className="tab-pane fade Bank">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Bank Account Details</h5>
                        <br />
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <div className="row">
                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Name as Per Bank
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=" Enter your Name"
                                  name="nameAtBank"
                                  onKeyPress={handleKeyPress}
                                  onChange={handlebankchange}
                                  value={bankaccountprofile.nameAtBank}
                                />
                                {bankaccountprofile.nameAtBankerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.nameAtBankerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Account Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="accountNumber"
                                  onChange={handlebankchange}
                                  placeholder=" Enter your Account Number"
                                  maxLength={16}
                                  value={bankaccountprofile.accountNumber}
                                />
                                {bankaccountprofile.accountNumbererror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.accountNumbererror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Confirm Account Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="confirmAccountNumber"
                                  onChange={handlebankchange}
                                  placeholder="Enter Confirm Account Number"
                                  onPaste={handlePaste}
                                  maxLength={16}
                                  onCopy={handleCopy}
                                  value={
                                    bankaccountprofile.confirmAccountNumber
                                  }
                                />
                                {bankaccountprofile.bankAccountError && (
                                  <span className="login-danger">
                                    {bankaccountprofile.bankAccountError}
                                  </span>
                                )}
                                {nomineeDetails.copyerror && (
                                  <span className="login-danger">
                                    {nomineeDetails.copyerror}
                                  </span>
                                )}
                                {bankaccountprofile.confirmAccountNumbererror && (
                                  <div className="text-danger">
                                    {
                                      bankaccountprofile.confirmAccountNumbererror
                                    }
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  IFSC Code
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="ifscCode"
                                  onChange={handlebankchange}
                                  placeholder=" Enter your IFSC Code"
                                  maxLength={12}
                                  value={bankaccountprofile.ifscCode}
                                />
                                {bankaccountprofile.ifscCodeerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.ifscCodeerror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Bank Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bankName"
                                  onChange={handlebankchange}
                                  onKeyPress={handleKeyPress}
                                  placeholder=" Enter your Bank Name"
                                  value={bankaccountprofile.bankName}
                                />
                                {bankaccountprofile.bankNameerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.bankNameerror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Branch
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="branchName"
                                  placeholder=" Enter your Branch"
                                  onKeyPress={handleKeyPress}
                                  onChange={handlebankchange}
                                  value={bankaccountprofile.branchName}
                                />
                                {bankaccountprofile.branchNameerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.branchNameerror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Bank city{" "}
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="bankCity"
                                  placeholder=" Enter your Bank City"
                                  onChange={handlebankchange}
                                  onKeyPress={handleKeyPress}
                                  value={bankaccountprofile.bankCity}
                                />
                                {bankaccountprofile.bankCityerror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.bankCityerror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-4 local-forms">
                                <label>
                                  Mobile Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  name="moblieNumber"
                                  placeholder=" Enter your Mobile Number"
                                  onChange={handlebankchange}
                                  maxLength={10}
                                  value={bankaccountprofile.moblieNumber}
                                />
                                {bankaccountprofile.moblieNumbererror && (
                                  <div className="text-danger">
                                    {bankaccountprofile.moblieNumbererror}
                                  </div>
                                )}
                              </div>

                              {dashboarddata.isValid && (
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Otp <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    name="mobileOtp"
                                    placeholder=" Enter your Mobile otp"
                                    onChange={handlebankchange}
                                    value={bankaccountprofile.mobileOtp}
                                    maxLength={6}
                                  />
                                </div>
                              )}

                              <div className="col-12 row">
                                {dashboarddata.verifyotp && (
                                  <>
                                    <button
                                      className="btn btn-warning col-md-2 mx-2"
                                      style={{ color: "white" }}
                                      type="submit"
                                      onClick={verifybankAccountCashfree}
                                    >
                                      {/* {dashboarddata.verifyotpText} */}
                                      Verify IFSC
                                    </button>
                                  </>
                                )}
                                {dashboarddata.sendotpbtn && (
                                  <button
                                    className="btn btn-secondary col-md-2 mx-2"
                                    type="submit"
                                    onClick={sendotp}
                                  >
                                    {dashboarddata.sendotpbtnText}
                                  </button>
                                )}

                                {dashboarddata.submitbankdeatail && (
                                  <button
                                    className="btn btn-success col-md-2 mx-2"
                                    type="submit"
                                    onClick={savebankdetailsProfile}
                                  >
                                    Save Details
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Change Password Tab */}
                  {/* Change Nominee Tab */}
                  <div id="nominee_tab" className="tab-pane fade Nominee">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Nominee Details</h5>
                        <br />
                        <div className="row">
                          <div className="col-md-12 col-lg-12">
                            <form action="#">
                              <div className="row">
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Name
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Enter your Nominee Name"
                                    onKeyPress={handleKeyPress}
                                    value={nomineeDetails.nomineeName}
                                    name="nomineeName"
                                    onChange={handlerNominee}
                                  />
                                  {nomineeDetails.nomineeNameerror && (
                                    <div className="error">
                                      {nomineeDetails.nomineeNameerror}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Relation
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Enter your  Relation"
                                    onKeyPress={handleKeyPress}
                                    value={nomineeDetails.relation}
                                    name="relation"
                                    onChange={handlerNominee}
                                  />
                                  {nomineeDetails.relationerror && (
                                    <div className="error">
                                      {nomineeDetails.relationerror}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Email
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    placeholder=" Enter  Nominee Email"
                                    value={nomineeDetails.nomineeEmail}
                                    name="nomineeEmail"
                                    onChange={handlerNominee}
                                  />
                                  {nomineeDetails.nomineeEmaileeror && (
                                    <div className="error">
                                      {nomineeDetails.nomineeEmaileeror}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Mobile Number
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    maxLength={10}
                                    className="form-control"
                                    placeholder=" Enter  Nominee mobile no "
                                    value={nomineeDetails.nomineeMobile}
                                    name="nomineeMobile"
                                    onChange={handlerNominee}
                                  />

                                  {nomineeDetails.nomineeMobileerror && (
                                    <div className="error">
                                      {nomineeDetails.nomineeMobileerror}
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Account No
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="  Nominee Name Account No"
                                    value={nomineeDetails.accountNo}
                                    name="accountNo"
                                    maxLength={18}
                                    onChange={handlerNominee}
                                  />
                                  {nomineeDetails.accountNoerror && (
                                    <div className="error">
                                      {nomineeDetails.accountNoerror}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee IFSC Code
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Nominee IFSC Code"
                                    value={nomineeDetails.nomineeIfsc}
                                    name="nomineeIfsc"
                                    maxLength={11}
                                    onChange={handlerNominee}
                                  />
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee Bank Name
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Nominee Bank Name"
                                    onKeyPress={handleKeyPress}
                                    value={nomineeDetails.bank}
                                    name="bank"
                                    onChange={handlerNominee}
                                  />

                                  {nomineeDetails.bankerror && (
                                    <div className="error">
                                      {nomineeDetails.bankerror}
                                    </div>
                                  )}
                                </div>

                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Nominee City
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=" Nominee City Name"
                                    onKeyPress={handleKeyPress}
                                    value={nomineeDetails.nomineecity}
                                    name="nomineecity"
                                    onChange={handlerNominee}
                                  />
                                  {nomineeDetails.nomineecityerror && (
                                    <div className="error">
                                      {nomineeDetails.nomineecityerror}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group col-12 col-md-4 local-forms">
                                  <label>
                                    Branch
                                    <span className="login-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nominee Branch"
                                    onKeyPress={handleKeyPress}
                                    value={nomineeDetails.branch}
                                    name="branch"
                                    onChange={handlerNominee}
                                  />
                                  {nomineeDetails.brancherror && (
                                    <div className="error">
                                      {nomineeDetails.brancherror}
                                    </div>
                                  )}
                                </div>

                                <div className="row col-12">
                                  <button
                                    className="btn btn-success col-12 col-md-2"
                                    type="submit"
                                    // disabled={nomineeDetails.isbtndisable}

                                    onClick={() => handleNomineeclick(event)}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Change Nominee Tab */}
                  {/* ///profile Tab */}
                  <div id="profile_tab" className="tab-pane fade Personal">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Personal Details</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                            <div className="row mt-3">
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  First Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter First Name"
                                  onKeyPress={handleKeyPress}
                                  onChange={handlechange}
                                  value={userProfile.firstName}
                                  name="firstName"
                                />
                                {userProfile.firstNamrror && (
                                  <div className="text-danger">
                                    {userProfile.firstNamrror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Last Name
                                  <span className="login-danger"></span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Last Name"
                                  onKeyPress={handleKeyPress}
                                  onChange={handlechange}
                                  value={userProfile.lastName}
                                  name="lastName"
                                />
                                {userProfile.lastNamerror && (
                                  <div className="text-danger">
                                    {userProfile.lastNamerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Pan Number
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter PAN Number"
                                  onChange={handlechange}
                                  value={userProfile.panNumber}
                                  maxLength={10}
                                  name="panNumber"
                                />

                                {userProfile.panNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.panNumbererror}
                                  </div> 
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Aadhaar Number
                                  <span className="login-danger"></span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control"
                                  placeholder="Enter Aadhaar Number"
                                  onChange={handlechange}
                                  value={userProfile.aadharNumber}
                                  maxLength={12}
                                  name="aadharNumber"
                                />
                                {userProfile.aadhaarNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.aadhaarNumbererror}
                                  </div>
                                )}
                                {/* {userProfile.aadharerror != "" ? (
                                  <div className="error">
                                    {userProfile.aadharerror}
                                  </div>
                                ) : (
                                  <></>
                                )} */}
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Date of Birth
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type={userProfile.dob == "" ? "date" : "text"}
                                  className="form-control "
                                  onChange={handlechange}
                                  value={userProfile.dob}
                                  name="dob"
                                  max={new Date().toISOString().split("T")[0]}
                                />

                                {userProfile.doberror && (
                                  <div className="text-danger">
                                    {userProfile.doberror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Father Name
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  onKeyPress={handleKeyPress}
                                  placeholder="Enter Father Name"
                                  onChange={handlechange}
                                  value={userProfile.fatherName}
                                  name="fatherName"
                                />
                                {userProfile.fatherNameerror && (
                                  <div className="text-danger">
                                    {userProfile.fatherNameerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Mobile No
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  maxLength={10}
                                  className="form-control"
                                  placeholder="Enter Mobile Name"
                                  onChange={handlechange}
                                  value={userProfile.mobileNumber}
                                  name="mobileNumber"
                                />
                                {userProfile.mobileNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.mobileNumbererror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  WhatsApp No
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  maxLength={12}
                                  className="form-control"
                                  placeholder="Enter WhatsApp "
                                  onChange={handlechange}
                                  value={userProfile.whatsAppNumber}
                                  name="whatsAppNumber"
                                />
                                {userProfile.whatsAppNumbererror && (
                                  <div className="text-danger">
                                    {userProfile.whatsAppNumbererror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Email ID
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  placeholder="Enter Email Id"
                                  onChange={handlechange}
                                  value={userProfile.email}
                                  name="email"
                                />

                                {userProfile.emailerror && (
                                  <div className="text-danger">
                                    {userProfile.emailerror}
                                  </div>
                                )}
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Residence Address
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Residence Address"
                                  onChange={handlechange}
                                  value={userProfile.permanentAddress}
                                  name="permanentAddress"
                                />
                                {userProfile.permanentAddresserror && (
                                  <div className="text-danger">
                                    {userProfile.permanentAddresserror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Pin Code
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Enter Pincode"
                                  maxLength={6}
                                  onChange={handlechange}
                                  value={userProfile.pinCode}
                                  name="pinCode"
                                />
                                {userProfile.pinCodeerror && (
                                  <div className="text-danger">
                                    {userProfile.pinCodeerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Locality
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Locality "
                                  onChange={handlechange}
                                  value={userProfile.address}
                                  name="address"
                                />
                                {userProfile.addresserror && (
                                  <div className="text-danger">
                                    {userProfile.addresserror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  City <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter City "
                                  onKeyPress={handleKeyPress}
                                  onChange={handlechange}
                                  value={userProfile.city}
                                  name="city"
                                />
                                {userProfile.cityer && (
                                  <div className="text-danger">
                                    {userProfile.cityer}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  State
                                  <span className="login-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter State"
                                  onChange={handlechange}
                                  onKeyPress={handleKeyPress}
                                  value={userProfile.state}
                                  name="state"
                                />
                                {userProfile.stateerror && (
                                  <div className="text-danger">
                                    {userProfile.stateerror}
                                  </div>
                                )}
                              </div>
                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Facebook URL
                                  <span className="login-danger"></span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Facebook Url"
                                  onChange={handlechange}
                                  value={userProfile.facebookUrl}
                                  name="facebookUrl"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Twitter URL
                                  <span className="login-danger"></span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Twitter Url"
                                  onChange={handlechange}
                                  value={userProfile.twitterUrl}
                                  name="twitterUrl"
                                />
                              </div>

                              <div className="form-group col-12 col-sm-4 local-forms">
                                <label>
                                  Linkedin URL
                                  <span className="login-danger"></span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Linkedin  Url"
                                  onChange={handlechange}
                                  value={userProfile.linkedinUrl}
                                  name="linkedinUrl"
                                />
                              </div>
                              <div className="col-12 ">
                                <button
                                  className="btn btn-primary col-md-4 col-12"
                                  type="submit"
                                  onClick={handleprofileUpdate}
                                >
                                  Save Deatils
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ///profile Tab */}

                  {/* KycTab */}

                  <div id="uploadKyc_tab" className="tab-pane fade Kyc">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Upload KYC</h5>
                        <div className="row">
                          <div className="col-md-12 col-lg-12 row">
                            <div className="row mt-3">
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Pan Card <span className="star-red">*</span>
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    name="pan"
                                    id="pan"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label htmlFor="file" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.PanCard != undefined &&
                                kyc.PanCard != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.PanCard.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Pan</small>
                                  </h6>
                                )}
                              </div>

                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Cheque Leaf
                                  <span className="star-red">*</span>
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    name="CHEQUELEAF"
                                    accept="image/*"
                                    id="CHEQUELEAF"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label
                                    htmlFor="CHEQUELEAF"
                                    className="upload"
                                  >
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>
                                {kyc.CHEQUELEAF != undefined &&
                                kyc.CHEQUELEAF != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.CHEQUELEAF.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Cheque Leaf</small>
                                  </h6>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Aadhaar
                                  <span className="star-red">*</span>
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="aadhar"
                                    id="aadhar"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label htmlFor="aadhar" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.aadhar != undefined && kyc.aadhar != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.aadhar.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Aadhaar</small>
                                  </h6>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Driving License
                                  {/* <span className="star-red">*</span> */}
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    name="DRIVINGLICENCE"
                                    id="license"
                                    className="hide-input"
                                    onChange={handlefileupload}
                                  />
                                  <label htmlFor="license" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>
                                {kyc.DRIVINGLICENCE != undefined &&
                                kyc.DRIVINGLICENCE != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.DRIVINGLICENCE.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Driving License</small>
                                  </h6>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">Voter ID</p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    id="VOTERID"
                                    name="VOTERID"
                                    onChange={handlefileupload}
                                    className="hide-input"
                                  />
                                  <label htmlFor="VOTERID" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.VOTERID != undefined &&
                                kyc.VOTERID != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.VOTERID.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Voter Id</small>
                                  </h6>
                                )}
                              </div>
                              <div className="form-group col-12 col-md-6">
                                <p className="settings-label">
                                  Passport
                                  {/* <span className="star-red">*</span> */}
                                </p>
                                <div className="settings-btn">
                                  <input
                                    type="file"
                                    id="Passport"
                                    accept="image/*"
                                    name="Passport"
                                    onChange={handlefileupload}
                                    className="hide-input"
                                  />
                                  <label htmlFor="Passport" className="upload">
                                    <i className="feather-upload">
                                      <FeatherIcon icon="upload" />
                                    </i>
                                  </label>
                                </div>

                                {kyc.Passport != undefined &&
                                kyc.Passport != "" ? (
                                  <h6 className="settings-size text-success">
                                    <i className="fa-solid fa-check mx-lg-1 "></i>
                                    <small>{kyc.Passport.fileName}</small>
                                  </h6>
                                ) : (
                                  <h6 className="settings-size text-warning">
                                    <i className="fa-solid fa-upload mx-lg-1 "></i>
                                    <small>Upload Passport</small>
                                  </h6>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kyc Tab End */}
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

export default Profile;

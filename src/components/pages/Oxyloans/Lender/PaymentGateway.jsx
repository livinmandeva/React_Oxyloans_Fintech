import React, { useState, useEffect } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
// import "../Lender/payment";
// import { confirmbtn } from "./payment";

const PaymentGateway = () => {
  const [payment, setpaymentsession] = useState("");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const myorder = urlParams.get("myorder");

  const cashfree = Cashfree({
    mode: "sandbox", //or production
  });

  let checkoutOptions = {
    paymentSessionId:
      "session_MFTp8x5_5gb0JCY1JA_iDdLliB8bPb_mcnkqhVoFIjc3HOuQFwgEC0aPirPHflLuy2bgjUASeavHksM8JJjf1IHvSqExa2mvfTsA7qZ1GjC9",
    redirectTarget: "_self", //optional (_self or _blank)
  };

  const paymentordercreations = () => {
    cashfree.checkout(checkoutOptions);
  };

  useEffect(() => {
    if (myorder != null) {
      const getresponse = fetch(
        `https://sandbox.cashfree.com/pg/orders/${myorder}`,
        {
          method: "get",
          headers: {
            "x-client-id": "1385818e255507feae28462f3b185831",
            "x-client-secret": "311e3600dec6f631c1c56ec6b9d13d9ee7597c45",
            "x-api-version": "2023-08-01",
          },
        }
      );
    }
  }, [myorder]);

  // cashfree.checkout(checkoutOptions);
  // const cashfree = Cashfree({
  //   mode: "sandbox", //or production
  // });

  // let checkoutOptions = {
  //   paymentSessionId:
  //     "session_XFab81Ca2srKnJzOxG_iFii8ldMiDVQoonvtdmzTkQ-DRNOJHCM9lCmhIB7d0yS3eIkZ53bB-cmzuCTjs3rQ0id0UJ291SMPNMnsgxcdviLD",
  //   returnUrl:
  //     "https://www.p2pclub.oxyloans.com/paymentgateway?myorder={order_id}",
  // };

  // const cashfree = load({
  //   mode: "sandbox", //or production
  // });

  // let checkoutOptions = {
  //   paymentSessionId:
  //     "session__CERvsTjGwbCOMXsRHpMEXrowmSgvmcHeCvriFU0C5RafX9qLYOoLZkEYEG3D71_7GsH3AjR4HUIF8RbpX_b0Eb3fnS5HvUu2C-ROIBV03xS",
  //   returnUrl: "http://localhost:3000/paymentgateway",
  // };

  // const cashfree = Cashfree({
  //   mode: "sandbox", //or production
  // });

  const paymentordercreation = async () => {
    const postdata = {
      customer_details: {
        customer_id: "7018AAW812234",
        customer_email: "livinmandeva@gmail.com",
        customer_phone: "7569084614",
      },
      order_meta: {
        notify_url: "https://www.p2pclub.oxyloans.com/paymentgateway",
        return_url:
          "https://www.p2pclub.oxyloans.com/paymentgateway?myorder={order_id}",
      },
      order_amount: 20,
      order_currency: "INR",
    };

    const headers = {
      Accept: "application/json",
      "x-api-version": "2023-08-01",
      "Content-Type": "application/json",
      "x-client-id": "1385818e255507feae28462f3b185831",
      "x-client-secret": "311e3600dec6f631c1c56ec6b9d13d9ee7597c45",
    };

    const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(postdata),
    });

    const orderresponse = await response.json();
    console.log(orderresponse);
  };

  return (
    <div className="paymentgateway d-flex h-100 justify-content-center align-content-center w-100">
      <button
        className="btn btn-primary"
        id="btn-payment-gateway"
        onClick={paymentordercreations}
      >
        Gateway
      </button>
    </div>
  );
};

export default PaymentGateway;

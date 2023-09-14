import React, { useEffect, useState } from "react";

function OtpInput() {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "" ,""]);


  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);

      // Automatically move to the next input field on digit input
      if (value !== "" && index < 5) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const inputRefs = [];
useEffect(()=>{
    //  console.log(otpValues);
     localStorage.setItem("otp",otpValues)
     
},[otpValues])
  return (
    <div className="otp-field">
      {otpValues.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          ref={(input) => inputRefs.push(input)}
        />
      ))}
    </div>
  );
}

export default OtpInput;

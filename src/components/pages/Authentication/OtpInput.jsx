import React, { useEffect, useState, memo } from "react";

function OtpInput() {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const updatedOtpValues = [...otpValues];
      updatedOtpValues[index] = value;
      setOtpValues(updatedOtpValues);
      if (value !== "" && index < 5) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const inputRefs = [];
  useEffect(() => {
    localStorage.setItem("otp", otpValues);
  }, [otpValues]);

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

export default memo(OtpInput);

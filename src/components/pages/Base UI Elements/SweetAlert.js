import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { getNewSessionTime } from "../../HttpRequest/afterlogin";

export const HandleClick = () => {
  Swal.fire({
    title: "Any fool can use a computer",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const HandleWithTitle = () => {
  Swal.fire({
    title: "The Internet?,",
    text: "That thing is still around?",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const HandleWithFooter = (message) => {
  Swal.fire({
    type: "success",
    title: "Congratulation",
    text: message,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const topStart = () => {
  Swal.fire({
    position: "top-start",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const topEnd = () => {
  Swal.fire({
    position: "top-end",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const bottomStart = () => {
  Swal.fire({
    position: "bottom-start",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const bottomEnd = () => {
  Swal.fire({
    position: "bottom-end",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const Success = () => {
  Swal.fire({
    title: "Good job!",
    text: "You clicked the button!",
    type: "success",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const Info = () => {
  Swal.fire({
    title: "Info!",
    text: "You clicked the button!",
    type: "info",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const WarningAlert = (errorMessage, redirectTo) => {
  Swal.fire({
    title: "Warning!",
    text: errorMessage,
    type: "warning",
    showCancelButton: true,
    showDenyButton: true,
    confirmButtonText: "Login",
    denyButtonText: "Contine",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      window.location.href = `${redirectTo}`;
    } else if (result.isDenied) {
      getNewSessionTime();
      Swal.fire("Token!", "Your session has Generated.", "success");
    }
  });
};
export const Error = () => {
  Swal.fire({
    title: "Error!",
    text: " You clicked the button!",
    type: "error",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const autoClose = () => {
  var t;
  Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <strong></strong> seconds.",
    timer: 2e3,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
    onBeforeOpen: function () {
      Swal.showLoading(),
        (t = setInterval(function () {
          Swal.getContent().querySelector("strong").textContent =
            Swal.getTimerLeft();
        }, 100));
    },
    onClose: function () {
      clearInterval(t);
    },
  }).then(function (t) {
    t.dismiss === Swal.DismissReason.timer &&
      console.log("I was closed by the timer");
  });
};
export const outsideClick = () => {
  Swal.fire({
    title: "Click outside to close!",
    text: "This is a cool message!",
    allowOutsideClick: !0,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const Prompt = () => {
  Swal.fire({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: !0,
    progressSteps: ["1", "2", "3"],
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
    cancelButtonClass: "btn btn-danger ml-1",
  })
    .queue([
      { title: "Question 1", text: "Chaining swal2 modals is easy" },
      "Question 2",
      "Question 3",
    ])
    .then(function (t) {
      t.value &&
        Swal.fire({
          title: "All done!",
          html:
            "Your answers: <pre><code>" +
            JSON.stringify(t.value) +
            "</code></pre>",
          confirmButtonText: "Lovely!",
        });
    });
};
export const confirmText = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    confirmButtonClass: "btn btn-primary",
    cancelButtonClass: "btn btn-danger ml-1",
    buttonsStyling: !1,
  }).then(function (t) {
    t.value &&
      Swal.fire({
        type: "success",
        title: "Deleted!",
        text: "Your file has been deleted.",
        confirmButtonClass: "btn btn-success",
      });
  });
};
export const confirmColor = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    confirmButtonClass: "btn btn-primary",
    cancelButtonClass: "btn btn-danger ml-1",
    buttonsStyling: !1,
  }).then(function (t) {
    t.value
      ? Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        })
      : t.dismiss === Swal.DismissReason.cancel &&
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          type: "error",
          confirmButtonClass: "btn btn-success",
        });
  });
};

import axios from "axios";

const userisIn = "local";
let baseurl = (userisIn = "local"
  ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
  : "https://fintech.oxyloans.com/oxyloans/v1/user/");

const handleipv6 = () => {
  axios({
    method: "get",
    url: "https://ipapi.co/json/",
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleip4 = () => {
  axios({
    method: "get",
    url: "https://api.ipify.org/?format=json",
  })
    .then((res) => {
      console.log(res.data.ip);
    })
    .catch((error) => {
      console.log(error);
    });
};

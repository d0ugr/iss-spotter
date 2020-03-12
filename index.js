const { fetchMyIP } = require("./iss");

fetchMyIP((error, ipAddress) => {
  if (!error) {
    console.log(ipAddress);
  } else {
    console.log("fetchMyIP failed:", error);
  }
});

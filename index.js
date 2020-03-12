const { fetchMyIP } = require("./iss");

fetchMyIP((error, ipAddress) => {
  console.log(ipAddress);
});

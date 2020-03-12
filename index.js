const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ipAddress) => {
//   if (!error) {
//     console.log(ipAddress);
//   } else {
//     console.log("fetchMyIP failed:", error);
//   }
// });

console.log("Getting IP address...");
fetchMyIP((error, ipAddress) => {
  if (!error) {
    console.log(`Getting coordinates for ${ipAddress}...`);
    fetchCoordsByIP(ipAddress, (error, coords) => {
      if (!error) {
        fetchISSFlyOverTimes(coords, (error, result) => {
          if (!error) {
            console.log(result);
          } else {
            console.log(error);
          }
        });
      } else {
        console.log(error);
      }
    });
  } else {
    console.log("fetchMyIP failed:", error);
  }
});

// index2.js

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss-promised.js");

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body));

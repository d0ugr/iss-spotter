const { fetchMyIP, fetchCoordsByIP } = require("./iss-promised.js");

fetchMyIP()
  .then(fetchCoordsByIP)
  .then(body => console.log(body));

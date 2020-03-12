const { fetchMyIP } = require("./iss-promised.js");

fetchMyIP("https://api.ipify.org?format=json")
  .then(body => console.log(body));

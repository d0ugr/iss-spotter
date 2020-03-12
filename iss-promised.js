// iss_promised.js
const request = require("request-promise-native");

const fetchMyIP = function(url) {

  return request(url);

};

module.exports = { fetchMyIP };

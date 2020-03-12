// iss_promised.js

const request = require("request-promise-native");

const fetchMyIP = function() {

  return request("https://api.ipify.org?format=json");

};

const fetchCoordsByIP = function(body) {

  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);

};

const fetchISSFlyOverTimes = function(body) {

  let coords = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.data.latitude}&lon=${coords.data.longitude}`);

};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

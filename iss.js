const request = require("request");

const API_IPADDRESS = "https://api.ipify.org?format=json";
const API_GETCOORDS = "https://ipvigilante.com/";
const API_FLYOVER   = "http://api.open-notify.org/iss-pass.json";

const fetch = function(url, callback) {

  request(url, (error, response, body) => {
    if (!error) {
      if (response.statusCode === 200) {
        callback(null, body);
      } else {
        callback(Error(`request.statusCode: ${response && response.statusCode}`), null);
      }
    } else {
      callback(Error(`request error: ${error}`), null);
    }
  });

};

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {

  fetch(API_IPADDRESS, (error, body) => {
    if (!error) {
      callback(null, JSON.parse(body).ip);
    } else {
      callback(Error(`fetchMyIP: fetch failed: ${error}`), null);
    }
  });

};

const fetchCoordsByIP = function(ipAddress, callback) {

  fetch(`${API_GETCOORDS}${ipAddress}`, (error, body) => {
    if (!error) {
      let coords = JSON.parse(body);
      callback(null, {
        latitude:  coords.data.latitude,
        longitude: coords.data.longitude
      });
    } else {
      callback(Error(`fetchCoordsByIP: fetch failed: ${error}`), null);
    }
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {

  fetch(`${API_FLYOVER}?lat=${coords.latitude}&lon=${coords.longitude}`, (error, body) => {
    if (!error) {
      callback(null, body);
    } else {
      callback(Error(`fetchISSFlyOverTimes: fetch failed: ${error}`), null);
    }
  });

};



module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

const request = require("request");

const API_IPADDRESS = "https://api.ipify.org?format=json";
const API_GETCOORDS = "https://ipvigilante.com/";
const API_FLYOVER   = "http://api.open-notify.org/iss-pass.json";



const unixTimestampToDate = function(timestamp) {

  return new Date(timestamp * 1000);

}

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

/**
 * Makes a single API request to retrieve the coordinates of a given IP address.
 * Input:
 *   - A callback (to pass back an error or the coordinates)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The coordinates as an object (null if error). Example: "{ latitude: '43.84860', longitude: '-79.26170' }"
 */
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

/**
 * Makes a single API request to retrieve estimated ISS flyover times given coordinates of a location on Earth.
 * Input:
 *   - A callback (to pass back an error or the coordinates)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The flyover times as an object (null if error).
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  fetch(`${API_FLYOVER}?lat=${coords.latitude}&lon=${coords.longitude}`, (error, body) => {
    if (!error) {
      callback(null, JSON.parse(body));
    } else {
      callback(Error(`fetchISSFlyOverTimes: fetch failed: ${error}`), null);
    }
  });

};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function() {

  console.log("Getting IP address...");
  fetchMyIP((error, ipAddress) => {
    if (!error) {
      console.log(`Getting coordinates for ${ipAddress}...`);
      fetchCoordsByIP(ipAddress, (error, coords) => {
        if (!error) {
          console.log(`Getting flyover times ${coords}...`);
          fetchISSFlyOverTimes(coords, (error, result) => {
            if (!error) {
              for (const flyover of result.response) {
                console.log(`Next pass at ${unixTimestampToDate(flyover.risetime)} for ${flyover.duration} seconds`);
              }
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

};



module.exports = { nextISSTimesForMyLocation };

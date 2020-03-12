const request = require("request");

const API_IPADDRESS = "https://api.ipify.org?format=json";

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {

  request(API_IPADDRESS, (error, response, body) => {
    if (!error) {
      if (response.statusCode === 200) {
        callback(null, body);
      } else {
        callback(`request.statusCode: ${response && response.statusCode}`, null);
      }
    } else {
      callback(`request error: ${error}`, null);
    }
  });

};

module.exports = { fetchMyIP };

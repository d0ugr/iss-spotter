// index2.js

const { nextISSTimesForMyLocation } = require("./iss-promised.js");



const unixTimestampToDate = function(timestamp) {

  return new Date(timestamp * 1000);

};

const printFlyoverTimes = function(flyoverTimes) {

  for (const flyover of flyoverTimes) {
    console.log(`Next pass at ${unixTimestampToDate(flyover.risetime)} for ${flyover.duration} seconds`);
  }

};



nextISSTimesForMyLocation()
  .then(flyoverTimes => printFlyoverTimes(flyoverTimes))
  .catch((error) => {
    console.log("It didn't work:", error.message);
  });

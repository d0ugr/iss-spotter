// index.js

const { nextISSTimesForMyLocation } = require("./iss");



const unixTimestampToDate = function(timestamp) {

  return new Date(timestamp * 1000);

};

const printFlyoverTimes = function(flyoverTimes) {

  for (const flyover of flyoverTimes) {
    console.log(`Next pass at ${unixTimestampToDate(flyover.risetime)} for ${flyover.duration} seconds`);
  }

};



nextISSTimesForMyLocation((error, flyoverTimes) => {

  if (!error) {
    printFlyoverTimes(flyoverTimes);
  } else {
    console.log(`nextISSTimesForMyLocation failed: ${error}`);
  }

});

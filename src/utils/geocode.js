const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiaGFtb29uZWEiLCJhIjoiY2tpbTRjZnU4MHBrMTJxcTl2b2EwcHNwOSJ9.vdia3cPmrC3pWjnI_02xDg&limit=1";

  request(
    {
      json: true,
      url,
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect to the internet", undefined);
      } else if (body.message == "Not Found") {
        callback("You are having an error with your query", undefined);
      } else {
        callback(undefined, {
          lat: body.features[0].center[1],
          long: body.features[0].center[0],
          place: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geocode;

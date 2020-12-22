const request = require("request");

const forcast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=1df5d6344ef02426d5086e16f4915216&query=" +
    lat +
    "," +
    long +
    "&units=f";
  request(
    {
      json: true,
      url,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to connect to the internet", undefined);
      } else if (body.error) {
        callback(body.error.info, undefined);
      } else {
        callback(
          undefined,
          "It is currently " +
            body.current.weather_descriptions[0].toLowerCase() +
            " and " +
            body.current.temperature +
            " degrees out. It feels like " +
            body.current.feelslike +
            " degrees out and the humidity is " +
            body.current.humidity +
            "."
        );
      }
    }
  );
};

module.exports = forcast;

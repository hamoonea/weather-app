const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forcast = require("./utils/forcast.js");

const port = process.env.PORT || 3000

const app = express();

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");
app.set("views", viewsDirectory);

app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Iftekhar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Iftekhar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Iftekhar",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "No address query" });
  }
  geocode(address, (error, { lat, long, place }) => {
    if (error) {
      return res.send({ error: "Geocoding problem" });
    }
    forcast(lat, long, (error, data) => {
      if (error) {
        return res.send({ error: "Forcasting problem" });
      }
      console.log(place);
      res.send({
        location: address,
        forcast: data,
        place
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Iftehkar",
    message: "Help article does not exist",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Iftehkar",
    message: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server started");
});

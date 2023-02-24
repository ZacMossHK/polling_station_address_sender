const ElectoralCommisionApi = require("./src/electoralCommisionAPI");
const GoogleMapsApi = require("./src/googleMapsApi");
require("dotenv").config();

const ecApi = new ElectoralCommisionApi(
  process.env.ELECTORAL_COMMISION_API_KEY
);

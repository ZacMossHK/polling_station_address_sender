const ElectoralCommisionApi = require("./src/electoralCommisionAPI");
const GoogleMapsApi = require("./src/googleMapsApi");
require("dotenv").config();

const ecApi = new ElectoralCommisionApi(process.env.EC_API_KEY);
const gMapsApi = new GoogleMapsApi(process.env.GOOGLE_MAPS_API_KEY);

gMapsApi.getStreetViewImage([41.403609, 2.174448]);

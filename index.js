const ElectoralCommisionApi = require("./src/electoralCommisionAPI");
require("dotenv").config();

const ecApi = new ElectoralCommisionApi(process.env.EC_API_KEY);

require("dotenv").config();

module.exports = class ElectoralCommisionApi {
  constructor() {
    this.apiKey = process.env.EC_API_KEY;
  }

  async getPollingStationAddressInfo(postcode) {
    const response = await fetch(
      `https://api.electoralcommission.org.uk/api/v1/postcode/${postcode}?token=${this.apiKey}`
    );
    const result = await response.json();
    if (!result.dates.length) return {};
    return result.dates[0].polling_station.station.properties;
  }
};

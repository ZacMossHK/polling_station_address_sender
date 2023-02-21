module.exports = class ElectoralCommisionApi {
  constructor() {
    this.apiKey;
  }
  async getPollingStationAddressInfo(postcode) {
    const response = await fetch(
      `https://api.electoralcommission.org.uk/api/v1/postcode/${postcode}?token=${this.apiKey}`
    );
    const result = await response.json();
    return result.dates[0].polling_station.station.properties;
  }
};

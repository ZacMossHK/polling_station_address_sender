module.exports = class ElectoralCommisionApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /* fetches a polling station information from the Electoral Commision Api
  Args: [postcode: string, test: bool]
  If test is true, then testing environment is enabled and it will return an object with a preset address.
  Returns an object with polling station information if successful: {address: string, postcode: string}
  Throws an error if fetch was unsuccessful,
  or if an address picker is returned (postcode supplied matches several polling station areas),
  or if no polling data exists
  EC endpoint information and response examples: https://api.electoralcommission.org.uk/docs/ */
  async getPollingStationAddressInfo(postcode, test) {
    if (test)
      return {
        postcode: "",
        address: "Earlswood Social Club, 160-164 Greenway Road, Rumney",
      };
    const response = await fetch(
      `https://api.electoralcommission.org.uk/api/v1/postcode/${postcode}?token=${this.apiKey}`
    );
    const result = await response.json();
    if (result.dates.length)
      return result.dates[0].polling_station.station.properties;
    if (result.address_picker)
      throw Error("Electoral Commision API returned address picker");
    throw Error("EC API returned no polling info");
  }
};

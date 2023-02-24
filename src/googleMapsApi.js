module.exports = class GoogleMapsApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getStreetViewImage(coordinates) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/streetview?location=${coordinates[0]},${coordinates[1]}&size=456x456&key=${this.apiKey}`
    );
    const result = await response.blob();
    console.log(result);
  }
};

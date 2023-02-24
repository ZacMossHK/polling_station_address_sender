require("dotenv").config();

module.exports = class ImageSender {
  constructor(electoralCommisionApi, twilioApi) {
    this.electoralCommisionApi = electoralCommisionApi;
    this.twilioApi = twilioApi;
  }

  async sendPollingStationMessage(name, postcode, number, messageType) {
    const pollingStationAddressInfo =
      await this.electoralCommisionApi.getPollingStationAddressInfo(postcode);
    const message = `Hi ${name},\n\nIt's time to vote! Your polling station is:\n\n${pollingStationAddressInfo.address.replace(
      /, /g,
      ",\n"
    )}${
      pollingStationAddressInfo.address.postcode
        ? `\n${pollingStationAddressInfo.address.postcode}`
        : ""
    }`;
    console.log(message);
    return await this.twilioApi.sendWhatsAppMessage(message, number);
  }
};

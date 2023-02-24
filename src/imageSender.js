require("dotenv").config();

module.exports = class ImageSender {
  constructor(electoralCommisionApi, twilioApi) {
    this.electoralCommisionApi = electoralCommisionApi;
    this.twilioApi = twilioApi;
  }

  /* combines recipient name and polling station address info into a message body with linebreaks
  Args: [name: string, pollingStationAddressInfo: object: {postcode: string, address: string}]
  returns a string */
  createMessageBody(name, pollingStationAddressInfo) {
    const addressWithLineBreaks = pollingStationAddressInfo.address.replace(
      /, /g,
      ",\n"
    );
    const postcodeWithLineBreak = pollingStationAddressInfo.address.postcode
      ? `\n${pollingStationAddressInfo.address.postcode}`
      : "";
    return `Hi ${name},\n\nIt's time to vote! Your polling station is:\n\n${addressWithLineBreaks}${postcodeWithLineBreak}`;
  }

  /* sends a message to a recipient with information about their nearest polling station.
  Args: [name: string, postcode: string, number: string, messageType: string]
  Returns true if the message is sent successfully, otherwise false
  */
  async sendPollingStationMessage(name, postcode, number, messageType) {
    try {
      const pollingStationAddressInfo =
        await this.electoralCommisionApi.getPollingStationAddressInfo(postcode);
      return await this.twilioApi[`send${messageType}Message`](
        this.createMessageBody(name, pollingStationAddressInfo),
        number
      );
    } catch (error) {
      return false;
    }
  }
};

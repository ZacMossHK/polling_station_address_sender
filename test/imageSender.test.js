const ImageSender = require("../src/imageSender");

const votingMessage = "It's time to vote! Your polling station is:";

let mockEcApi, body;
describe("ImageSender class", () => {
  mockEcApi = {
    getPollingStationAddressInfo: jest.fn().mockResolvedValue({
      address: "Earlswood Social Club, 160-164 Greenway Road, Rumney",
      postcode: "",
    }),
  };
  body = `Hi name,\n\n${votingMessage}\n\nEarlswood Social Club,\n160-164 Greenway Road,\nRumney`;

  it("successfully sends a WhatsApp message", async () => {
    const mockTwilioApi = {
      sendWhatsAppMessage: jest.fn().mockResolvedValue(true),
    };
    const imageSender = new ImageSender(mockEcApi, mockTwilioApi);
    const result = await imageSender.sendPollingStationMessage(
      "name",
      "postcode",
      "number",
      "whatsapp"
    );
    expect(mockEcApi.getPollingStationAddressInfo).toHaveBeenCalledWith(
      "postcode"
    );
    expect(mockTwilioApi.sendWhatsAppMessage).toHaveBeenCalledWith(
      body,
      "number"
    );
    expect(result).toBe(true);
  });

  it("successfully sends an SMS message", async () => {
    const mockTwilioApi = {
      sendSmsMessage: jest.fn().mockResolvedValue(true),
    };
    const imageSender = new ImageSender(mockEcApi, mockTwilioApi);
    const result = await imageSender.sendPollingStationMessage(
      "name",
      "postcode",
      "number",
      "sms"
    );
    expect(mockEcApi.getPollingStationAddressInfo).toHaveBeenCalledWith(
      "postcode"
    );
    expect(mockTwilioApi.sendSmsMessage).toHaveBeenCalledWith(body, "number");
    expect(result).toBe(true);
  });
});

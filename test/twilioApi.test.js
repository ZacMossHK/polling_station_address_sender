const TwilioApi = require("../src/twilioApi");
jest.mock("twilio");

const mockClient = require("twilio");
const mockCreate = jest.fn();
mockClient.mockImplementation(() => {
  return { messages: { create: mockCreate } };
});

let twilioApi, logSpy;
describe("TwilioApi class", () => {
  beforeEach(() => {
    twilioApi = new TwilioApi("accountSid", "authToken", "012345");
    logSpy = jest.spyOn(global.console, "log");
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("sends a WhatsApp message", async () => {
    mockCreate.mockResolvedValue({ sid: "0" });
    await twilioApi.sendWhatsAppMessage("hello", "1234");
    expect(logSpy).toHaveBeenCalledWith(`Message sent! SID: 0`);
  });
});

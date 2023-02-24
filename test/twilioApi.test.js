const TwilioApi = require("../src/twilioApi");
jest.mock("twilio");

const mockCreate = jest.fn();
require("twilio").mockImplementation(() => ({
  messages: { create: mockCreate },
}));

let twilioApi, logSpy;
describe("TwilioApi class", () => {
  beforeEach(() => {
    twilioApi = new TwilioApi();
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

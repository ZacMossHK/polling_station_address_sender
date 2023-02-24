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
    mockCreate.mockReset();
  });

  it("sends a WhatsApp message", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "0" });
    const result = await twilioApi.sendWhatsAppMessage("hello", "1234");
    expect(result).toBe(true);
  });

  it("catches an error", async () => {
    mockCreate.mockImplementationOnce(() => {
      throw new Error();
    });
    const result = await twilioApi.sendWhatsAppMessage("hello", "1234");
    expect(result).toBe(false);
  });
});

const TwilioApi = require("../src/twilioApi");
jest.mock("twilio");

const mockCreate = jest.fn();
require("twilio").mockImplementation(() => ({
  messages: { create: mockCreate },
}));

let twilioApi;

beforeEach(() => {
  twilioApi = new TwilioApi();
  mockCreate.mockReset();
});

describe("sendWhatsAppMessage method", () => {
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

describe("sendSmsMessage method", () => {
  it("sends an SMS", async () => {
    mockCreate.mockResolvedValueOnce({ sid: "0" });
    const result = await twilioApi.sendSmsMessage("hello", "1234");
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

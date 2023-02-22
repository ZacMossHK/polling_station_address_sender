const ImageSender = require("../src/imageSender");

let imageSender, mockEcApi, fakeEcResponse;

describe("ImageSender class", () => {
  beforeEach(() => {
    fakeEcResponse = jest.fn();
    mockEcApi = {
      getPollingStationAddressInfo: jest.fn(async (postcode) =>
        fakeEcResponse()
      ),
    };
    imageSender = new ImageSender(mockEcApi);
  });

  it("test to go here in the future", () => {});
});

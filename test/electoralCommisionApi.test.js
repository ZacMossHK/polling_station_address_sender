const ElectoralCommisionApi = require("../src/electoralCommisionAPI");
const pollingDataExistsResponse = require("./exampleApiResults/electoralCommision/pollingDataExistsResponse");

let api;
describe("ElectoralCommisionApi class", () => {
  beforeEach(() => {
    fetch.resetMocks();
    api = new ElectoralCommisionApi();
  });

  it("returns a JSON when polling data exists", async () => {
    fetch.mockResponseOnce(JSON.stringify(pollingDataExistsResponse));
    const result = await api.getPollingStationAddressInfo("postcode");
    expect(result).toEqual({
      postcode: "",
      address: "Earlswood Social Club, 160-164 Greenway Road, Rumney",
    });
  });
});

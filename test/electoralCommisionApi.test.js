const ElectoralCommisionApi = require("../src/electoralCommisionAPI");
const pollingDataExistsResponse = require("./exampleApiResults/electoralCommision/pollingDataExistsResponse");
const noUpcomingBallotsResponse = require("./exampleApiResults/electoralCommision/noUpcomingBallotsResponse");

let api;
describe("ElectoralCommisionApi class", () => {
  beforeEach(() => {
    fetch.resetMocks();
    api = new ElectoralCommisionApi();
  });

  it("returns an object with address information when polling data exists", async () => {
    fetch.mockResponseOnce(JSON.stringify(pollingDataExistsResponse));
    const result = await api.getPollingStationAddressInfo("postcode");
    expect(result).toEqual({
      postcode: "",
      address: "Earlswood Social Club, 160-164 Greenway Road, Rumney",
    });
  });

  it("returns an empty object if no polling data exists", async () => {
    fetch.mockResponseOnce(JSON.stringify(noUpcomingBallotsResponse));
    const result = await api.getPollingStationAddressInfo("postcode");
    expect(result).toEqual({});
  });
});

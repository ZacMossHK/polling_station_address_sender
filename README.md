# Polling Station Address Sender

This is a script that messages potential voters the address of their polling station. It uses the Electoral Commision Api to fetch polling station address information and Twilio to send messages using either SMS or WhatsApp messaging services.

Created for Campaign Lab.
https://www.campaignlab.uk/

## Tech

- Javascript
- Node.js
- Twilio: messaging API and library
- Jest: testing framework

## Setup

To install, clone the repo and then `npm i` to install dependencies.

### API Setup

#### Electoral Commision

Sign up for an API key at https://api.electoralcommission.org.uk/

#### Twilio

Create a Twilio account at https://www.twilio.com/

Follow the instructions at https://console.twilio.com/us1/develop/sms/try-it-out/get-set-up to get an account SID and Auth Token, then click 'try SMS' and 'try WhatsApp' to get set up with those services.

#### ENV setup

Create the following variables in `.env`:

```
ELECTORAL_COMMISION_API_KEY = your Electoral Commision API Key
TWILIO_AUTH_TOKEN
TWILIO_ACCOUNT_SID
TWILIO_FROM_NUMBER_WHATSAPP = number that will be sending WhatsApp messages
TWILIO_MESSAGING_SERVICE_SID = SID for sending SMS messages
```

### Tests

To run all tests: `jest`

## Running The Script

Until elections are happening in the UK there will be no polling station information to fetch from the Electoral Commision API, so this script will not work as designed until this happens. The test environment for the ElectoralCommisionApi is enabled by default so an example response object will be returned by the method `ElectoralCommisionApi.getPollingStationAddressInfo`.

Default response object:

```javascript
{
  postcode: "",
  address: "Earlswood Social Club, 160-164 Greenway Road, Rumney",
}
```

### Steps To Run

1. In `index.js` declare these variables:

```javascript
const test = true; // test: bool, true will enable the testing environemnt for the ElectoralCommisionApi class, false for production
let name; // name: string, name of the recipient (eg. John Smith)
let postcode; // postcode: string, postcode of the recipient
let number; // number: string, mobile number of the receipient with an international dialling code, eg. 0798... becomes +44798...
let messageType; // messageType: string, type of message to send. Either "WhatsApp" or "Sms"
```

2. Run `node index.js`

3. Enjoy!

## What It Does Not Do

### Electoral Commision API - Address Picker Error 
Some postcodes will return an address picker from the Electoral Commision API, meaning that several addresses related to the given postcode have different polling stations. The next step using the API would be to choose an address, which would return a polling station for that address, however without knowing what format the addresses of potential voters would be in I have left this out as it would be difficult to test. If address picker does happen then the method `ElectoralCommisionApi.getPollingStationAddressInfo` will throw an error. This can be fixed in the future so that a supplied voter address can be used to pick the right address from the API's response.

### Google Maps API
The original brief was to send Google street view images of polling stations, however the coverage in the UK for polling stations isn't good enough to automate this. The street view API would often returned a photo of the street the station was on without the station itself, or a photo in the direction of the polling station from a different street, looking at some houses (so no polling station in the shot). Both these options are useless and would be confusing to a potential voter. Using a static Google map or link to the Goole Maps address was considered but many polling station addresses do not return a single location or any location at all. This would again be confusing to a voter. Because of this I decided not to use Google Maps for the build of this script.

## Message Example

With these variables:
```javascript
test = true;
name = "Zac";
```

The following message will be sent:

```
Hi Zac,

It's time to vote! Your polling station is:

Earlswood Social Club,
160-164 Greenway Road,
Rumney
```

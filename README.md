# Polling Station Address Sender

This is a script that messages potential voters the address of their polling station. It uses the Electoral Commision Api to fetch polling station address information and Twilio to send messages using either SMS or WhatsApp messaging services.

Created for Campaign Lab.
https://www.campaignlab.uk/

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

#### Tests

To run all tests: `jest`

## Running The Script

1. In `index.js` declare these variables:

```javascript
let name; // name: string, name of the recipient (eg. John Smith)
let postcode; // postcode: string, postcode of the recipient
let number; // number: string, mobile number of the receipient with an international dialling code, eg. 0798... becomes +44798...
let messageType; // messageType: string, type of message to send. Either "WhatsApp" or "Sms"
```

2. Run `node index.js`

3. Enjoy!

## Message Example

```
Hi {name},

It's time to vote! Your polling station is:

{address}
```

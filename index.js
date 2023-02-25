/* change the variables below to run
test: bool, true will enable the testing environemnt for the ElectoralCommisionApi class to return a preset object.
name: string, name of the recipient (eg. John Smith)
postcode: string, postcode of the recipient
number: string, mobile number of the receipient with an international dialling code, eg. 0798... becomes +44798...
messageType: string, type of message to send. Either "WhatsApp" or "Sms" */
const test = true;
let name;
let postcode;
let number;
let messageType;

const ElectoralCommisionApi = require("./src/electoralCommisionAPI");
const ImageSender = require("./src/imageSender");
const TwilioApi = require("./src/twilioApi");
require("dotenv").config();

// all environmental variables must be set
const ecApi = new ElectoralCommisionApi(
  process.env.ELECTORAL_COMMISION_API_KEY,
  test
);
const twilioApi = new TwilioApi(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_FROM_NUMBER_WHATSAPP,
  process.env.TWILIO_MESSAGING_SERVICE_SID
);

const imageSender = new ImageSender(ecApi, twilioApi);
imageSender.sendPollingStationMessage(name, postcode, number, messageType);

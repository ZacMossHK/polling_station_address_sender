const ElectoralCommisionApi = require("./src/electoralCommisionAPI");
const TwilioApi = require("./src/twilioApi");
require("dotenv").config();

const ecApi = new ElectoralCommisionApi(
  process.env.ELECTORAL_COMMISION_API_KEY
);
const twilioApi = new TwilioApi(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_FROM_NUMBER_WHATSAPP,
  process.env.TWILIO_MESSAGING_SERVICE_SID
);

twilioApi.sendWhatsAppMessage(
  "Hey there! This is a message from the code.",
  "+447983352662"
);
twilioApi.sendSmsMessage(
  "Hey there! This is a message from the code.",
  "+447983352662"
);

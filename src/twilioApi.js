module.exports = class TwilioApi {
  constructor(accountSid, authToken, fromNumberWhatsapp, messagingServiceSid) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumberWhatsapp = fromNumberWhatsapp;
    this.messagingServiceSid = messagingServiceSid;
    this.client = require("twilio")(accountSid, authToken);
  }

  /* sends a message using the Twilio API and module
  Args: [createParams: object]
  If a message is unsucessful the twilio module will throw an error, otherwise it will return an object
  See here for response object examples: https://www.twilio.com/docs/usage/twilios-response */
  async sendMessage(createParams) {
    const message = await this.client.messages.create(createParams);
    console.log(`Message sent! SID: ${message.sid}`);
    return true;
  }

  /* both these functions send a message to a chosen number
  Args: [body: string, toNumber: string]
  return value: bool, true if message sent succesfully, throws an error if not
  toNumber must be prefixed with an international dialling code and no 0, eg. UK = 0798... => +44798... */
  async sendWhatsAppMessage(body, toNumber) {
    return await this.sendMessage({
      body,
      from: `whatsapp:${this.fromNumberWhatsapp}`,
      to: `whatsapp:${toNumber}`,
    });
  }

  async sendSmsMessage(body, toNumber) {
    return await this.sendMessage({
      body,
      messagingServiceSid: this.messagingServiceSid,
      to: `${toNumber}`,
    });
  }
};

module.exports = class TwilioApi {
  constructor(accountSid, authToken, fromNumberWhatsapp) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumberWhatsapp = fromNumberWhatsapp;
    this.client = require("twilio")(accountSid, authToken);
  }

  /* sends a whatsapp message to a chosen number
  body: string
  toNumber: string
  return value: bool, true if message sent succesfully, false if not

  toNumber must be prefixed with an international dialling code and no 0, eg. UK = 0798... => +44798...
  */
  async sendWhatsAppMessage(body, toNumber) {
    try {
      const message = await this.client.messages.create({
        body,
        from: `whatsapp:${this.fromNumberWhatsapp}`,
        to: `whatsapp:${toNumber}`,
      });
      console.log(`Message sent! SID: ${message.sid}`);
      return true;
    } catch (error) {
      // errors will be thrown by the Twilio module in the event that a message is sent unsucessfully.
      console.log(error);
      return false;
    }
  }
};

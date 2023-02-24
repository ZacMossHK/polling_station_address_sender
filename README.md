## Twilio

Create a Twilio account at https://www.twilio.com/

Follow the instructions at https://console.twilio.com/us1/develop/sms/try-it-out/get-set-up to get an account SID and Auth Token, then click 'try SMS' and 'try WhatsApp' to get set up with those services.

Create the following variables in .env:

```
ELECTORAL_COMMISION_API_KEY = your Electoral Commision API Key
TWILIO_AUTH_TOKEN
TWILIO_ACCOUNT_SID
TWILIO_FROM_NUMBER_WHATSAPP = number that will be sending WhatsApp messages
TWILIO_MESSAGING_SERVICE_SID = SID for sending SMS messages
```

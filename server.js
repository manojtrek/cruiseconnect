const express = require('express');
const twilio = require('twilio');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(express.json());
app.use(express.static('public'));

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, code } = req.body;
  try {
    const verification = await client.verify.v2.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks
      .create({ to: phoneNumber, code });
    res.json({ success: verification.status === 'approved' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/create-group', async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  const dedicatedNumber = process.env.DEDICATED_PHONE;
  const groupName = `Cruise Connect - ${firstName}-${lastName}-06/19`;

  try {
    // Placeholder for WhatsApp API call to create a group and add participants
    // await axios.post('WHATSAPP_API_URL', {
    //   name: groupName,
    //   participants: [phoneNumber, dedicatedNumber]
    // }, { headers: { Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}` }});
    res.json({ success: true, groupName });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

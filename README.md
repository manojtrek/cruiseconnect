# Cruise Connect

This simple example shows a web page that collects passenger information and verifies a phone number by OTP before creating a WhatsApp group.

## Setup

1. Copy `.env.example` to `.env` and fill in your Twilio and WhatsApp credentials.
2. Install dependencies with `npm install`.
3. Run the application with `npm start`.

## Usage

Open `http://localhost:3000` in your browser. Fill in the form and request an OTP. After verifying the OTP, the backend will attempt to create a WhatsApp group named `Cruise Connect - FirstName-LastName-06/19` and add the user phone number and a dedicated number.

The WhatsApp integration in `server.js` is a placeholder. Replace it with actual API calls as needed.

document.getElementById('sendOtp').addEventListener('click', async () => {
  const phone = document.getElementById('phone').value;
  const res = await fetch('/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: phone })
  });
  const data = await res.json();
  if (data.success) {
    document.getElementById('otpSection').style.display = 'block';
    document.getElementById('message').textContent = 'OTP sent';
  } else {
    document.getElementById('message').textContent = 'Failed to send OTP';
  }
});

document.getElementById('verifyOtp').addEventListener('click', async () => {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phone = document.getElementById('phone').value;
  const cruise = document.getElementById('cruise').value;
  const passengers = document.getElementById('passengers').value;
  const ageGroup = document.getElementById('ageGroup').value;
  const otp = document.getElementById('otp').value;

  const verifyResp = await fetch('/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber: phone, code: otp })
  });
  const verifyData = await verifyResp.json();
  if (!verifyData.success) {
    document.getElementById('message').textContent = 'OTP verification failed';
    return;
  }

  const createResp = await fetch('/create-group', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, phoneNumber: phone, cruise, passengers, ageGroup })
  });
  const createData = await createResp.json();
  if (createData.success) {
    document.getElementById('message').textContent = `Group ${createData.groupName} created.`;
  } else {
    document.getElementById('message').textContent = 'Error creating group';
  }
});

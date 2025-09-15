// window.onload = function () {
//   console.log("Account creation");

//   const submitBtn = document.getElementById("submit");

//   if (!submitBtn) {
//     alert(" Submit button not found. Check HTML.");
//     return;
//   }

//   submitBtn.addEventListener("click", function (event) {
//     event.preventDefault(); 

//     const email = document.getElementById("email").value.trim();
//     const username = document.getElementById("username").value.trim();
//     const password = document.getElementById("password").value.trim();
//     const confirmPassword = document.getElementById("confirmPassword").value.trim();
    

//      function validateEmail() {
//      const email = document.getElementById("email").value;  
//      if (!email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com')) {
//     alert('Please enter a valid email');
//     return false;
//      }
//       return true; 
//     }

     

//     if (!email || !username || !password || !confirmPassword) {
//       alert("Please fill in all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

   
//     const user = {email, username, password };
//     localStorage.setItem(username, JSON.stringify(user));

//     alert("Account created successfully, you can Log in now!");
//     window.location.href = "login.html";
//   });
// };

// const sendOtpBtn = document.getElementById('send-otp-btn');
// const verifyOtpBtn = document.getElementById('verify-otp-btn');
// const otpInput = document.getElementById('otp');

// let generatedOtp = '';
// let userEmail = '';

// // Function to generate OTP
// function generateOtp() {
//   generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//   console.log('Generated OTP:', generatedOtp);
//   // Send OTP to user's email (you can use an API for this)
//   // For demonstration purposes, we'll just display the OTP
//   alert(`Your OTP is: ${generatedOtp}`);
//   // In a real application, you'd send the OTP via email using a service like SendGrid or Mailgun
//   // Here's an example using EmailJS:
//   // emailjs.send("service_id", "template_id", {
//   //   to_email: userEmail,
//   //   otp: generatedOtp,
//   // });
// }

// // Function to verify OTP
// function verifyOtp() {
//   const userOtp = otpInput.value;
//   if (userOtp === generatedOtp) {
//     alert('OTP verified successfully!');
//     // Proceed with sign-up process
//   } else {
//     alert('Invalid OTP. Please try again.');
//   }
// }

// sendOtpBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   userEmail = emailInput.value;
//   generateOtp();
//   verifyOtpBtn.disabled = false;
// });

// verifyOtpBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   verifyOtp();
// });



window.onload = function () {
  console.log("Account creation");

  const submitBtn = document.getElementById("submit");
  const sendOtpBtn = document.getElementById("send-otp-btn");
  const verifyOtpBtn = document.getElementById("verify-otp-btn");
  const otpInput = document.getElementById("otp");
  const emailInput = document.getElementById("email");


  let userEmail = '';
  let otpVerified = false; //  track OTP status

  // Function to generate OTP
  function generateOtp() {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", generatedOtp);
   
    // Demo: show OTP with alert
    alert(`Your OTP is: ${generatedOtp}`);

    
  
    // Enable OTP input
    otpInput.disabled = false;
    verifyOtpBtn.disabled = false;
    return generatedOtp
  }


const sendOtpEmail = (email, otp) => {
  const server = server.connect({
    user: 'your_emailjs_user',
    password: 'your_emailjs_password',
    host: 'smtp.gmail.com',
    ssl: true,
  });

  server.send(
    {
      text: `Your OTP is: ${otp}`,
      from: 'your_email@gmail.com',
      to: email,
      subject: 'OTP Verification',
    },
    (err, message) => {
      if (err) {
        console.log(err);
      } else {
        console.log('OTP sent successfully!');
      }
    }
  );
};

  // Function to verify OTP
  function verifyOtp() {
    const userOtp = otpInput.value.trim();
    if (userOtp === generatedOtp) {
      alert(" OTP verified successfully!");
      otpVerified = true;
      submitBtn.disabled = false; // Enable account creation
    } else {
      alert(" Invalid OTP. Please try again.");
      otpVerified = false;
    }
  }

  // Send OTP
  sendOtpBtn.addEventListener("click"), (e) => {
    e.preventDefault();
    userEmail = emailInput.value.trim();

    if (!userEmail) {
      alert("Please enter your email first");
      return;
    }

    // Basic validation
    if (!userEmail.endsWith("@gmail.com") && !userEmail.endsWith("@yahoo.com")) {
      alert("Please enter a valid email");
      return;
    }

   const otp = generateOtp();
   ///inside fetch useremail and generated opt
        fetch("http://localhost:3000/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, otp: generatedOtp }),
    })
    .then(res => res.text())
    .then(data => {
      alert(" OTP sent to your email!");
    })
    .catch(err => {
      console.error("Error sending OTP:", err);
      alert(" Failed to send OTP. Try again.");
    });

    otpInput.disabled = false;
    verifyOtpBtn.disabled = false;
  }

  };

  // Verify OTP
  verifyOtpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    verifyOtp();
  });

  // Final account creation
  if (!submitBtn) {
    alert("Submit button not found. Check HTML.");
    return;
  }

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!otpVerified) {
      alert("⚠️ Please verify OTP before creating account.");
      return;
    }

    const email = emailInput.value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = { email, username, password };
    localStorage.setItem(username, JSON.stringify(user));

    alert(" Account created successfully, you can log in now!");
    window.location.href = "login.html";
  });
;

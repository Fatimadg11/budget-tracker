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

window.onload = function () {
  console.log("Account creation");

  const submitBtn = document.getElementById("submit");
  const sendOtpBtn = document.getElementById("send-otp-btn");
  const verifyOtpBtn = document.getElementById("verify-otp-btn");
  const otpInput = document.getElementById("otp");
  const emailInput = document.getElementById("email");

  let generatedOtp = "";
  let otpVerified = false;

  // Generate OTP
  function generateOtp() {
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", generatedOtp);
    alert("Your OTP is: " + generatedOtp); // TEMP
    otpInput.disabled = false;
    verifyOtpBtn.disabled = false;
  }

  // Verify OTP
  function verifyOtp() {
    const userOtp = otpInput.value.trim();
    if (userOtp === generatedOtp) {
      alert("✅ OTP verified successfully!");
      otpVerified = true;
      submitBtn.disabled = false;
    } else {
      alert("❌ Invalid OTP. Try again.");
      otpVerified = false;
    }
  }

  // Send OTP
  sendOtpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!emailInput.value) {
      alert("Please enter email first");
      return;
    }
    generateOtp();
  });

  // Verify OTP
  verifyOtpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    verifyOtp();
  });

  // Final Signup
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!otpVerified) {
      alert("⚠️ Please verify OTP before signing up.");
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
  
    
    // Send to server
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => {
        console.log(res) 
        return res.json()

      })
      .then((data) => {
        alert(data.message || "Account created successfully!");
        window.location.href = "login.html";
      })
      .catch((err) => {
        console.error(err);
        alert("Error creating account");
      });
  });
};

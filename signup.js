window.onload = function () {
  console.log("Account creation");

  const submitBtn = document.getElementById("submit");

  if (!submitBtn) {
    alert(" Submit button not found. Check HTML.");
    return;
  }

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault(); 

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    

     function validateEmail() {
     const email = document.getElementById("email").value;  
     if (!email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com')) {
    alert('Please enter a valid email');
    return false;
     }
      return true; 
    }

     

    if (!firstName || !lastName || !email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

   
    const user = { firstName, lastName, email, username, password };
    localStorage.setItem(username, JSON.stringify(user));

    alert("Account created successfully, you can Log in now!");
    window.location.href = "login.html";
  });
};

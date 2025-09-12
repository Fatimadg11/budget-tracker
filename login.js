window.onload = function () {
  console.log("Login script loaded ");

  const loginBtn = document.getElementById("loginBtn");
  console.log("Login button found:", loginBtn);

  if (!loginBtn) {
    alert(" Login button not found. Check your HTML ID.");
    return;
  }

  loginBtn.addEventListener("click", function (event) {
    console.log("Login button clicked!");
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Entered username:", username);
    console.log("Entered password:", password);

    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    const storedUser = localStorage.getItem(username);
    console.log("Stored user:", storedUser);

    if (!storedUser) {
      alert(" User not found. Please sign up first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.password === password) {
      alert(`Welcome, ${user.firstName}!`);
       window.location.href = "index.html";
    } else {
      alert("Incorrect password. Try again.");
    }
  });
};

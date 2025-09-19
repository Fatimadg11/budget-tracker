window.onload = function () {
  console.log("Login script loaded ");

  const loginBtn = document.getElementById("loginBtn");
  console.log("Login button found:", loginBtn);

  if (!loginBtn) {
    alert(" Login button not found. Check your HTML ID.");
    return;
  }

  loginBtn.addEventListener("click", async (event) => {
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
  

      const wes = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

      const qes=  await wes.json()

      if (qes.id) {
        window.location.href = "index.html"

      }else{
        alert(`${qes.error}`)
      }

      console.log("here is qes", qes)
  });
};

 


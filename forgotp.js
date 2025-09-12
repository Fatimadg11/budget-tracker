document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit");
  const emailInput = document.getElementById("email-f-p");

  submitButton.addEventListener("click", () => {
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      alert("Please enter your email, phone number, or username.");
      return;
    }

    if (emailValue.includes("@") && !/\S+@\S+\.\S+/.test(emailValue)) {
      alert("Please enter a valid email address.");
      return;
    }

    setTimeout(() => {
      alert(`If an account exists for "${emailValue}", a login link has been sent.`);
      emailInput.value = "";
    }, 800);
  });
});

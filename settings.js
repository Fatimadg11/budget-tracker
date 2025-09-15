document.addEventListener("DOMContentLoaded", () => {
    const passwordForm = document.getElementById("passwordForm");

    if (passwordForm) {
        passwordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const oldPass = document.getElementById("oldPassword").value;
            const newPass = document.getElementById("newPassword").value;

            if (newPass.length < 6) {
                alert("New password must be at least 6 characters.");
                return;
            }

            // Later: send this to your backend
            alert("✅ Password updated successfully!");
            passwordForm.reset();
        });
    }
});

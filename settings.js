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
document.addEventListener("DOMContentLoaded", () => {
    const photoInput = document.getElementById("photoInput");
    const profilePhoto = document.getElementById("profilePhoto");
    const photoForm = document.getElementById("photoForm");

    if (photoInput && profilePhoto) {
        // Preview new image immediately
        photoInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profilePhoto.src = event.target.result; // ✅ replace current photo
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (photoForm) {
        // Optional: handle upload
        photoForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            alert("✅ Photo ready to upload (server logic comes later)");
        });
    }
});

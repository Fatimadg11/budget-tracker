document.addEventListener("DOMContentLoaded", () => {
    const passwordForm = document.getElementById("passwordForm");
   
    if (passwordForm) {
        passwordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const oldPassword = document.getElementById("oldPassword").value;
            const newPassword = document.getElementById("newPassword").value;

            if (newPassword.length < 6) {
                alert("New password must be at least 6 characters.");
                return;
            }
            const rap = await fetch ("http://localhost:3000/profile/changePassword", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword }),
               })
               console.log(rap)
               if (!rap){
                alert("could not featch")
               }
              const rep = await rap.json()
              console.log(rep)
              if (rep){
                alert(`${rep.message}`);
              } 

            
            
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

// 3️⃣ Frontend (settings.js)
// (a) Profile Photo Upload

// Update your JS to send file to backend:

// document.addEventListener("DOMContentLoaded", () => {
//   const photoForm = document.getElementById("photoForm");
//   const profilePhoto = document.querySelector(".profile-photo");

//   if (photoForm) {
//     photoForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const fileInput = document.getElementById("profilephoto");
//       const file = fileInput.files[0];

//       if (!file) {
//         alert("Please select a photo");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("photo", file);

//       const res = await fetch("http://localhost:3000/profile/photo", {
//         method: "POST",
//         body: formData,
//         credentials: "include", // needed for session
//       });

//       const data = await res.json();
//       if (data.photo) {
//         profilePhoto.src = `http://localhost:3000${data.photo}`;
//         alert("✅ Profile photo updated");
//       } else {
//         alert("❌ Failed to upload photo");
//       }
//     });
//   }
// });


// (b) Change Password

// Update your password form script:

// document.addEventListener("DOMContentLoaded", () => {
//   const passwordForm = document.getElementById("passwordForm");

//   if (passwordForm) {
//     passwordForm.addEventListener("submit", async (e) => {
//       e.preventDefault();

//       const oldPass = document.getElementById("oldPassword").value;
//       const newPass = document.getElementById("newPassword").value;

//       const res = await fetch("http://localhost:3000/profile/change-password", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // for session cookies
//         body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ " + data.message);
//         passwordForm.reset();
//       } else {
//         alert("❌ " + data.message);
//       }
//     });
//   }
// });

console.log("✅ JS file is connected!");


document.addEventListener("DOMContentLoaded", () => {
    const addExpenseButton = document.getElementById("add_expense");
    const expenseHistoryTable = document.querySelector("#expenseHistoryTable");
    const totalAmountParagraph = document.querySelector("#w-s p:nth-child(2)");
    const totalIncomeParagraph = document.querySelector("#t-i p:nth-child(2)");
    const balanceParagraph = document.querySelector("#balance p:nth-child(2)");
    const categoryRadios = document.querySelectorAll('input[name="category"]');
    const expenseCategories = document.getElementById('EI');
    const incomeCategories = document.getElementById('income-category');
    const deleteButton = document.getElementById("delete-expense");

    let totalAmount = 0;
    let totalIncome = 0;
    let transactionId = 0;
    let selectedRow = null;


    document.getElementById('date').valueAsDate = new Date();

    addExpenseButton.addEventListener("click", () => {
        const radio = document.querySelector('input[name="category"]:checked');
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const location = document.getElementById("location").value;
        const category = document.querySelector('input[name="form"]:checked');


        if (!radio || !date || !description || isNaN(amount) || amount <= 0 || !location || !category) {
            alert("Please fill in all fields");
            return;
        }

        if (radio.value === "Income") {
            totalIncome += amount;
            totalIncomeParagraph.innerText = `N${totalIncome.toFixed(2)}`;
        } else {
            totalAmount += amount;
            totalAmountParagraph.innerText = `N${totalAmount.toFixed(2)}`;
        }

        const netBalance = totalIncome - totalAmount;
        balanceParagraph.innerText = `N${netBalance.toFixed(2)}`;

        if (netBalance > 0) {
            balanceParagraph.style.color = 'green';
        } else if (netBalance < 0) {
            balanceParagraph.style.color = 'red';
        } else {
            balanceParagraph.style.color = 'grey';
        }

        const newRow = expenseHistoryTable.insertRow();
        const currentTransactionId = transactionId++;

        newRow.dataset.transactionId = currentTransactionId;
        newRow.dataset.type = radio.value;
        newRow.dataset.amount = amount;

        newRow.insertCell(0).innerText = radio.value;
        newRow.insertCell(1).innerText = new Date(date).toLocaleDateString();
        newRow.insertCell(2).innerText = description;
        newRow.insertCell(3).innerText = `N${amount.toFixed(2)}`;
        newRow.insertCell(4).innerText = location;
        newRow.insertCell(5).innerText = category.value;

        radio.checked = false;
        if (category) category.checked = false;
        document.getElementById("date").valueAsDate = new Date();
        document.getElementById("description").value = '';
        document.getElementById("amount").value = '';
        document.getElementById("location").value = '';

        document.getElementById('expense-radio').checked = true;
        expenseCategories.style.display = 'block';
        incomeCategories.style.display = 'none';

    });

    expenseHistoryTable.addEventListener("click", (e) => {
        if (e.target.tagName === "TD") {
            const clickedRow = e.target.parentNode;

            if (selectedRow) {
                selectedRow.classList.remove('selected-row');
            }

            selectedRow = clickedRow;
            selectedRow.classList.add('selected-row');
        }
    });

    deleteButton.addEventListener("click", () => {
        if (!selectedRow || selectedRow.cells.length === 0) {
            alert("select a transaction to delete by clicking on it.");
            return;
        }

        if (confirm("Are you sure you want to delete this transaction?")) {
            const rowType = selectedRow.dataset.type;
            const rowAmount = parseFloat(selectedRow.dataset.amount);

            if (rowType === "Income") {
                totalIncome -= rowAmount;
                totalIncomeParagraph.innerText = `N${totalIncome.toFixed(2)}`;
            } else {
                totalAmount -= rowAmount;
                totalAmountParagraph.innerText = `N${totalAmount.toFixed(2)}`;
            }

            const newNetBalance = totalIncome - totalAmount;
            balanceParagraph.innerText = `N${newNetBalance.toFixed(2)}`;

            if (newNetBalance > 0) {
                balanceParagraph.style.color = 'green';
            } else if (newNetBalance < 0) {
                balanceParagraph.style.color = 'red';
            } else {
                balanceParagraph.style.color = 'grey';
            }

            selectedRow.remove();
            selectedRow = null;


        }
    });
});
// ==========================
// Toggle category display based on expense/income selection
// ==========================

document.getElementById('expense-radio').addEventListener('change', () => {
    document.getElementById('EI').style.display = 'block';
    document.getElementById('income-category').style.display = 'none';
});
// ==========================
// Update password
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const passwordForm = document.getElementById("passwordForm");

    if (passwordForm) {
        passwordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const oldPass = document.getElementById("oldPassword").value;
            const newPass = document.getElementById("newPassword").value;

            // Validation
            if (newPass.length < 6) {
                alert("❌ New password must be at least 6 characters.");
                return;
            }

            try {
                // Send to backend
                const res = await fetch("/update-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: 1, // replace with dynamic logged-in user ID
                        oldPassword: oldPass,
                        newPassword: newPass,
                    }),
                });

                if (!res.ok) {
                    throw new Error("Network error or server not available");
                }

                const result = await res.json();

                if (result.success) {
                    alert("✅ " + result.message);
                    passwordForm.reset();
                } else {
                    alert("❌ " + result.message);
                }

            } catch (err) {
                console.error("Update password error:", err);
                alert("⚠️ Could not update password. Check console for details.");
            }
        });
    }
});

// ==========================
// Upload photo
// ==========================

// document.getElementById("photoForm").addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     formData.append("userId", 1);

//     const res = await fetch("/upload-photo", {
//         method: "POST",
//         body: formData,
//     });
//     const result = await res.json();
//     alert(result.message);
// });
// ==========================
// Logout
// ==========================

document.getElementById("logoutBtn").addEventListener("click", async () => {
    const res = await fetch("/logout", { method: "POST" });
    const result = await res.json();
    alert(result.message);
    window.location.href = "/login"; // redirect to login page

});

// ==========================
//Profile toggle
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const profileToggle = document.querySelector(".profile-toggle");
    const dropbtn = document.querySelector(".dropbtn");

    // Toggle dropdown on button click
    if (dropbtn) {
        dropbtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileToggle.classList.toggle("active");
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.profile-toggle')) {
            profileToggle.classList.remove("active");
        }
    });

    // Close dropdown when a menu item is clicked (optional)
    const dropdownItems = document.querySelectorAll(".dropdown-content a");
    dropdownItems.forEach(item => {
        item.addEventListener("click", () => {
            profileToggle.classList.remove("active");
        });
    });
});






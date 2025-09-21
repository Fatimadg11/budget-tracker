document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm");
    const expenseHistoryTable = document.querySelector("#expenseHistoryTable tbody");
    const totalAmountParagraph = document.querySelector("#w-s p:nth-child(2)");
    const totalIncomeParagraph = document.querySelector("#t-i p:nth-child(2)");
    const balanceParagraph = document.querySelector("#balance p:nth-child(2)");
    const deleteAllButton = document.getElementById("delete-expense");

    let totalExpenses = 0;
    let totalIncome = 0;
    let transactionId = 0;

    // Set today's date by default
    document.getElementById("date").valueAsDate = new Date();

    // ADD EXPENSE
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const typeRadio = document.querySelector('input[name="category"]:checked');
        const date = document.getElementById("date").value;
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const location = document.getElementById("location").value;
        const category = document.querySelector('input[name="form"]:checked');

        if (!typeRadio || !date || !description || isNaN(amount) || amount <= 0 || !location || !category) {
            alert("⚠️ Please fill in all fields");
            return;
        }

        // Update totals
        if (typeRadio.value === "Income") {
            totalIncome += amount;
            totalIncomeParagraph.innerText = `₦${totalIncome.toFixed(2)}`;
        } else {
            totalExpenses += amount;
            totalAmountParagraph.innerText = `₦${totalExpenses.toFixed(2)}`;
        }

        // Update balance
        const netBalance = totalIncome - totalExpenses;
        balanceParagraph.innerText = `₦${netBalance.toFixed(2)}`;
        balanceParagraph.style.color = netBalance > 0 ? "green" : netBalance < 0 ? "red" : "grey";

        // Add row to table
        const newRow = expenseHistoryTable.insertRow();
        const currentId = transactionId++;

        newRow.dataset.id = currentId;
        newRow.dataset.type = typeRadio.value;
        newRow.dataset.amount = amount;

        newRow.insertCell(0).innerText = typeRadio.value;
        newRow.insertCell(1).innerText = new Date(date).toLocaleDateString();
        newRow.insertCell(2).innerText = description;
        newRow.insertCell(3).innerText = `₦${amount.toFixed(2)}`;
        newRow.insertCell(4).innerText = location;
        newRow.insertCell(5).innerText = category.value;

        // Delete button
        const deleteCell = newRow.insertCell(6);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.classList.add("deleteExpenseBtn");
        deleteCell.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            if (confirm("Delete this expense?")) {
                adjustTotals(newRow);
                newRow.remove();
            }
        });

        // Send to backend (optional)
        fetch("/add-expense", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type: typeRadio.value,
                date,
                description,
                amount,
                location,
                category: category.value
            })
        }).catch(err => console.error("Backend error:", err));

        // Reset form
        expenseForm.reset();
        document.getElementById("date").valueAsDate = new Date();
        document.getElementById("expense-radio").checked = true;
    });

    // DELETE ALL
    deleteAllButton.addEventListener("click", () => {
        if (confirm("Delete all expenses?")) {
            expenseHistoryTable.innerHTML = "";
            totalExpenses = 0;
            totalIncome = 0;
            totalAmountParagraph.innerText = "₦0.00";
            totalIncomeParagraph.innerText = "₦0.00";
            balanceParagraph.innerText = "₦0.00";
            balanceParagraph.style.color = "grey";
        }
    });

    // Helper to adjust totals when deleting
    function adjustTotals(row) {
        const type = row.dataset.type;
        const amount = parseFloat(row.dataset.amount);

        if (type === "Income") {
            totalIncome -= amount;
            totalIncomeParagraph.innerText = `₦${totalIncome.toFixed(2)}`;
        } else {
            totalExpenses -= amount;
            totalAmountParagraph.innerText = `₦${totalExpenses.toFixed(2)}`;
        }

        const netBalance = totalIncome - totalExpenses;
        balanceParagraph.innerText = `₦${netBalance.toFixed(2)}`;
        balanceParagraph.style.color = netBalance > 0 ? "green" : netBalance < 0 ? "red" : "grey";
    }
});

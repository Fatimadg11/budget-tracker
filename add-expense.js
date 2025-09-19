
document.getElementById("addExpenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const expense = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        amount: document.getElementById("amount").value,
        date: document.getElementById("date").value,
        description: document.getElementById("description").value
    };

    console.log("Expense submitted:", expense);

    // Example POST request to backend
    fetch("/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    })
        .then(res => res.json())
        .then(data => {
            alert(data.message || "Expense added!");
        })
        .catch(err => console.error("Error:", err));
});

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

// Simple client-side handling of adding expenses to a list
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const deleteFormBtn = document.getElementById("deleteFormBtn");

// ADD EXPENSE
expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const desc = document.getElementById("description").value;
    const amount = document.getElementById("amount").value;
    const location = document.getElementById("location").value;

    // create new list item
    const li = document.createElement("li");
    li.innerHTML = `
      ${date} | ${desc} | ₦${amount} | ${location}
      <button class="deleteExpenseBtn">Delete</button>
    `;

    // delete this specific expense
    li.querySelector(".deleteExpenseBtn").addEventListener("click", () => {
        li.remove();
    });

    expenseList.appendChild(li);
    expenseForm.reset(); // clear inputs after adding
});

// CLEAR FORM (Delete button in the form itself)
deleteFormBtn.addEventListener("click", () => {
    expenseForm.reset();
});


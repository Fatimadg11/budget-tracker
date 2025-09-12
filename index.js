// document.addEventListener("DOMContentLoaded", () => {
//     const addExpenseButton = document.getElementById("add_expense");
//     const expenseHistoryTable = document.querySelector("table");
//     const totalAmountParagraph = document.querySelector("#w-s p:nth-child(2)");
//     const totalIncomeParagraph = document.querySelector("#t-i p:nth-child(2)");
//     const balanceParagraph = document.querySelector("#balance p:nth-child(2)");

//      let totalAmount = 0;
//      let totalIncome = 0;

//     addExpenseButton.addEventListener("click", () => {
//         const radio = document.querySelector('input[name="category"]:checked');
//         const date = document.getElementById("date").value;
//         const description = document.getElementById("description").value;
//         const amount = parseFloat(document.getElementById("amount").value);
//         const location = document.getElementById("location").value;
//         const category = document.querySelector('input[name="form"]:checked');

//         if (!radio || !date || !description || isNaN(amount) || amount <= 0 || !location || !category) {
//             alert("Please fill in all fields with valid information.");
//             return;
//         }

//         if (radio.value === "Income") {
//             totalIncome += amount;
//             totalIncomeParagraph.innerText = `Total: N${totalIncome.toFixed(2)}`;
//         } else {
//             totalAmount += amount;
//             totalAmountParagraph.innerText = `Total: N${totalAmount.toFixed(2)}`;
//         }

//         const netBalance = totalIncome - totalAmount;
//         balanceParagraph.innerText = `Total: N${netBalance.toFixed(2)}`;

//         const newRow = expenseHistoryTable.insertRow(-1);
//         newRow.insertCell(0).innerText = radio.value;
//         newRow.insertCell(1).innerText = new Date(date).toLocaleDateString();
//         newRow.insertCell(2).innerText = description;
//         newRow.insertCell(3).innerText = `N${amount.toFixed(2)}`;
//         newRow.insertCell(4).innerText = location;
//         newRow.insertCell(5).innerText = category.value;

//         radio.checked = false;
//         category.checked = false;
//         document.getElementById("date").value = '';
//         document.getElementById("description").value = '';
//         document.getElementById("amount").value = '';
//         document.getElementById("location").value = '';
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
            const addExpenseButton = document.getElementById("add_expense");
            const expenseHistoryTable = document.querySelector("#transactions-table tbody");
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

            // // Initialize category display
            // expenseCategories.style.display = 'block';
            // incomeCategories.style.display = 'none';

            // Category type switching
            // categoryRadios.forEach(radio => {
            //     radio.addEventListener('change', function() {
            //         if (this.value === 'Expense') {
            //             expenseCategories.style.display = 'block';
            //             incomeCategories.style.display = 'none';
            //         } else if (this.value === 'Income') {
            //             expenseCategories.style.display = 'block';
            //             incomeCategories.style.display = 'none';
            //         }
            //         // Clear category selection
            //         const categoryInputs = document.querySelectorAll('input[name="form"]');
            //         categoryInputs.forEach(input => input.checked = false);
            //     });
            // });

            // Add transaction
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
                
                // Color code balance
                if (netBalance > 0) {
                    balanceParagraph.style.color = 'green';
                } else if (netBalance < 0) {
                    balanceParagraph.style.color = 'red';
                } else {
                    balanceParagraph.style.color = 'grey';
                }

                // Create new row
                const newRow = expenseHistoryTable.insertRow();
                const currentTransactionId = transactionId++;

                // Store transaction data
                newRow.dataset.transactionId = currentTransactionId;
                newRow.dataset.type = radio.value;
                newRow.dataset.amount = amount;

                newRow.insertCell(0).innerText = radio.value;
                newRow.insertCell(1).innerText = new Date(date).toLocaleDateString();
                newRow.insertCell(2).innerText = description;
                newRow.insertCell(3).innerText = `N${amount.toFixed(2)}`;
                newRow.insertCell(4).innerText = location;
                newRow.insertCell(5).innerText = category.value;

                // Clear form
                radio.checked = false;
                if (category) category.checked = false;
                document.getElementById("date").valueAsDate = new Date();
                document.getElementById("description").value = '';
                document.getElementById("amount").value = '';
                document.getElementById("location").value = '';
                
                // Reset to expense categories
                document.getElementById('expense-radio').checked = true;
                expenseCategories.style.display = 'block';
                incomeCategories.style.display = 'none';

                alert("Transaction added successfully!");
            });

            // Row selection for deletion
            expenseHistoryTable.addEventListener("click", (e) => {
                if (e.target.tagName === "TD") {
                    const clickedRow = e.target.parentNode;

                    // Remove previous selection
                    if (selectedRow) {
                        selectedRow.classList.remove('selected-row');
                    }

                    // Select new row
                    selectedRow = clickedRow;
                    selectedRow.classList.add('selected-row');
                }
            });

            // Delete functionality
            deleteButton.addEventListener("click", () => {
                if (!selectedRow || selectedRow.cells.length === 0) {
                    alert("Please select a transaction to delete by clicking on it.");
                    return;
                }

                if (confirm("Are you sure you want to delete this transaction?")) {
                    const rowType = selectedRow.dataset.type;
                    const rowAmount = parseFloat(selectedRow.dataset.amount);

                    // Update totals
                    if (rowType === "Income") {
                        totalIncome -= rowAmount;
                        totalIncomeParagraph.innerText = `N${totalIncome.toFixed(2)}`;
                    } else {
                        totalAmount -= rowAmount;
                        totalAmountParagraph.innerText = `N${totalAmount.toFixed(2)}`;
                    }

                    // Update net balance
                    const newNetBalance = totalIncome - totalAmount;
                    balanceParagraph.innerText = `N${newNetBalance.toFixed(2)}`;
                    
                    // Color code balance
                    // if (newNetBalance > 0) {
                    //     balanceParagraph.style.color = 'green';
                    // } else if (newNetBalance < 0) {
                    //     balanceParagraph.style.color = 'red';
                    // } else {
                    //     balanceParagraph.style.color = 'black';
                    // }

                    // Remove the row
                    selectedRow.remove();
                    selectedRow = null;
                    
                    
                }
            });
        });
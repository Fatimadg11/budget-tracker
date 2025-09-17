"lets all talk here"

"this is viki !!!!!"

"hello everyone i am the boss say yes sir"

"harry be for real"

"check the pic"



        // <div>
        //     <label class="Category" for="expense-category">Category:</label>
        //     <select id="expense-category" name="Category">
        //         <option value="food">Food</option>
        //         <option value="transport">Transport</option>
        //         <option value="entertainment">Entertainment</option>
        //         <option value="bills">Bills</option>
        //         <option value="other">Other</option>
        //     </select>
        // </div>



        < !DOCTYPE html >
                <html lang="en">

                        <head>
                                <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                                <title>Weekly Budget Tracker</title>
                                                <link rel="stylesheet" href="index.css">
                                                        <style>
                                                                body {
                                                                        font - family: Arial, sans-serif;
                                                                background: #fafafa;
                                                                color: #333;
                                                                margin: 0;
                                                                padding: 0;
    }

                                                                header {
                                                                        padding: 15px 30px;
                                                                background: #fbeaeb;
                                                                display: flex;
                                                                justify-content: space-between;
                                                                align-items: center;
                                                                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                                                                position: sticky;
                                                                top: 0;
                                                                z-index: 1000;
    }

                                                                header a {
                                                                        text - decoration: none;
                                                                color: #444;
                                                                margin-right: 20px;
    }

                                                                h1 {
                                                                        text - align: center;
                                                                margin: 20px 0;
                                                                font-size: 28px;
                                                                color: #444;
    }

                                                                /* Dashboard summary */
                                                                .summary {
                                                                        display: grid;
                                                                grid-template-columns: repeat(3, 1fr);
                                                                gap: 15px;
                                                                margin: 20px;
    }

                                                                .card {
                                                                        background: #fff;
                                                                padding: 20px;
                                                                border-radius: 10px;
                                                                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                                                                text-align: center;
    }

                                                                /* Categories */
                                                                .categories {
                                                                        margin: 20px;
                                                                display: grid;
                                                                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                                                                gap: 15px;
    }

                                                                .category-card {
                                                                        background: #fff;
                                                                padding: 15px;
                                                                border-radius: 10px;
                                                                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                                                                text-align: center;
    }

                                                                /* Expense history */
                                                                .history {
                                                                        margin: 20px;
                                                                background: #fff;
                                                                padding: 20px;
                                                                border-radius: 10px;
                                                                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }

                                                                table {
                                                                        width: 100%;
                                                                border-collapse: collapse;
                                                                margin-top: 15px;
    }

                                                                th,
                                                                td {
                                                                        padding: 10px;
                                                                text-align: left;
                                                                border-bottom: 1px solid #ddd;
    }

                                                                th {
                                                                        background: #f5f5f5;
    }

                                                                /* Buttons */
                                                                button {
                                                                        padding: 8px 14px;
                                                                border: none;
                                                                border-radius: 6px;
                                                                cursor: pointer;
                                                                background: #fbeaeb;
                                                                color: #444;
                                                                margin-top: 10px;
    }

                                                                button:hover {
                                                                        background: #f7dcdc;
    }

                                                                /* Forms */
                                                                form input,
                                                                form select {
                                                                        margin: 6px 0;
                                                                padding: 8px;
                                                                border: 1px solid #ccc;
                                                                border-radius: 6px;
                                                                width: 100%;
    }
                                                        </style>
                                                </head>

                                                <body>

                                                        <!-- header -->
                                                        <header>
                                                                <a href="about.html">About Us</a>
                                                                <div class="profile-toggle">
                                                                        <div class="dropdown-content">
                                                                                <a href="settings.html">Settings</a>
                                                                                <a href="login.html">Log Out</a>
                                                                        </div>
                                                                </div>
                                                        </header>

                                                        <h1>Weekly Budget Tracker</h1>

                                                        <!-- Summary -->
                                                        <div class="summary">
                                                                <div class="card">
                                                                        <h3>Total Expense</h3>
                                                                        <p>0.00</p>
                                                                </div>
                                                                <div class="card">
                                                                        <h3>Total Income</h3>
                                                                        <p>0.00</p>
                                                                </div>
                                                                <div class="card">
                                                                        <h3>Net Balance</h3>
                                                                        <p>0.00</p>
                                                                </div>
                                                        </div>

                                                        <!-- Expense / Income Form -->
                                                        <section class="card" style="margin:20px;">
                                                                <h2>Add New Expense</h2>
                                                                <form id="expense-form">
                                                                        <label>
                                                                                <input type="radio" name="category" value="Expense"> Expense
                                                                        </label>
                                                                        <label>
                                                                                <input type="radio" name="category" value="Income"> Income
                                                                        </label><br><br>

                                                                                Date:<input type="date" id="date">
                                                                                        Description:<input type="text" id="description" placeholder="What was it?">
                                                                                                Amount:<input type="number" id="amount" placeholder="How much?">
                                                                                                        Location:<input type="text" id="location" placeholder="Where?">

                                                                                                                <button type="button" id="add_expense">Add Expense</button>
                                                                                                        </form>
                                                                                                </section>

                                                                                                <!-- Categories -->
                                                                                                <h2 style="margin-left:20px;">Categories</h2>
                                                                                                <div class="categories">
                                                                                                        <div class="category-card">Food<br>0.00</div>
                                                                                                        <div class="category-card">Transport<br>0.00</div>
                                                                                                        <div class="category-card">Shopping<br>0.00</div>
                                                                                                        <div class="category-card">Entertainment<br>0.00</div>
                                                                                                        <div class="category-card">Investments<br>0.00</div>
                                                                                                        <div class="category-card">Loans<br>0.00</div>
                                                                                                        <div class="category-card">Clothing<br>0.00</div>
                                                                                                        <div class="category-card">Others<br>0.00</div>
                                                                                                </div>

                                                                                                <!-- Expense History -->
                                                                                                <div class="history">
                                                                                                        <h2>Expense History</h2>
                                                                                                        <table id="expenseHistoryTable">
                                                                                                                <thead>
                                                                                                                        <tr>
                                                                                                                                <th>Income/Expense</th>
                                                                                                                                <th>Date</th>
                                                                                                                                <th>Description</th>
                                                                                                                                <th>Amount</th>
                                                                                                                                <th>Location</th>
                                                                                                                                <th>Category</th>
                                                                                                                        </tr>
                                                                                                                </thead>
                                                                                                                <tbody>
                                                                                                                        <!-- Records go here -->
                                                                                                                </tbody>
                                                                                                        </table>
                                                                                                </div>

                                                                                                <script src="index.js"></script>
                                                                                        </body>

                                                                                </html>

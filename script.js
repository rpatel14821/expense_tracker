document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const expenseName = document.getElementById("expense-name").value;  
        const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
        const expenseCategory = document.getElementById("expense-category").value;
        const expenseDate = document.getElementById("expense-date").value;

        const expense = {
            id: Date.now(),
            name: expenseName,
            amount: expenseAmount,
            category: expenseCategory,
            date: expenseDate
        };

        expenses.push(expense);

        displayExpenses();

        expenseForm.reset();
    });

    expenseList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            const expenseId = parseInt(event.target.getAttribute("data-id"));
            expenses = expenses.filter(expense => expense.id !== expenseId);
            displayExpenses();
            updateTotalAmount();
        }

        if (event.target.classList.contains("edit")) {
            const expenseId = parseInt(event.target.getAttribute("data-id"));
            const expense = expenses.find(expense => expense.id === expenseId);
            const expenseName = expense.name;
            const expenseAmount = expense.amount;
            const expenseCategory = expense.category;
            const expenseDate = expense.date;

            document.getElementById("expense-name").value = expenseName;
            document.getElementById("expense-amount").value = expenseAmount;
            document.getElementById("expense-category").value = expenseCategory;
            document.getElementById("expense-date").value = expenseDate;

            expenses = expenses.filter(expense => expense.id !== expenseId);
            displayExpenses();
            updateTotalAmount();
        }
    });

    filterCategory.addEventListener("change", function (event) {
        const selectedCategory = event.target.value;
        const filteredExpenses = selectedCategory === "all" ? expenses : expenses.filter(expense => expense.category === selectedCategory);
        displayExpenses(filteredExpenses);
        updateTotalAmount(filteredExpenses);
    });

    function displayExpenses(filteredExpenses = expenses) {
        expenseList.innerHTML = "";

        filteredExpenses.forEach(expense => {
            const expenseItem = document.createElement("tr");
            expenseItem.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit" data-id="${expense.id}">Edit</button>
                    <button class="delete" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseList.appendChild(expenseItem);
        });
    }

    function updateTotalAmount(filteredExpenses = expenses) {
        const total = filteredExpenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalAmount.textContent = `${total.toFixed(2)}`;
    }
});
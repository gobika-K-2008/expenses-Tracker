let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveData();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    displayTransactions();
}

function deleteTransaction(id) {

    transactions = transactions.filter(transaction => transaction.id !== id);

    saveData();

    displayTransactions();
}

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function displayTransactions() {

    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.className = `transaction ${transaction.type}`;

        li.innerHTML = `
            <span>
                <strong>${transaction.description}</strong><br>
                ₹${transaction.amount}
            </span>

            <button class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    const balance = income - expense;

    document.getElementById("income").textContent = `₹${income}`;
    document.getElementById("expense").textContent = `₹${expense}`;
    document.getElementById("balance").textContent = `₹${balance}`;
}

displayTransactions();

const priority = [];
var lowPriority = [];
var highPriority = [];

// Function to add new data to priority array
function addPriority() {
    var name = document.getElementById("namePriority").value;
    let rating = document.getElementById("ratePriority").value;
    let expense = document.getElementById("expenseNbr").value;

    const check = priority.find(priority => priority.name === name);

    if (check != null) {
        alert("The priority is already on the list")
    } else {
        const newPriority = {
            name,
            rating,
            expense
        };

        priority.push(newPriority);
        loadPriority();
    }

    document.getElementById("namePriority").value = "";
    document.getElementById("ratePriority").value = 1;
    document.getElementById("expenseNbr").value = "";
    disableButton();
}

// Function to populate priority list table
function loadPriority() {

    clear();
    disabledDeleteButtonCheckRadio();
    disabledArrowBtn();

    let currentPage = document.getElementById("pr-page").innerHTML;

    if (priority.length > 0 && currentPage > 1) {

        document.getElementById("prev-btn").disabled = false;

        for (let i = (currentPage - 1) * 5; i < priority.length; i++) {
            document.getElementById(`pr_${i - ((currentPage - 1) * 5)}`).innerHTML = priority[i].name;
            document.getElementById(`pr-rating-${i - ((currentPage - 1) * 5)}`).innerHTML = priority[i].rating;
            document.getElementById(`exp_${i - ((currentPage - 1) * 5)}`).innerHTML = "Rp. " + priority[i].expense + ",-";
            document.getElementById(`btn-delete-${i - ((currentPage - 1) * 5)}`).disabled = false;
            document.getElementById(`checkExp${i - ((currentPage - 1) * 5)}`).disabled = false;

            if (i === i + 4 && priority.length != i) {
                document.getElementById("next-btn").disabled = false;
                break;
            } else if (i === priority.length) {
                document.getElementById("next-btn").disabled = true;
            }
        };

    } else if (priority.length > 0) {

        for (let i = 0; i < priority.length; i++) {
            document.getElementById(`pr_${i}`).innerHTML = priority[i].name;
            document.getElementById(`pr-rating-${i}`).innerHTML = priority[i].rating;
            document.getElementById(`exp_${i}`).innerHTML = "Rp. " + priority[i].expense + ",-";
            document.getElementById(`btn-delete-${i}`).disabled = false;
            document.getElementById(`checkExp${i}`).disabled = false;

            if (i === 4 && priority.length != i) {
                document.getElementById("next-btn").disabled = false;
                break;
            } else if (i <= 4) {
                disabledArrowBtn();
            };
        };
    };
}

// Funtion to disabled arrow button in priority list
function disabledArrowBtn() {
    document.getElementById("prev-btn").disabled = true;
    document.getElementById("next-btn").disabled = true;
}

// Function to disabled delete button
function disabledDeleteButtonCheckRadio() {
    for (let i = 0; i <= 4; i++) {
        document.getElementById(`btn-delete-${i}`).disabled = true;
        document.getElementById(`checkExp${i}`).disabled = true;
    }
}

// Function to disable all button if requirements not fullfiled
function disableButton() {
    if (priority.length === 0) {
        document.getElementById("sort-asc-btn").disabled = true;
        document.getElementById("sort-desc-btn").disabled = true;
        document.getElementById("calc-bal-btn").disabled = true;
        document.getElementById("btn-sort-all-priority").disabled = true;
        document.getElementById("btn-sort-low-priority").disabled = true;
        document.getElementById("btn-sort-high-priority").disabled = true;
    } else {
        document.getElementById("sort-asc-btn").disabled = false;
        document.getElementById("sort-desc-btn").disabled = false;       

        document.getElementById("monthlyIncome").addEventListener('keyup', e => {
            if (e.target.value === "") {
                document.getElementById("calc-bal-btn").disabled = true;
            } else {
                document.getElementById("calc-bal-btn").disabled = false;
            }
        })
    }
}

// Function for sorting priority based on rating (ascend) 
function sortAsc() {
    priority.sort((a, b) => b.rating - a.rating);
    document.getElementById("sort-asc-btn").disabled = true;
    document.getElementById("sort-desc-btn").disabled = false;
    loadPriority();
}

// Function for sorting priority based on rating (descend)
function sortDesc() {
    priority.sort((a, b) => a.rating - b.rating);
    document.getElementById("sort-desc-btn").disabled = true;
    document.getElementById("sort-asc-btn").disabled = false;
    loadPriority();
}

// Function for next arrow button
function nextPage() {
    let page = document.getElementById("pr-page").innerHTML;

    page++;

    document.getElementById('pr-page').innerHTML = page;

    loadPriority();
}

// Funtion for previous arrow button
function prevPage() {
    let page = document.getElementById("pr-page").innerHTML;

    page--;

    document.getElementById("pr-page").innerHTML = page;

    loadPriority();
}

// Clear priority function
function clear() {
    for (let i = 0; i <= 4; i++) {
        document.getElementById(`pr_${i}`).innerHTML = "";
        document.getElementById(`pr-rating-${i}`).innerHTML = "";
        document.getElementById(`exp_${i}`).innerHTML = "";
    }
}

// Delete priority function
function deletePriority(rowNbr) {
    var name = document.getElementById(`pr_${rowNbr}`).innerHTML;
    const index = priority.findIndex(priority => priority.name === name);
    priority.splice(index, 1);
    loadPriority();
}

// Function to disabled modal button if the form empty
function disableModalBtn() {
    document.getElementById("btn-save-modal").disabled = true;

    document.getElementById("namePriority").addEventListener('keyup', e => {
        if (e.target.value === "") {
            document.getElementById("btn-save-modal").disabled = true;
        } else {
            document.getElementById("expenseNbr").addEventListener('keyup', f => {
                if (f.target.value === "") {
                    document.getElementById("btn-save-modal").disabled = true;
                } else {
                    document.getElementById("btn-save-modal").disabled = false;
                }
            })
        }
    })
}

// Function to reset input field in modal
function closeModal() {
    document.getElementById("namePriority").value = "";
    document.getElementById("expenseNbr").value = "";
}

// To generate expenses for balance table
function generateExpense(code) {
    const expContainer = document.querySelector("#expense-container");
    let income = document.getElementById("monthlyIncome").value;
    document.getElementById("monthly-income").innerHTML = "Rp. " + income + ",-";

    document.getElementById("btn-sort-all-priority").disabled = false;
    document.getElementById("btn-sort-low-priority").disabled = false;
    document.getElementById("btn-sort-high-priority").disabled = false;

    for (let i = 1; i <= 4; i++) {
        document.getElementById(`fade-el-bal${i}`).style.display = "block";
    }

    switch (code) {
        case "1":
            if (expContainer.childNodes.length === 0) {
                for (let i = 0; i < priority.length; i++) {

                    const prior = document.createElement("p");
                    prior.id = `prior${i};`
                    prior.innerHTML = priority[i].name;
                    document.getElementById("priority-container").appendChild(prior);

                    const para = document.createElement("p");
                    para.id = `para${i};`
                    para.innerHTML = "Rp. " + priority[i].expense + ",-";
                    document.getElementById("expense-container").appendChild(para);

                    document.getElementById("btn-sort-all-priority").disabled = true;
                }
            } else {

                removeExpense();

                for (let i = 0; i < priority.length; i++) {

                    const prior = document.createElement("p");
                    prior.id = `prior${i};`
                    prior.innerHTML = priority[i].name;
                    document.getElementById("priority-container").appendChild(prior);

                    const para = document.createElement("p");
                    para.id = `para${i};`
                    para.innerHTML = "Rp. " + priority[i].expense + ",-";
                    document.getElementById("expense-container").appendChild(para);

                    document.getElementById("btn-sort-all-priority").disabled = true;
                }
            }

            calculateBalance("1");
            break;

        case "2":

            if (expContainer.childNodes.length === 0) {

                for (let i = 0; i < lowPriority.length; i++) {

                    const prior = document.createElement("p");
                    prior.id = `prior${i};`
                    prior.innerHTML = lowPriority[i].name;
                    document.getElementById("priority-container").appendChild(prior);

                    const para = document.createElement("p");
                    para.id = `para${i};`
                    para.innerHTML = "Rp. " + lowPriority[i].expense + ",-";
                    document.getElementById("expense-container").appendChild(para);

                }
            } else {
                removeExpense();

                for (let i = 0; i < lowPriority.length; i++) {

                    const prior = document.createElement("p");
                    prior.id = `prior${i};`
                    prior.innerHTML = lowPriority[i].name;

                    document.getElementById("priority-container").appendChild(prior);

                    const para = document.createElement("p");
                    para.id = `para${i};`
                    para.innerHTML = "Rp. " + lowPriority[i].expense + ",-";
                    document.getElementById("expense-container").appendChild(para);

                }
            }

            calculateBalance("2");
            break;

        case "3":
            if (expContainer.childNodes.length === 0) {
                for (let i = 0; i < highPriority.length; i++) {

                    const prior = document.createElement("p");
                    prior.id = `prior${i};`
                    prior.innerHTML = highPriority[i].name;
                    document.getElementById("priority-container").appendChild(prior);

                    const para = document.createElement("p");
                    para.id = `para${i};`
                    para.innerHTML = "Rp. " + highPriority[i].expense + ",-";
                    document.getElementById("expense-container").appendChild(para);

                }
            } else {
                removeExpense();

                for (let i = 0; i < highPriority.length; i++) {

                    const prior = document.createElement("p");
                    prior.id = `prior${i};`
                    prior.innerHTML = highPriority[i].name;
                    document.getElementById("priority-container").appendChild(prior);

                    const para = document.createElement("p");
                    para.id = `para${i};`
                    para.innerHTML = "Rp. " + highPriority[i].expense + ",-";
                    document.getElementById("expense-container").appendChild(para);

                }
            }

            calculateBalance("3")
            break;
    }
}

// To refresh expense in balance table
function removeExpense() {

    const expContainer = document.querySelector("#expense-container");

    if (expContainer.childNodes.length === 1) {
        for (let i = 0; i <= expContainer.childNodes.length; i++) {
            const elementPrior = document.getElementById(`prior${i};`);
            const elementExpense = document.getElementById(`para${i};`);

            elementPrior.remove();
            elementExpense.remove();

        }
    } else {
        for (let i = 0; i <= expContainer.childNodes.length + 1; i++) {
            const elementPrior = document.getElementById(`prior${i};`);
            const elementExpense = document.getElementById(`para${i};`);

            elementPrior.remove();
            elementExpense.remove();

        }
    }
}

// Calculate balance for balance table
function calculateBalance(code) {

    let income = document.getElementById("monthlyIncome").value;
    let balance = 0;
    let totalExpense = 0;

    document.getElementById("your-balance").innerHTML = "";

    switch (code) {
        case "1":
            for (let i = 0; i < priority.length; i++) {
                let expense = priority[i].expense;
                totalExpense = Number(totalExpense) + Number(expense);
            }

            balance = income - totalExpense;
            document.getElementById("your-balance").innerHTML = "Rp. " + balance + ",-";
            break;

        case "2":
            for (let i = 0; i < lowPriority.length; i++) {
                let expense = lowPriority[i].expense;
                totalExpense = Number(totalExpense) + Number(expense);
            }

            balance = income - totalExpense;
            document.getElementById("your-balance").innerHTML = "Rp. " + balance + ",-";
            break;

        case "3":
            for (let i = 0; i < highPriority.length; i++) {
                let expense = highPriority[i].expense;
                totalExpense = Number(totalExpense) + Number(expense);
            }

            balance = income - totalExpense;
            document.getElementById("your-balance").innerHTML = "Rp. " + balance + ",-";
            break;
    }
}

// Function to sort expenses based on priority rating
function sortExpense(code) {

    switch (code) {
        case "1":

            if (lowPriority.length != 0) {
                lowPriority.length = 0;
            }

            lowPriority = priority.filter(priority => priority.rating <= 5);
            generateExpense("2");
            document.getElementById("btn-sort-low-priority").disabled = true;
            document.getElementById("btn-sort-high-priority").disabled = false;
            break;

        case "2":

            if (highPriority.length != 0) {
                highPriority.length = 0;
            }

            highPriority = priority.filter(priority => priority.rating > 5);
            generateExpense("3");
            document.getElementById("btn-sort-low-priority").disabled = false;
            document.getElementById("btn-sort-high-priority").disabled = true;
            break;
    }
}
const priority = [];
var lowPriority = [];
var highPriority = [];

const hiPriorObj = {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
}

const lowPriorObj = {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
}

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
            expense,
            check: "0"
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

    let currentPage = document.getElementById("pr-page").value;

    if (priority.length > 0 && currentPage > 1) {
        document.getElementById("prev-btn").disabled = false;

        for (let i = (currentPage - 1) * 5; i < priority.length; i++) {
            document.getElementById(`pr_${i - ((currentPage - 1) * 5)}`).innerHTML = priority[i].name;
            document.getElementById(`pr-rating-${i - ((currentPage - 1) * 5)}`).innerHTML = priority[i].rating;
            document.getElementById(`exp_${i - ((currentPage - 1) * 5)}`).innerHTML = "Rp. " + priority[i].expense + ",-";
            document.getElementById(`btn-delete-${i - ((currentPage - 1) * 5)}`).disabled = false;
            document.getElementById(`checkExp${i - ((currentPage - 1) * 5)}`).disabled = false;

            if (priority[i].check === "1") {
                document.getElementById(`checkExp${i - ((currentPage - 1) * 5)}`).checked = true;

                document.getElementById(`table-row-${i - (currentPage - 1) * 5}`).style.backgroundColor = "#C3E5AE";
                document.getElementById((`table2-row-${i - (currentPage - 1) * 5}`)).style.backgroundColor = "#C3E5AE";
            } else if (priority[i].check === "0") {
                document.getElementById(`checkExp${i - ((currentPage - 1) * 5)}`).checked = false;

                document.getElementById((`table-row-${i - (currentPage - 1) * 5}`)).style.color = "black";
                document.getElementById((`table-row-${i - (currentPage - 1) * 5}`)).style.backgroundColor = "white";
                document.getElementById((`table2-row-${i - (currentPage - 1) * 5}`)).style.color = "black";
                document.getElementById((`table2-row-${i - (currentPage - 1) * 5}`)).style.backgroundColor = "white";
            }

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

            if (priority[i].check === "1") {
                document.getElementById(`checkExp${i}`).checked = true;

                document.getElementById((`table-row-${i}`)).style.backgroundColor = "#C3E5AE";
                document.getElementById((`table2-row-${i}`)).style.backgroundColor = "#C3E5AE";
            } else if (priority[i].check === "0") {
                document.getElementById(`checkExp${i}`).checked = false;

                document.getElementById((`table-row-${i}`)).style.color = "black";
                document.getElementById((`table-row-${i}`)).style.backgroundColor = "white";
                document.getElementById((`table2-row-${i}`)).style.color = "black";
                document.getElementById((`table2-row-${i}`)).style.backgroundColor = "white";
            }

            if (i === 4 && priority.length != i) {
                document.getElementById("next-btn").disabled = false;
                break;
            } else if (i <= 4) {
                disabledArrowBtn();
            };
        };
    };
}

// function saveData() {

//     // convert JSON object to string
//     fs.writeFile ("priority.json", JSON.stringify(priority), function(err) {
//         if (err) throw err;
//         console.log('complete');
//         }
//     );
// }

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
        document.getElementById(`checkExp${i}`).checked = false;
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

function ifRadioButtonChecked(rowNbr) {
    if (document.getElementById(`checkExp${rowNbr}`).checked === true) {
        var name = document.getElementById(`pr_${rowNbr}`).innerHTML;

        const index = priority.findIndex(priority => {
            return priority.name === name
        });
        priority[index].check = "1";

        loadPriority();
    } else if (document.getElementById(`checkExp${rowNbr}`).checked === false) {
        var name = document.getElementById(`pr_${rowNbr}`).innerHTML;

        const index = priority.findIndex(priority => {
            return priority.name === name
        });
        priority[index].check = "0";

        loadPriority();
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
    let page = document.getElementById("pr-page").value;
    page++;
    document.getElementById('pr-page').value = page;

    loadPriority();
}

// Funtion for previous arrow button
function prevPage() {
    let page = document.getElementById("pr-page").value;
    page--;
    document.getElementById("pr-page").value = page;

    loadPriority();
}

// Clear priority function
function clear() {
    for (let i = 0; i <= 4; i++) {
        document.getElementById(`pr_${i}`).innerHTML = "";
        document.getElementById(`pr-rating-${i}`).innerHTML = "";
        document.getElementById(`exp_${i}`).innerHTML = "";

        document.getElementById((`table-row-${i}`)).style.color = "black";
        document.getElementById((`table-row-${i}`)).style.backgroundColor = "white";
        document.getElementById((`table2-row-${i}`)).style.color = "black";
        document.getElementById((`table2-row-${i}`)).style.backgroundColor = "white";
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
                    if (priority[i].check === "0") {
                        const prior = document.createElement("p");
                        prior.id = `prior${i};`
                        prior.innerHTML = priority[i].name;
                        document.getElementById("priority-container").appendChild(prior);

                        const para = document.createElement("p");
                        para.id = `para${i};`
                        para.innerHTML = "Rp. " + priority[i].expense + ",-";
                        document.getElementById("expense-container").appendChild(para);
                    }
                }
                document.getElementById("btn-sort-all-priority").style.color = "white";
                document.getElementById("btn-sort-all-priority").style.backgroundColor = "magenta";
                document.getElementById("btn-sort-low-priority").style.color = "black";
                document.getElementById("btn-sort-low-priority").style.backgroundColor = "#EFEFEF";
                document.getElementById("btn-sort-high-priority").style.color = "black";
                document.getElementById("btn-sort-high-priority").style.backgroundColor = "#EFEFEF";
            } else {
                removeExpense();

                for (let i = 0; i < priority.length; i++) {

                    if (priority[i].check === "0") {
                        const prior = document.createElement("p");
                        prior.id = `prior${i};`
                        prior.innerHTML = priority[i].name;
                        document.getElementById("priority-container").appendChild(prior);

                        const para = document.createElement("p");
                        para.id = `para${i};`
                        para.innerHTML = "Rp. " + priority[i].expense + ",-";
                        document.getElementById("expense-container").appendChild(para);
                    }
                }
                document.getElementById("btn-sort-all-priority").style.color = "white";
                document.getElementById("btn-sort-all-priority").style.backgroundColor = "magenta";
                document.getElementById("btn-sort-low-priority").style.color = "black";
                document.getElementById("btn-sort-low-priority").style.backgroundColor = "#EFEFEF";
                document.getElementById("btn-sort-high-priority").style.color = "black";
                document.getElementById("btn-sort-high-priority").style.backgroundColor = "#EFEFEF";
            }
            calculateBalance("1");
            showChart();
            break;

        case "2":
            if (expContainer.childNodes.length === 0) {
                for (let i = 0; i < lowPriority.length; i++) {
                    if (lowPriority[i].check === "0") {
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
            } else {
                removeExpense();

                for (let i = 0; i < lowPriority.length; i++) {
                    if (lowPriority[i].check === "0") {
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
            }
            calculateBalance("2");
            break;

        case "3":
            if (expContainer.childNodes.length === 0) {
                for (let i = 0; i < highPriority.length; i++) {
                    if (highPriority[i].check === "0") {
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
            } else {
                removeExpense();

                for (let i = 0; i < highPriority.length; i++) {
                    if (highPriority[i].check === "0") {
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
            }
            calculateBalance("3")
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

            document.getElementById("btn-sort-low-priority").style.color = "white";
            document.getElementById("btn-sort-low-priority").style.backgroundColor = "magenta";
            document.getElementById("btn-sort-high-priority").style.color = "black";
            document.getElementById("btn-sort-high-priority").style.backgroundColor = "#EFEFEF";
            document.getElementById("btn-sort-all-priority").style.color = "black";
            document.getElementById("btn-sort-all-priority").style.backgroundColor = "#EFEFEF";
            break;

        case "2":
            if (highPriority.length != 0) {
                highPriority.length = 0;
            }

            highPriority = priority.filter(priority => priority.rating > 5);
            generateExpense("3");

            document.getElementById("btn-sort-high-priority").style.color = "white";
            document.getElementById("btn-sort-high-priority").style.backgroundColor = "magenta";
            document.getElementById("btn-sort-low-priority").style.color = "black";
            document.getElementById("btn-sort-low-priority").style.backgroundColor = "#EFEFEF";
            document.getElementById("btn-sort-all-priority").style.color = "black";
            document.getElementById("btn-sort-all-priority").style.backgroundColor = "#EFEFEF";
            break;
    }
}

// To refresh expense in balance table
function removeExpense() {
    const expContainer = document.querySelector("#expense-container");
    const priorContainer = document.querySelector("#priority-container")

    while (expContainer.firstChild) {
        expContainer.removeChild(expContainer.firstChild);
    };

    while (priorContainer.firstChild) {
        priorContainer.removeChild(priorContainer.firstChild)
    };
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

function inputCalc(id) {
    let num = parseInt(id);
    var input = document.getElementById("calc-input");
    var output = document.getElementById("calc-output");

    switch (num <= 9) {
        // Number button calculator
        case true:
            input.focus();

            if (input.value.toString().match(/[^0-9]/g) === null) {
                if (output.value.toString().includes("=")) {
                    output.value = "Ans: " + input.value;
                    input.value = "";
                }
            }
            input.value += num;
            break;

        case false:
            switch (num) {
                // Dot calculator button
                case 10:
                    // const arrOperators = ["+", "-", "*", ':'];
                    // let newIndexOperator, biggestIndexOperator = 0;

                    // var lastIn = input.value.substring(input.value.length - 1);
                    // let lastIndexDot = input.value.lastIndexOf(".");

                    // for (let i = 0; i < arrOperators.length; i++) {
                    //     newIndexOperator = input.value.lastIndexOf(arrOperators[i]);
                    //     if (newIndexOperator > biggestIndexOperator) {
                    //         biggestIndexOperator = newIndexOperator;
                    //     }
                    // }
                    // if (input.value !== "") {
                    //     if (lastIndexDot === -1 && biggestIndexOperator === 0) {
                    //         input.value += ".";
                    //         lastIndexDot = input.value.lastIndexOf(".");
                    //     } else if (lastIndexDot < biggestIndexOperator) {
                    //         if (lastIn !== "*" && lastIn !== "+" && lastIn !== "-" && lastIn !== ":" && lastIn !== "*" && lastIn !== ".") {
                    //             input.value += ".";
                    //         }
                    //     }
                    // } else if (input.value === "") {
                    //     input.value = "0."
                    // }

                    input.focus();

                    if (input.value.toString().match(/[^0-9]/g) === null) {
                        if (output.value.toString().includes("=")) {
                            output.value = "Ans: " + input.value;
                            input.value = "";
                        }
                    }
                    if (input.value !== "") {
                        input.value += "000";
                    }
                    break;

                    // Delete calculator button
                case 11:
                    var currentInput = input.value;
                    var length = input.value.length;
                    var newInput = currentInput.substring(0, length - 1);
                    input.value = newInput;
                    break;

                    // Delete all calculator button
                case 12:
                    if ((input !== "") || (output !== "")) {
                        document.getElementById("calc-input").value = "";
                        document.getElementById("calc-output").value = "";
                    }
                    break;
            }
            break;
    }
    resetPositionCursorForCalcInput();
}

// Function to input for calculator by calculator button
function onclickCalcBtn(elemId, operator) {
    calcBtn = document.getElementById(elemId);
    input = document.getElementById("calc-input");
    var lastIn = input.value.substring(input.value.length - 1);

    if (input.value !== "") {
        if (lastIn !== "*" && lastIn !== "+" && lastIn !== "-" && lastIn !== ":" && lastIn !== "*" && lastIn !== ".") {
            input.focus();
            input.value += operator;
        }
    }
    resetPositionCursorForCalcInput();
}

function resetPositionCursorForCalcInput() {
    input = document.getElementById("calc-input");

    input.addEventListener("click", function () {
        if (input.value !== "") {
            const temp = input.value;
            input.value = "";
            input.value = temp;
        }
    })

    input.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
        }
    })
}

// Function to input for calculator by keyboard
function keyboardCalcInput() {
    let howManyPressed = 0;
    input = document.getElementById("calc-input");

    input.addEventListener("input", function () {
        if (isNaN(input.value)) {
            input.value = input.value.replace(/[a-zA-Z`~!@#$^&()_|\=?;'",<>\{\}\[\]\\\/]/g, '');
        }
    })

    input.addEventListener("keypress", function (e) {
        if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === ":" || e.key === ".") {
            if (input.value === "") {
                e.preventDefault();
            } else {
                if (howManyPressed != 0) {
                    e.preventDefault();
                }
                Number(howManyPressed++);
            }
        } else if (e.key === "Enter") {
            calculateOutputCalc();
        } else {
            howManyPressed = 0;
        }
    })
}

// Function to calculate the final result from the operations
function calculateOutputCalc() {
    const operator = []; // Array for storing all operators from input
    const number = []; // Array for storing all numbers from input
    const importantNumber = []; // Array for storing numbers to calculate first
    const importantOperator = []; // Array for storing first to calculate operators such as * and :
    var importantNumberIn = []; // Array for storing newfound number to calculate first after checking all the numbers from input
    var importantOperatorIn = []; // Array for storing newfound important operators such as * and : after checking all operators from input

    var operatorIn, numberIn;
    let outputIn, importantOutput = "";

    var input = document.getElementById("calc-input").value;
    document.getElementById("calc-output").value = input + "=";

    // Loop for insert all operators from input to operator array
    for (let i = 0; i < input.length; i++) {
        operatorIn = input[i];
        if (operatorIn === "+" || operatorIn === "-" || operatorIn === "*" || operatorIn === ":") {
            operator.push(operatorIn);
        }
    }

    // Loop for insert all numbers from input to number array
    for (let i = 0; i < operator.length + 1; i++) {
        numberIn = parseInt(input);
        if (operator[i - 1] === "-") {
            number.push("-" + numberIn);
        } else {
            number.push(numberIn);
        }
        input = input.substring(numberIn.toString().length + 1);
    }

    // Check and find important numbers and operators (* and :) from operator array and insert to important numbers and important operators array
    for (let i = 0; i < operator.length; i++) {
        if ((operator[i] === "*") || (operator[i] === ":")) { // Check if the operators is important to calculate first
            importantNumberIn.push(number[i]);
            importantOperatorIn.push(operator[i]);

            if ((operator[i + 1] !== "*") && (operator[i + 1] !== ":") || (i === operator.length)) {
                importantNumberIn.push(number[i + 1]);
                importantNumber.push(importantNumberIn);
                importantOperator.push(importantOperatorIn);

                importantNumberIn = [];
                importantOperatorIn = [];
            }
        }
    }

    // Loop to remove all important numbers from number array so it can be identified which number will be calculated first
    for (let i = operator.length; i >= 0; i--) {
        if ((operator[i] === "*") || (operator[i] === ":")) {
            if ((operator[i - 1] === "*") || (operator[i - 1] === ":")) {
                number.splice(i + 1, 1);
                operator.splice(i, 1);
            } else {
                number.splice(i + 1, 1);
                operator.splice(i, 1);
                number.splice(i, 1);
            }
        }
    }

    // Calculate first the important numbers with its important operators
    for (let i = 0; i < importantNumber.length; i++) {
        for (let j = 0; j < importantNumber[i].length; j++) {
            if (j - importantNumber[i].length !== -1) {
                switch (importantOperator[i][j]) {

                    // Important operators of * or times
                    case "*":
                        if (importantOutput === "") {
                            importantOutput = Number(importantNumber[i][j] * importantNumber[i][j + 1]);
                        } else {
                            importantOutput = Number(importantOutput * importantNumber[i][j + 1]);
                        }
                        break;

                        // Important operators of : or divide
                    case ":":
                        if (importantOutput === "") {
                            importantOutput = Number(importantNumber[i][j] / importantNumber[i][j + 1]);
                        } else {
                            importantOutput = Number(importantOutput / importantNumber[i][j + 1]);
                        }
                        break;
                }
            } else if (j - importantNumber[i].length === -1) {
                importantNumber[i].splice(0, j + 1, importantOutput);
                importantOutput = "";
                break;
            }
        }
    }

    for (let i = 0; i < importantNumber.length; i++) {

        // Loop for push these new numbers from the result of calculation of * and : operations to number array, 
        // so the remaining numbers can be calculated as a final output
        for (let j = 0; j < importantNumber[i].length; j++) {
            number.push(importantNumber[i][j]);
        }
    }

    outputIn = number[0];

    // Loop for calculation of final output from number array
    for (let i = 1; i < number.length; i++) {
        if (number[i].toString().includes("-") === true) {
            outputIn = Number(outputIn - (-number[i]));
        } else {
            outputIn = Number(outputIn + number[i]);
        }
    }

    // Check if the number can be calculated, if not alert will show
    if (isNaN(outputIn)) {
        alert("Calculator is not able to calculate");
        document.getElementById("calc-input").value = "";
    } else {
        document.getElementById("calc-input").value = outputIn;
    }
}

function showChart() {
    const hiChart = document.getElementById('hi-prior-chart').getContext('2d');
    const lowChart = document.getElementById('low-prior-chart').getContext('2d');
    const income = document.getElementById("monthlyIncome").value;

    let hiBalance = 0,
        lowBalance = 0;
    let hiTotalExpense = 0,
        lowTotalExpense = 0;

    destroyChart();

    highPriority = priority.filter(priority => priority.rating >= 6);
    lowPriority = priority.filter(priority => priority.rating <= 5);

    for (let i = 0; i < highPriority.length; i++) {
        let expense = highPriority[i].expense;
        hiTotalExpense = Number(hiTotalExpense) + Number(expense);
    }
    hiBalance = Number(income - hiTotalExpense);

    for (let i = 0; i < lowPriority.length; i++) {
        let expense = lowPriority[i].expense;
        lowTotalExpense = Number(lowTotalExpense) + Number(expense);
    }
    lowBalance = income - lowTotalExpense;

    hiPriorObj.data.labels.push("Balance");
    hiPriorObj.data.datasets[0].data.push(hiBalance);
    hiPriorObj.data.datasets[0].backgroundColor.push("#C7D36F");
    hiPriorObj.data.datasets[0].borderColor.push("#C7D36F");

    lowPriorObj.data.labels.push("Balance");
    lowPriorObj.data.datasets[0].data.push(lowBalance);
    lowPriorObj.data.datasets[0].backgroundColor.push("#C7D36F");
    lowPriorObj.data.datasets[0].borderColor.push("#C7D36F");

    for (let i = 0; i < priority.length; i++) {
        if (priority[i].rating >= 6) {
            hiPriorObj.data.labels.push(priority[i].name);
            hiPriorObj.data.datasets[0].data.push(priority[i].expense);

            let color = "#";
            for (let i = 0; i < 3; i++) {
                color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
            }            
            hiPriorObj.data.datasets[0].backgroundColor.push(color);
            hiPriorObj.data.datasets[0].borderColor.push(color);

        } else if (priority[i].rating < 6) {
            lowPriorObj.data.labels.push(priority[i].name);
            lowPriorObj.data.datasets[0].data.push(priority[i].expense);

            let color = "#";
            for (let i = 0; i < 3; i++) {
                color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
            }   
            lowPriorObj.data.datasets[0].backgroundColor.push(color);
            lowPriorObj.data.datasets[0].borderColor.push(color);
        }
    }
    const hiPriorChart = new Chart(hiChart, hiPriorObj);
    const lowPriorChart = new Chart(lowChart, lowPriorObj);
}

function destroyChart() {
    const hiChart = Chart.getChart("hi-prior-chart");
    const lowChart = Chart.getChart("low-prior-chart");

    if (hiPriorObj.data.labels.length > 0 || lowPriorObj.data.labels.length > 0) {
        hiChart.destroy();
        lowChart.destroy();

        hiPriorObj.data.labels = [];
        lowPriorObj.data.labels = [];
        hiPriorObj.data.datasets[0].data = []
        lowPriorObj.data.datasets[0].data = []
        hiPriorObj.data.datasets[0].backgroundColor = [];
        lowPriorObj.data.datasets[0].backgroundColor = [];
        hiPriorObj.data.datasets[0].borderColor = [];
        lowPriorObj.data.datasets[0].borderColor = []
    }
}
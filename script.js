// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user's entered value
    if (userEnteredValue.trim() != 0) { 
        addBtn.classList.add("active"); //activating the add button
    } else {
        addBtn.classList.remove("active"); //unactivating the add button
    }
}

showTasks(); //calling showTask function

addBtn.onclick = () => { 
    let userEnteredValue = inputBox.value; 
    let getLocalStorageData = localStorage.getItem("New Todo"); 
    if (getLocalStorageData == null) { //if the local storage has no data then we will be
        listArray = []; //creating a blank array here
    } else {
        listArray = JSON.parse(getLocalStorageData); //converting json string into a js object
    }
    listArray.push(userEnteredValue); //pushing new values in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //changing js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactivating the button once we are done adding a task
}

function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; 
    if (listArray.length > 0) { //if the length of the array is greater than 0
        deleteAllBtn.classList.add("active"); //then we will activate the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactiving the delete button for deleting process
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; 
    inputBox.value = ""; //once task is added, leave the output field blank.
}

// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //deleting or removing the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //calling the function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
    listArray = []; 
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //calling the function
}

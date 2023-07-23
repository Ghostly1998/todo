//get all required buttons or feilds for manipulation.
const addTaskBtn = document.getElementsByClassName('add-task-btn')[0];
const form = document.getElementsByClassName('form')[0];
const submitBtn = document.getElementsByClassName('submit-btn')[0];
let date = document.getElementById('date');
let importance = document.getElementById('importance');
let taskHead = document.getElementById('task');
let description = document.getElementById('description');

//array to save tasks entered by user.
let taskArray = [];

//add event listener for displaying form to add new task
addTaskBtn.addEventListener('click',() => {
    form.style.display = 'block';
    const section = document.getElementsByClassName('section')[0];
    const ul = document.getElementsByClassName('task-list')[0];
    //blur background when form opens
    ul.style.filter = 'blur(10px)'
    //empty any existing values in the feild.
    date.value = '';
    importance.value = '';
    taskHead.value = '';
    description.value = '';    
});

//event listener for add task button which runs a function.
submitBtn.addEventListener('click', getValues);

//event listener for closing button.
const closeBtn = document.getElementsByClassName('close-btn')[0];
closeBtn.addEventListener('click', () => {
    //unblur background and hide form.
    const ul = document.getElementsByClassName('task-list')[0];
    ul.style.filter = 'none';
    form.style.display = 'none';
});


//get user entered values
function getValues() {
    const dateData = date.value;
    const impData = importance.value;
    const taskHeadData = taskHead.value;
    const descData = description.value;
    //store value inside an object
    let tempObj = {dateData, impData, taskHeadData, descData};
    //push object to the task array.
    taskArray.push(tempObj);
    //call localStorage to save data locally.
    storeLocally();
    //remove blur filter and hide form when add task button is clicked.
    const ul = document.getElementsByClassName('task-list')[0];
    //remove the background blur and hide form.
    ul.style.filter = 'none';
    form.style.display = 'none';
}

//store user entered values locally.
function storeLocally() {
    localStorage.setItem('taskArray', JSON.stringify(taskArray)); 
    displayTask();  
}

// display all tasks stored locally on the main page.
function displayTask() {
    //get locally stored data and save it in a variable.
    let storedData = JSON.parse(localStorage.taskArray);
    taskArray = storedData;
    //check if any tasks exists locally
    if(taskArray.length !== 0) {
        //get ul element and create child element for displaying tasks.
        const ul = document.getElementsByClassName('task-list')[0];
        //removing already displayed tasks.
        ul.innerHTML = '';
        storedData.forEach(element => {
            //format to display data in.
            let displayData = `${element.taskHeadData},to be accomplished on ${element.dateData}. Description: ${element.descData}, Priority: ${element.impData}.`;
            //creating li for displaying tasks.
            const li = document.createElement('li');
            // setting li id
            li.setAttribute('id', `item-${storedData.indexOf(element)}`);
            // assigning value to li for displaying
            li.innerText = displayData;
            //creating a delete button.
            const deleteBtn = document.createElement('button');
            // giving id to delete btn
            deleteBtn.setAttribute('id', `item-${storedData.indexOf(element)}`);
            deleteBtn.innerText = 'Delete';
            //appending button and li as children.
            li.appendChild(deleteBtn);
            ul.appendChild(li);

            //adding event listener for deleting tasks
            deleteBtn.addEventListener('click', () => {
                let btnValue = deleteBtn.getAttribute('id');
                // console.log(btnValue);
                deleteTask(btnValue);                
            });
        });
        
    }  
}

//delete funtion
function deleteTask(btnValue) {
    //getting th specific li element using id
    const li = document.getElementById(btnValue);
    //removing the element from li
    li.remove();
    let btnString = String(btnValue);
    btnString = btnString.slice(5);
    //removing the deleted element from array
    taskArray.splice(btnString, 1);
    //updating list in local storage
    storeLocally();
}

//run this function for displaying tasks from local storage
displayTask();
//Empty local storage
// localStorage.setItem('taskArray', '');
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

//event listener for add task button.
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
        //get locally stored data and parse it into readable form.
        // console.log(storedData[0].taskHeadData);
        //get ul element and create child element for displaying tasks.
        const ul = document.getElementsByClassName('task-list')[0];
        storedData.forEach(element => {
            let displayData = `${element.taskHeadData},to be accomplished on ${element.dateData}. Description: ${element.descData}, Priority: ${element.impData}.`;
            //creating li for displaying tasks.
            const li = document.createElement('li');
            li.setAttribute('id', `item-${storedData.indexOf(element)}`);
            li.textContent += displayData;
            ul.appendChild(li);
        });
        
    }
    // if no tasks are available, prompt user to enter new tasks.
    else {
        prompt('No Tasks Available! Please enter new task.');
    }    
}



displayTask();
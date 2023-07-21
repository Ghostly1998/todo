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
    //empty any existing values in the feild.
    date.value = '';
    importance.value = '';
    taskHead.value = '';
    description.value = '';
    
});

//submit user added task and display the task.
submitBtn.addEventListener('click', getValues);


//get user entered values
function getValues() {
    const dateData = date.value;
    const impData = importance.value;
    const taskHeadData = taskHead.value;
    const descData = description.value;
    //check if the feildds are filled or not
    let tempObj = {dateData, impData, taskHeadData, descData};
    
    taskArray.push(tempObj);
    console.log('not');
    
    //call localStorage to save data locally.
    storeLocally();

    //Making form disappear once submit button is clicked.
    form.style.display = 'none';
}

//store user entered values locally.
function storeLocally() {
    localStorage.setItem('taskArray', JSON.stringify(taskArray)); 
    displayTask();  
}

// display all tasks on the main page
function displayTask() {
    //get locally stored data and save it in a variable.
    let storedData = JSON.parse(localStorage.taskArray);
    taskArray = storedData;
    console.log(taskArray);
    //check if any tasks exists locally
    if(taskArray.length !== 0) {
        //get locally stored data and parse it into readable form.
        // console.log(storedData[0].taskHeadData);
        //get ul element and create child element for displaying tasks.
        const ul = document.getElementsByClassName('task-list')[0];
        storedData.forEach(element => {
            let displayData = `${element.taskHeadData},to be accomplished on ${element.dateData}. Description: ${element.descData}, Priority: ${element.impData}.`;
            // console.log(displayData)
            const li = document.createElement('li');
            li.setAttribute('id', `item-${storedData.indexOf(element)}`);
            li.textContent += displayData;
            ul.appendChild(li);
        });
        
    }
        
    else {
        prompt('No Tasks Available! Please enter new task.');
    }    
}



displayTask();
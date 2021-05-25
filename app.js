if (!localStorage.getItem("tasks")){
    localStorage.setItem ("tasks", "[]")
}

class Task  {
    constructor(setBy, setFor, description, dueBy, status, ID){
      this.setBy = setBy;
      this.setFor = setFor;
      this.description = description;
      this.dueBy = dueBy;
      this.status = status;
      this.ID = ID;
  }
}

let taskArray = JSON.parse(localStorage.getItem("tasks"))


function makeTaskObjects (setBy, setFor, description, dueBy, status){
    console.log("im running")
    let ID = 0
    //"a surprise tool that will help us later"
    //stored in taskarray
    if(taskArray.length == 0){
        ID = 1
    } else {
        let lastItemID = taskArray[taskArray.length-1].ID
        ID = lastItemID + 1
    }

    let myObject = new Task(setBy, setFor, description, dueBy, status, ID);
    

    taskArray.push(myObject)
    updateLocalStorage()
}

class TaskManager{

    showTask(task){
        // console.log (task)
        const tasklist = document.getElementById('cardsHere')
        const taskInnerHtml = `       
         <div class="card-body bg-transparent bg-img-2" id="picture">
        <div>
          <span class="badge badge-warning">set by</span>
          <span class="setBy"></span>
        </div>
        <div>
          <span class="badge badge-warning">set for</span>
          <span class="setFor"></span>
        </div>
        <div>
          <span class="badge badge-warning">description</span>
          <span class="description"></span>
        </div>
        <div>
          <span class="badge badge-warning">due by</span>
          <span class="dueBy"></span>
        </div>
        <div>
          <span class="badge badge-warning">status</span>
          <span class="status"></span>
        </div>
        <div>
            <button class="delete btn btn-danger" card-id=${task.ID}>delete</button>
        </div>
      </div>
      
      `
       
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('id','task-' + task.ID);
        card.innerHTML = taskInnerHtml

        card.querySelector('span.setBy').innerText = task.setBy;
        card.querySelector('span.setFor').innerText = task.setFor;
        card.querySelector('span.description').innerText = task.description;
        card.querySelector('span.dueBy').innerText = task.dueBy;
        card.querySelector('span.status').innerText = task.status;

        tasklist.appendChild(card);
        
        card.querySelector('button.delete').addEventListener('click',e => {const taskId = e.currentTarget.getAttribute('card-id');
        this.deleteTask(taskId);
        })
    }


    deleteTask(id){
        console.log(id)
        let index = taskArray.findIndex(obj => obj.ID == id) //index is equal to the item in task array that is seacrhing for an object that has the same id as the item clicked so it can delete it
        console.log(index)
        taskArray.splice(index, 1) //once the item is fopund and deleted local storage is updated and redisplayed 
        updateLocalStorage()
        displayAll()
        }
    
}

function displayAll(){
   let toClear = document.getElementById('cardsHere')
   toClear.innerHTML = ""
    for (let task of taskArray){
        taskManager.showTask(task)}
    }


const taskManager = new TaskManager ();

function add() {
    let description = document.querySelector("#exampleInputdescription").value;
    let dueBy = document.querySelector("#due-day").value;
    let status = document.querySelector("#exampleFormControlSelect1").value;
    let setBy = document.querySelector("#set-by").value;
    let setFor = document.querySelector("#set-for").value;

    //validation
    let allValuesValid = validateForm(setBy, setFor, description, dueBy, status)
    if(allValuesValid == true){
            console.log("all valid")
            makeTaskObjects (setBy, setFor, description, dueBy, status)
            // console.log(taskArray)
            displayAll()
        } else {
            console.log("Not valid")
        }
  

    // if valid show in card

}


function validateForm (setBy, setFor, description, dueBy, status){
let isAllValid = false

if (((setBy.length > 0) && (setBy.length < 20)) && ((setFor.length > 0) && (setFor.length < 20)) && ((description.length > 0) && (description.length < 100)) && (dueBy) && (status)) {
    isAllValid = true
    return isAllValid;
 }
}

function updateLocalStorage(){
    localStorage.setItem("tasks", JSON.stringify(taskArray))
}

displayAll()

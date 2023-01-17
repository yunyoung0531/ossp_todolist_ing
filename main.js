let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let selectedMenu = "tab-all";
let filteredList = [];
let allDeleteBtn = document.querySelector(".allDelete");
//document.getElementById("allDelete").addEventListener("click", allDelete)
//const todoList = document.querySelector("#todoList");

addButton.addEventListener("mousedown", addTask);
allDeleteBtn.addEventListener("click", allDelete);
userInput.addEventListener("keyup", function (event) {
if (event.keyCode === 13) {
    addTask(event);
}
});
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = userInput.value;
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerator(),
  };

  taskList.push(task);
  userInput.value = "";
  render();
}

function render() {
  let result = "";
  list = [];
  if (selectedMenu === "tab-all") {
    list = taskList;
  } else {
    list = filteredList;
  }

  for (let i = 0; i < list.length; i++) {
    
    if (list[i].isComplete) {
      result += `
            <div class="task task-done" id="${list[i].id}">

            <div class="container_">
            <i class="far fa-heart js-heart heart"></i>
            </div>

            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-undo-alt"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } else if(!list[i].isComplete) {
      result += `
            <div class="task" id="${list[i].id}">

            <div class="button-box">
            <div class="container_">
            <i class="far fa-heart js-heart heart"></i>
            </div>
            </div>

            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = result;
  allDeleteBtn.addEventListener("click", allDelete);

  //------------------
// gets a reference to the heartDOm
const heartDOM = document.querySelector('.js-heart');
// initialized like to false when user hasnt selected
let liked = false;
// create a onclick listener
heartDOM.onclick = (event) => {
	// check if liked 
	liked = !liked; // toggle the like ( flipping the variable)
	
	// this is what we clicked on
	const target = event.currentTarget;
	
  //for (let i = 0; i < taskList.length; i++) {
    if (liked) {
      // remove empty heart if liked and add the full heart
      target.classList.remove('far');
      target.classList.add('fas', 'pulse');
    } else {
      // remove full heart if unliked and add empty heart
      target.classList.remove('fas');
      target.classList.add('far');
    }
  //}
  
}
heartDOM.addEventListener('animationend', (event) => {
event.currentTarget.classList.remove('pulse');
})
//------------------------------------
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }

  filter();
}

function allDelete() {
  for (let i = 0; i < taskList.length; i++) {
    taskList.splice(0, taskList.length);
    console.log("클리어")
  }
  filter()
}

function filter(e) {
  if (e) {
    selectedMenu = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  filteredList = [];
  if (selectedMenu === "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filteredList.push(taskList[i]);
      }
    }
  } else if (selectedMenu === "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}
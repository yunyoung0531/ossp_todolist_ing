//allDelete.js

let allDeleteBtn = document.querySelector(".allDelete");

allDeleteBtn.addEventListener("click", allDelete);

function allDelete(id) {

for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
    taskList.splice(0, taskList.length);
      //taskList.length = 0;
      //let ul = document.querySelector('ul').innerHTML ='';
    console.log("클리어")
    }
}
filter()

}
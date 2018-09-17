function removeTask(task_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      loadTasks();
    }
  };
  xhttp.open("GET", "../removeTask/" + task_id, true);
  xhttp.send();
}

function addTask() {
  var description = document.getElementById('newtasktext').value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      loadTasks();
    }
  };
  xhttp.open("POST", "../newTask", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send("description=" + description);
  document.getElementById('newtasktext').value = "";
}

var tasks = {};
function loadTasks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      tasks = JSON.parse(this.responseText);
      populateList();
    }
  };
  xhttp.open("GET", "../tasks", true);
  xhttp.send();
}

function populateList() {
  var innerList = "";
  for(var id in tasks) {
    innerList += `<div class="item" onclick="removeTask(${tasks[id].id})">${tasks[id].description}</div>`;
  }
  document.getElementById("today").innerHTML = "<h2>Today</h2>\n" + innerList;
}

var input = document.getElementById("newtasktext");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
       addTask();
    }
});

window.onload = function() {
	loadTasks();
}
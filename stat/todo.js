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
    innerList += `<li>${tasks[id].description} - <a href="#" onclick="removeTask(${tasks[id].id})">Remove</a></li>`;
  }
  document.getElementById("demo").innerHTML = "<ul>" + innerList + "</ul>";
}

var tags = {};
var tasks = {};
var current_tag = 0;
var last_tag = current_tag;

function removeTask(task_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      loadTasks();
      loadTags();
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
      loadTags();
    }
  };
  xhttp.open("POST", "../newTask", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send("description=" + description);
  document.getElementById('newtasktext').value = "";
}

function loadTasks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      tasks = JSON.parse(this.responseText);
      if(!tasks) {
      	alert('notags');
      }
      populateList();
    }
  };
  if(current_tag == 0) {
  	xhttp.open("GET", "../tasks", true);
  } else {
	xhttp.open("GET", "../tasks/" + current_tag, true);
  }
  xhttp.send();
}


function loadTags() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      tags = JSON.parse(this.responseText);
      populateTags();
    }
  };
  xhttp.open("GET", "../tags", true);
  xhttp.send();
}

function populateList() {
  var innerList = "";
  var late_label = 0;
  var today_label = 0;
  var tomorrow_label = 0;
  var this_week_label = 0;
  var rest_week_label = 0;
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  for(var id in tasks) {
 

    if(late_label == 0 && tasks[id].time_due != null && new Date(tasks[id].time_due).toDateString() < today.toDateString()) {
	innerList += `<h2 class="late">Late</h2>\n`;
	late_label = 1;
    }


    if(today_label == 0 && new Date(tasks[id].time_due).toDateString() == today.toDateString()) {
	innerList += "<h2>Today</h2>\n";
	today_label = 1;
    }
    
    if(tomorrow_label == 0 && new Date(tasks[id].time_due).toDateString() == tomorrow.toDateString()) {
	innerList += "<h2>Tomorrow</h2>\n";
	tomorrow_label = 1;
    }


    if(rest_week_label == 0 && tasks[id].time_due == null) {
	innerList += "<h2>Future Tasks</h2>\n";
	rest_week_label = 1;
    }

    innerList += `<div class="item"><div class="desc">${tasks[id].description}</div><div class="actions"><a href="#" onclick="removeTask(${tasks[id].id})">COMPLETE</a></div></div>`;
  }
  if(innerList == "") {
	  innerList = `<div class="center_message">All Done, no more todos for today!</div>`;
  }
  document.getElementById("today").innerHTML = innerList;
}

function populateTags() {
	current_tag = 0;
	last_tag = current_tag;
	var innerList = `<li><a href="#" onclick="swapTag(0)" id="tag_0">ALL</a></li>`;
	for(var id in tags) {
		innerList += `<li><a href="#" id="tag_${tags[id]}" onclick="swapTag('${tags[id]}')">${tags[id].toUpperCase()}</a></li>`
	}
	document.getElementById("tags").innerHTML = innerList;
	swapTag(current_tag);
}



function swapTag(name) {
	if(name == current_tag) {
		document.getElementById("tag_" + name).classList.add('active');
	} else {
		last_tag = current_tag;
		document.getElementById("tag_" + last_tag).classList.remove('active');
		document.getElementById("tag_" + name).classList.add('active');
		current_tag = name;
	}
	loadTasks();
}

function setHeadText() {
	var result = "Bobby Dilley";
	var d = new Date();
	var h = d.getHours();
	var tod = "";
	if (h < 12) {
	  tod = 'Morning'
	} else if (h < 18) {
	  tod = 'Afternoon'
	} else {
	  tod = 'Evening'
	}
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	result = days[d.getDay()] + " " + tod;
	document.getElementById('head_text').innerHTML = result;
}

var input = document.getElementById("newtasktext");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
       addTask();
       copy();
    }
});

window.onload = function() {
	setHeadText();
	loadTasks();
	loadTags();
}

function copy() {
  document.getElementById("textunder").innerHTML = document.getElementById("newtasktext").value
  .replace(/#\w+/gi, function (x) {
    return "<span class=\"red\">" + x + "</span>";
  })
  .replace(/@\w+/gi, function (x) {
    return "<span class=\"blue\">" + x + "</span>";
  });
}

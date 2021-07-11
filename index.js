var version = "1.0";
document.getElementById("version").innerHTML = version;
document.title += ' v' + version
getText("downloadFailReasons.txt");
setIDVariable()
setInterval(function(){ 
    if (id != document.getElementById("projectID").value) {
        getProjectStats(document.getElementById("projectID").value);
    } 
}, 000);


/* FUNCIONS GO BELOW THIS LINE */
async function getText(file) {
    var object = await fetch(file);
    var text = await object.text();
    document.getElementById("reasons").innerHTML = text;
  };

  function setIDVariable() {
    id = document.getElementById("projectID").value
  }

function downloadProject(project) {
    if (project) {
        console.log("Downloading project with the ID of " + project)
        document.getElementById('download').src = "http://projects.scratch.mit.edu/" + project;
    } else {
        alert("You need to a project ID into the text box.");
    }
}

function loadEmbed(project) {
if (project) {
    if (data.public) {
        document.getElementById("iframe").innerHTML = '<br><iframe src="https://scratch.mit.edu/projects/' + project + '/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>';
        } else {
            document.getElementById("iframe").innerHTML = '<br><iframe src="https://turbowarp.org/' + project + '/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>'; 
        }
} else {
    document.getElementById("iframe").innerHTML = '<br><iframe src="https://turbowarp.org/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>';
}

}

function seeInside(project) {
    if (project) {
        window.open("https://turbowarp.org/" + project + "/editor");
    } else {
        window.open("https://turbowarp.org/editor");
    }

};

function getProjectStats(project) {
    var apiURL = "http://api.scratch.mit.edu/projects/" + project;
    apiURL = "https://desolate-badlands-78322.herokuapp.com/" + apiURL;
    console.log(apiURL)
    fetchAPI(apiURL);
    var coolioPFP = 'https://uploads.scratch.mit.edu/users/avatars/' + data.author.id + '.png'
    coolioPFP = '<img src="' + coolioPFP + '" width="16px" height="16px" alt="' + data.author.username + '" style="position:relative; left:5px; top:2.5px;">'
    if (data.title) {
    document.getElementById("name").innerHTML = data.title;
    if (data.instructions) {
     document.getElementById("in").innerHTML = '<strong>Instructions</strong><br>' + replaceAll(data.instructions, '\n', '<br>');
    } else if (data.description) {
    document.getElementById("in").innerHTML = '<strong>Notes and Credits</strong><br>' + replaceAll(data.description, '\n', '<br>');
}
    if (data.description && data.instructions) {
        document.getElementById("in").innerHTML = '<strong>Instructions</strong><br>' + replaceAll(data.instructions, '\n', '<br>');
        document.getElementById("desc").innerHTML = '<strong>Notes and Credits</strong><br>' + replaceAll(data.description, '\n', '<br>');
    }

    setIDVariable();
    document.getElementById("creator").innerHTML = "Created by " + '<a href="http://scratch.mit.edu/users/' + data.author.username + '">' + data.author.username + coolioPFP + "</a>";
    document.getElementById("love-count").innerHTML = data.stats.loves;
    document.getElementById("fav-count").innerHTML = data.stats.favorites;
    document.getElementById("remix-count").innerHTML = data.stats.remixes;
    document.getElementById("view-count").innerHTML = data.stats.views;
    } else {
        document.getElementById("name").innerHTML = "";
    }
};

function validateNumber(evt) {
    var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
    // numbers   
    key >= 48 && key <= 57 ||
    // Numeric keypad
    key >= 96 && key <= 105 ||
    // Backspace and Tab and Enter
    key == 8 || key == 9 || key == 13 ||
    // Home and End
    key == 35 || key == 36 ||
    // left and right arrows
    key == 37 || key == 39 ||
    // Del and Ins
    key == 46 || key == 45) {
        // input is VALID
    }
    else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
};

async function fetchAPI(url) {
    
    // Storing response
    response = await fetch(url);
    
    // Storing data in form of JSON
    data = await response.json();
    console.log(data);
    if (response) {
        console.log("API request fuffiled");
        
    }
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }
  
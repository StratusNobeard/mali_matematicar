var numberOfTask = 0;
var userAnswers = [];
var initTasks;
var startGameTime;
var endGameTime;
var gameLevel;
var urlLogo;

// get the names
var imena = [
    "papuča",
    "ravnalo",
    "matematičar",
    "učenik",
    "gumica",
    "olovka",
    "natjecatelj",
    "Gandalf",
    "Yoda",
    "profesionalac"
];

var i = Math.floor(Math.random() * imena.length);
document.getElementById('nickname').placeholder = "npr: " + imena[i];


// Get the modal
var modal = document.getElementById("myModal");

var resultsModal = document.getElementById("gameResults");

// Get the button that opens the modal
var btn = document.getElementById("btnStartGame");

var btnResults = document.getElementById("btnResults");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

var spanResults = document.getElementsByClassName("resultsClose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  initGame();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

spanResults.onclick = function() {
    resultsModal.style.display = "none";
  }

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}*/

window.onclick = function(event) {
    if (event.target == resultsModal) {
      resultsModal.style.display = "none";
    }
  }


const gameSetup = {
    "low" : {
        "min": 0,
        "max": 10,
        "negative": false,
        "numberOfTasks": 10,
        "operations": [
            {
                "task" : "a + b"
            },
            {
                "task" : "a - b"
            }
        ]
    },
    "middle" : {
        "min": 0,
        "max": 50,
        "negative": false,
        "numberOfTasks": 10,
        "operations": [
            {
                "task" : "a + b"
            },
            {
                "task" : "a - b"
            }
        ]
    },
    "high" : {
        "min": 0,
        "max": 50,
        "negative": true,
        "numberOfTasks": 10,
        "operations": [
            {
                "task" : "a + b"
            },
            {
                "task" : "a - b"
            },
            {
                "task" : "a * b"
            },
            {
                "task" : "a / b"
            }
        ]
    }
}

function initGame() {
    document.getElementById('bar').style.display = "block";
    document.getElementById('much').style.display = "block";
    document.getElementById('Obar').style.display = "block";
    document.getElementById('send').style.display = "none";

    numberOfTask = 0;
    userAnswers = [];
    initTasks = '';

    const nickname = document.getElementById('nickname').value;
    if (nickname === '') {
        document.getElementById('greska1').innerHTML = `Niste upisali svoj nadimak! <img src="/assets/images/greska.png" class="greska">`;
        document.getElementById('greska1').style.display = "block";
        return;
    } else {
        var greska1 = document.getElementById('greska1');
        greska1.style.display = "none";
    }
    sessionStorage.setItem('nickname', nickname);

    gameLevel = document.getElementById('gameLevel').value;

    switch(Number(gameLevel)) {
        case 0 : {
            // low level
            urlLogo = 'assets/images/lagano.png';
            document.getElementById('tezina').innerHTML = "Težina: lagano";
            document.getElementById('tezina').style = "color: green;";
            document.getElementById('much').style = "color: green;";

            document.getElementById('myModal').classList.remove("teškoB");
            document.getElementById('myModal').classList.remove("srednjeB");
            document.getElementById('myModal').classList.add("laganoB");

            const setup = gameSetup.low;
            initTasks = initSetupGame(setup);
            console.log(initTasks);
            modal.style.display = "block";
            generateTask(initTasks[numberOfTask]);
            startGameTime = new Date();
            break;
        }
        case 1 : {
            // middle level
            urlLogo = 'assets/images/srednje.png';
            document.getElementById('tezina').innerHTML = "Težina: srednje";
            document.getElementById('tezina').style = "color: saddlebrown;";
            document.getElementById('much').style = "color: saddlebrown;";

            document.getElementById('myModal').classList.remove("teškoB");
            document.getElementById('myModal').classList.remove("laganoB");
            document.getElementById('myModal').classList.add("srednjeB");

            const setup = gameSetup.middle;
            initTasks = initSetupGame(setup);
            console.log(initTasks);
            modal.style.display = "block";
            generateTask(initTasks[numberOfTask]);
            startGameTime = new Date();
            break;
        }
        case 2 : {
            // high level
            urlLogo = 'assets/images/teško.png';
            document.getElementById('tezina').innerHTML = "Težina: teško";
            document.getElementById('tezina').style = "color: orangered;";
            document.getElementById('much').style = "color: orangered;";

            document.getElementById('myModal').classList.remove("laganoB");
            document.getElementById('myModal').classList.remove("srednjeB");
            document.getElementById('myModal').classList.add("teškoB");

            const setup = gameSetup.high;
            initTasks = initSetupGame(setup);
            console.log(initTasks);
            modal.style.display = "block";
            generateTask(initTasks[numberOfTask]);
            startGameTime = new Date();
            break;
        }
    }
}


function generateTask(task) {
    let html = '<h1>' + (numberOfTask + 1) + '. pitanje:</h1>';
    html += '<div class="gameTaskContainer">' + task.task + ' =</div>';
    document.getElementById('much').innerHTML = (numberOfTask + 1) + "/10";
    document.getElementById('bar').style.width = ((numberOfTask+1)*10) + "%";
    let viewAnswers = [];
    viewAnswers.push(generateRandomInteger(0,3));

    for(let i = 0; i < 3; i++) {

    let isNumber = false;

        do {
            let viewNumber = generateRandomInteger(0,3);
            if(viewAnswers.findIndex(el => el === viewNumber) === -1) {
                isNumber = true;
                viewAnswers.push(viewNumber);
            }
        } while(!isNumber);
    }

    console.log(viewAnswers);

    viewAnswers.forEach(el => {
        html += `<div class="form-check">
                <label class="form-check-label answer">` + task.answers[el] + `
                        <input class="form-check-input" type="radio" name="taskOption" id="taskOption`+el+`" value="`+el+`">
                        <span class="checkmark"></span>
                </label>
                </div>`
    });

    if(numberOfTask === (initTasks.length - 1)) {
        html += '<button type="button" class="Ingamebtn btn btn-success btn-lg" onClick="endGame()">Kraj igre -> </button>';
    } else {
        html += '<button type="button" class="Ingamebtn btn btn-info btn-lg" onClick="nextTask()">Sljedeće pitanje -> </button>';
    }

    numberOfTask ++;

    document.getElementById('gameContainer').innerHTML = html;
}

function nextTask() {
    var radios = document.getElementsByName('taskOption');
    var formValid = false;

    var i = 0;
    while(!formValid && i < radios.length) {
        if(radios[i].checked) {
            formValid = true;
            userAnswers.push(Number(radios[i].value));
        }
        i ++;
    }

    if(formValid) {
        generateTask(initTasks[numberOfTask]);
        var greska2 = document.getElementById('greska2');
        greska2.style.display = "none";
    } else {
        document.getElementById('greska2').innerHTML = `Niste odabrali niti jedan odgovor! <img src="/assets/images/greska.png" class="greska">`;
        document.getElementById('greska2').style.display = "block";
    }

}

function endGame() {
    var radios = document.getElementsByName('taskOption');
    var formValid = false;

    var i = 0;
    while(!formValid && i < radios.length) {
        if(radios[i].checked) {
            formValid = true;
            userAnswers.push(Number(radios[i].value));
        }
        i ++;
    }

    if(formValid) {
        endGameTime = new Date();
        var timeResult = timeBetweenDates(startGameTime, endGameTime);
        console.log(timeResult);
        let nickname = sessionStorage.getItem('nickname');
        var html = '<p>Vaše vrijeme za izvršavanje zadataka je: <b>' + formatTime(timeResult) + '</b></p>'
        const summary = summaryResults();
        html += summary.html;
        document.getElementById('gameContainer').innerHTML = html;
        saveData(nickname, timeResult, summary.rightAnswers ,userAnswers.length, gameLevel);
        resetGame();
    } else {
        document.getElementById('greska2').innerHTML = `Niste odabrali niti jedan odgovor! <img src="/assets/images/greska.png" class="greska">`;
        document.getElementById('greska2').style.display = "block";
    }
}

function summaryResults() {
    document.getElementById('greska2').style.display = "none";
    document.getElementById('bar').style.display = "none";
    document.getElementById('much').style.display = "none";
    document.getElementById('Obar').style.display = "none";
    document.getElementById('tezina').innerHTML = "Zadaci su rješeni!";
    document.getElementById('send').style.display = "block";
    document.getElementById('sendImg').src = urlLogo;

    var html = '';
    var rightAnswers = 0;
    userAnswers.forEach((answer, index) => {
        if(answer !== 0) {
            html += '<p class="badR">Vaš odgovor na <b>' + (index+1) + '. pitanje </b> (' + initTasks[index].task + ') je '+'<b>netočan</b>'+', odgovorili ste sljedeće, <b>'+initTasks[index].answers[answer]+'</b>, a točan odgovor je: <b>'+initTasks[index].answers[0]+'</b></p>';
        } else {
            rightAnswers ++;
            html += '<p class="goodR">Vaš odgovor na <b>' + (index+1) + '. pitanje </b> (' + initTasks[index].task + ') je '+'<b>točan</b>'+' , odgovorili ste sljedeće, <b>'+initTasks[index].answers[answer] +'</b></p>';
        }
    })

    object = new Object();
    object.html = '<div><p>Imate <b>' + rightAnswers + '</b> točna odgovora od ukupno ' + userAnswers.length + '   <em>('+(rightAnswers*10)+'% točnosti)</em></p><p><b>Bravo!</b></p></div>' + html;
    //object.html += ' <a href="game-setup.html"><button type="button" class="gamebtn btn btn-success btn-lg" onClick="window.location.href = "//index.html";">Pošaljite odgovore<img src="'+urlLogo+'" class="logoTežine-sm"></button> </></a>';
    object.rightAnswers = rightAnswers;
    return object;
}

function resetGame() {
    numberOfTask = 0;
    userAnswers = [];
    initTasks = '';
    document.getElementById('gameLevel').value = 0;
    document.getElementById('nickname').value = '';
}
function initSetupGame(setup) {
    let tasks = [];

    for(let i = 0; i < setup.numberOfTasks; i++) {
        let operationsNumber = setup.operations.length;
        let operation = setup.operations[generateRandomInteger(0, operationsNumber-1)].task;

        let a = generateRandomInteger(setup.min, setup.max);
        let b = generateRandomInteger(setup.min, setup.max);
        if(setup.negative === false) {
            if(operation.indexOf('-') !== -1) {
                if((a - b) < 0) {
                    b = generateRandomInteger(setup.min, a);
                }
            }
        }

        let result;

        if(operation.indexOf('/') !== -1) {
            while((a % b) != 0) {
                a = generateRandomInteger(setup.min, setup.max);
                b = generateRandomInteger(setup.min, setup.max);
            }
            operation = operation.replace("a", a);
            operation = operation.replace("b", b);
            result = eval(operation);
        } else {
            operation = operation.replace("a", a);
            operation = operation.replace("b", b);
            result = eval(operation);
        }

        let answers = [];

        answers.push(result);

        for(let i = 0; i < 3; i++) {
            let min = 0;
            if (result > 0) {
                if(result - 5 >= 0) {
                    min = result - 5;
                }
            }

            let isNumber = false;
            var genRes;

            do {

                genRes = generateRandomInteger(min, result + 5);

                if(genRes === result) {
                    genRes = generateRandomInteger(min, result + 5);
                }

                if(answers.findIndex(el => el === genRes) === -1) {
                    isNumber = true;
                }

            } while(!isNumber)

            answers.push(genRes);
        }

        let task = {
            "task": operation,
            "answers": answers
        }

        tasks.push(task);
    }

    return tasks;
}

function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max + 1 - min))
}

function timeBetweenDates(startTime, endTime) {
    var start = startTime;
    var end = endTime;
    var difference = end.getTime() - start.getTime();

    return difference;
  }

function formatTime(time) {
    var seconds = Math.floor(time / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    return hours + ':' + minutes + ':' + seconds;
}

function saveData(nickname, time, points, totalPoints) {
    fetch('http://imatosa.com/game/setdata.php?nickname='+nickname+'&time='+time+'&points='+points+'&totalPoints='+totalPoints+'&level='+gameLevel)
    .then((resp) => resp.json())
    .then(function(data) {
            console.log(data);
        })
    .catch(function(error) {
        console.log(error);
    });
}

btnResults.onclick = function() {
    fetch('https://imatosa.com/game/getdata.php')
    .then((resp) => resp.json())
    .then(function(data) {
        document.getElementById('gameResultsContainer').innerHTML = generateResults(data);
        resultsModal.style.display = "block";
        })
    .catch(function(error) {
        console.log(error);
    });
}


function generateResults(data) {
    string = "";

    data.forEach(row => {
        let time = Number(row.time) + ((row.totalPoints-row.points) * 5000);
        row.time = time;
    });

    data.sort(compareValues('time'));

    var level0 = data.filter(e => e.level == 0);
    var level1 = data.filter(e => e.level == 1);
    var level2 = data.filter(e => e.level == 2);
    var array = [level0, level1, level2];

    array.forEach((cell, index) => {
        var i = 1;
        var o = 0;
        var p = 0;
        var urlT = '';
        var tezinaS = '';
        if (index == 0) {
            o = 'leaderL';
            p = 'backL';
            urlT = 'assets/images/lagano.png';
            tezinaS = ' Lagana'
        }else if (index == 1) {
            o = 'leaderS';
            p = 'backS';
            urlT = 'assets/images/srednje.png';
            tezinaS = ' Srednja'
        }else if (index == 2) {
            o = 'leaderT';
            p = 'backT';
            urlT = 'assets/images/teško.png';
            tezinaS = ' Teška'
        }
        string += '<div class="'+ p +'"><em class="'+ o +'" style="font-size: 30px;"><img class="logoTežine-lg" src="' + urlT + '">'+tezinaS+' težina:</em><br/><br/>';
        cell.forEach(row => {
            string += '<div class="'+ o +'"><b>' + i + ') ' + row.nickname + ' - ' + formatTime(row.time) + ' - ' + row.points + '/' + row.totalPoints + '</b> - ' + moment(new Date(row.date)).format("DD.MM.YYYY. u HH:mm") +' sati</div><br/>';
            i ++;
        });
        string += '</div><br/><br/>';
    });
    return string;
}


function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  function getNames() {
    var i = Math.floor(Math.random() * imena.length);
    document.getElementById('nickname').placeholder = "npr: " + imena[i];
}
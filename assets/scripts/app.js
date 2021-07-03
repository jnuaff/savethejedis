const buttonStartGame = document.querySelector('.btn-start');
const buttonDefend = document.querySelector('.btn-defend');
const buttonAttack = document.querySelector('.btn-attack');
const bonusLifeEl = document.getElementById('bonus-life'); // get bonus life from UI
let hasBonusLife = true; // start boolean
let modal = document.getElementById("myModal");
let modalWin = document.querySelector(".modal-content");
let modalLose = document.querySelector(".modal-content-lose");
let buttonRetryWin = document.querySelector(".btn-retry-win");
let buttonRetryLose = document.querySelector(".btn-retry-lose");
let jedisSaved = document.getElementById('jedis-saved');
let finalJedisSaved = document.getElementById('final-jedis-saved'); // add number in final alert
let value = jedisSaved.innerHTML;

let jedi = document.querySelector('.obi-wan');
let c3po = document.querySelector('.c3po');
let luck = document.querySelector('.luck');
let kith = document.querySelector('.kith');
let tiranus = document.querySelector('.tiranus');
let plaegis = document.querySelector('.plaegis');
let maul = document.querySelector('.maul');
let darthVader = document.querySelector('.darth');
let jedis = ["obi-wan","c3po","luck","kith"];
let siths = ["darth","tiranus","plaegis","maul"];
let checkResult = [];
let seconds = "00";
let tens = "00";
let appendSeconds = document.getElementById('seconds');
let appendTens = document.getElementById('tens');
let interval;

function startTimer () {
    tens++

    if (tens>9) {
        appendTens.innerHTML= "0" + tens;
    };
    if (tens>9) {
        appendTens.innerHTML = tens   
     };
     if (tens >99) {
        seconds++ 
        appendSeconds.innerHTML = "0" + seconds
        tens = 0;
        appendTens.innerHTML = "0" + tens;
        };
     if (seconds > 9){
         appendSeconds.innerHTML = seconds;
     }
     if (seconds > 14 && tens >9) {
         disappear();
         clearInterval(interval);
         tens = 0;
         seconds = 0;
         if (value > 5) {
             playerWin()
         } else {           // the condition to win the game. 
             playerLose()
         }
    };

}
    function startChrono () {
    interval = setInterval(startTimer,10);
}

function disappear () {
    jedi.style.display = "none";
    c3po.style.display = "none";
    luck.style.display = "none";
    kith.style.display = "none";
    darthVader.style.display = "none";
    plaegis.style.display = "none";
    tiranus.style.display = "none";
    maul.style.display = "none";
}
function playerWin () {
    modal.style.display ="block";
    modalWin.style.display = "block";
    modalLose.style.display = "none";
    disappear();

}

const playerLose = () => { // EN VEZ DE TRATAR DE SACAR CON A LOS P CON CLASS, SIMPLEMENTE TRATAR CON REMOVE CHILD
    modal.style.display ="block";
    modalWin.style.display = "none";
    modalLose.style.display = "block";
    disappear();
    clearInterval(interval);
    
}
const restartGame = () => {
    startGame();
    modal.style.display = "none";  
    hasBonusLife = true;
    bonusLifeEl.style.display = "inline";
    value = 0;
    document.getElementById("jedis-saved").innerHTML = value;

}


function removeBonusLife () {
  bonusLifeEl.style.display = "none"
}
function incrementJediSaved() {
  ++value;
document.getElementById("jedis-saved").innerHTML = value; // This function increment the "value" each time the player save a Jedi.
finalJedisSaved.textContent = `${value}`;                     
}




const startGame = () => {
    buttonDefend.style.display = "inline";
    buttonAttack.style.display = "inline";
    buttonStartGame.style.display = "none";
    startChrono();
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
    resultJedi();
    } else {
    resultSith();
    }
}

const startNewOption = () => {
    let randomNumber = Math.random();
    if (randomNumber < 0.5) {
    resultJedi();
    } else {
    resultSith();
    }
}
function resultJedi () {
    setTimeout(makeJediAppear, Math.random() * 1000 ); // Appears with delay
};

function resultSith () {
    setTimeout(makeSithAppear, Math.random() * 1000 ); // Appears with delay 
}
 

function makeJediAppear () {
    let randomItem = jedis[Math.floor(Math.random() * jedis.length)]; 
     console.log(randomItem); 
    if (randomItem === "obi-wan") {
        jedi.style.display = "inline";
        checkResult.push("jedis");
        } else if (randomItem === "c3po") {
        c3po.style.display = "inline";
        checkResult.push("jedis"); 
    } else if (randomItem === "luck") {
        luck.style.display = "inline"
        checkResult.push("jedis"); 
    } else if (randomItem === "kith") {
        kith.style.display = "inline"
        checkResult.push("jedis"); 
    
    }
    
}
    
const JediDefended = () => {
    if (checkResult == "siths" && hasBonusLife) {
        alert('dont save siths');
        removeBonusLife();
        hasBonusLife = false;
        disappear();
        checkResult.splice("siths"); 
    }   else if (checkResult == "siths" && hasBonusLife == false) {
        alert('dont save siths');
        alert("you dont have more life");
        disappear();
        playerLose();
        } else {
            disappear();
            checkResult.splice("siths");
            incrementJediSaved(); 
        }    
    }; 

function makeSithAppear () {
     
     let randomItem = siths[Math.floor(Math.random() * siths.length)];
     console.log(randomItem); 
     if (randomItem === "darth") {
         darthVader.style.display= "inline";
         checkResult.push("siths"); 
        } else if (randomItem === "tiranus") {
            tiranus.style.display = "inline";
            checkResult.push("siths");
        } else if (randomItem === "plaegis") {
            plaegis.style.display = "inline";
            checkResult.push("siths");
        } else if (randomItem === "maul") {
            maul.style.display = "inline";
            checkResult.push("siths");   
        }     
} 

const sithAttacked = () => {
    if (checkResult == "jedis" && hasBonusLife) {
        alert('dont attack jedis');
        removeBonusLife();
        hasBonusLife = false;
        disappear();
        checkResult.splice("jedis");
    } else if (checkResult == "jedis" && hasBonusLife == false){
        alert('dont attack jedis');
        alert("you dont have more life");
        disappear();
        playerLose(); // later gameOver function
    } else {
            disappear();
            checkResult.splice("siths");
            incrementJediSaved();   
    }
      
    };
       
        
    chronoStop = () => {
        
  }



buttonStartGame.addEventListener('click', startGame);
buttonDefend.addEventListener('click', () => {
    JediDefended();
    startNewOption();
});
buttonAttack.addEventListener('click', () => {
    sithAttacked();
    startNewOption();
});
buttonRetryLose.addEventListener('click', ()=> {
    clearInterval(interval);
    tens ="00";
    seconds ="00";
    disappear();
    appendSeconds.innerHTML= seconds;
    appendTens.innerHTML = tens;
    restartGame();
});
buttonRetryWin.addEventListener('click', ()=> {
    clearInterval(interval);
    tens ="00";
    seconds ="00";
    appendSeconds.innerHTML= seconds; // CREAR UNA FUNCION, luego usar if chronostop poner un desappear y listo
    appendTens.innerHTML = tens;
    restartGame();
});
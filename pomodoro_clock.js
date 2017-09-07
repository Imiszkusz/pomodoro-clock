const startPause = document.getElementById('pause-link');
const startPauseBtn = document.querySelector('.main-timer');
const minusLink = document.getElementById('minus-link');
const plusLink = document.getElementById('plus-link');
const resetBtn = document.querySelector('.reset-btn-wrapper');
const breakWrapper = document.querySelector('.break-wrapper');





var time = {}; // object that stores the time data

// settomg time obj properties for pageload
if(startPause.textContent.split(':')[0] !== '00'){
  time.hours = Number(startPause.textContent.split(':')[0]);     
 }
else time.hours = 0; 
time.minutes = Number(startPause.textContent.split(':')[1])-1;
time.seconds = 59;

var sessionOn;



// function for getting minutes' data from user input and updating 'time' obj
function resetTime(minutes){

  this.hours = minutes / 60 >= 1 ? Math.floor(minutes / 60) : 0;
  minutes -= 60 * this.hours;

  this.minutes = minutes;
  this.seconds = 0;
}


// adds a zero before every one digit number in the timer
function addZeroToTime(num){

  if(num < 10) num = '0' + num;
  else num = String(num);
  return num;
}


//updates the time numbers to 2-character string format 
function timeToString(time){

  var str = time.hours ? addZeroToTime(time.hours) + ':' + addZeroToTime(time.minutes) + ':' + addZeroToTime(time.seconds) : addZeroToTime(time.minutes) + ':' + addZeroToTime(time.seconds);
  startPause.textContent = str;
}







// adds event listener to the - and + buttons
function chSessLength(DOMElement){
  
  DOMElement.addEventListener('click', function change(){
  
  var currSessLength = Number(document.getElementById('session-length').textContent); 
  if(DOMElement.id == 'minus-link' && currSessLength > 0){
    document.getElementById('session-length').textContent = ' ' + String(currSessLength - 5) + ' ';
  }
    
  else if(DOMElement.id == 'plus-link' && currSessLength <= 720){
    document.getElementById('session-length').textContent = ' ' + String(currSessLength + 5) + ' ';
  }
})
}



// Event listener for main timer - start / pause session
startPauseBtn.addEventListener('click', function startOrP(callback){
  
  
  timeToString(time);

  var allSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;

  if(startPause.dataset.session != 'on'){
    breakWrapper.style.display = 'none';
    breakWrapper.classList.remove('break-wrapper-show');
    startPauseBtn.style['animation-name'] = 'flash';
    sessionOn = setInterval(updateTimer, 1000);
    startPause.dataset.session = 'on';
  }

  else if(startPause.dataset.session == 'on'){
    breakWrapper.style.display = 'block';
    breakWrapper.classList.add('break-wrapper-show');
    startPauseBtn.style['animation-name'] = 'none';
    clearInterval(sessionOn);
    startPause.dataset.session = 'off';
  }



  //callback function of the setInterval, updates the timer every second
  function updateTimer(){

    if(time.seconds > 0) time.seconds -= 1;
    else if(time.seconds === 0 && time.minutes > 0){
      time.minutes -= 1;
      time.seconds = 59;
    }
    else if(time.seconds === 0 && time.minutes === 0 && time.hours > 0){
      time.hours -= 1;
      time.minutes = 59;
      time.seconds = 59;
    }

    else if((time.hours === undefined || time.hours === 0) && time.minutes === 0 && time.seconds === 0){
      clearInterval(sessionOn);
      startPause.dataset.session = 'off';
    }

    timeToString(time);

    allSeconds -= 1;
  }
})



// Event listener of the RESET button
resetBtn.addEventListener('click', function reset(){

  var sessionLength = document.getElementById('session-length');
  var sessLNum = Number(sessionLength.textContent.slice(1, -1));
  
  startPauseBtn.style['animation-name'] = 'none';

  if(startPause.dataset.session == 'on') {
      clearInterval(sessionOn);
      startPause.dataset.session = 'off';
  }

  resetTime.call(time, sessLNum);
  console.log('New time is: ' + time.hours, time.minutes, time.seconds);

  timeToString(time);
})


chSessLength(minusLink);
chSessLength(plusLink);
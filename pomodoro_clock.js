const START_PAUSE = document.getElementById('pause-link');
const START_PAUSE_BTN = document.querySelector('.main-timer');
const MINUS_LINK = document.getElementById('minus-link');
const PLUS_LINK = document.getElementById('plus-link');
const RESET_BTN = document.querySelector('.reset-btn-wrapper');
const BREAK_WRAPPER = document.querySelector('.break-wrapper');





var time = {}; // object that stores the time data

// when the page loads first time, it gets the data from the html element content
if(START_PAUSE.textContent.split(':')[0] !== '00'){
  time.hours = Number(START_PAUSE.textContent.split(':')[0]);  
 }
else time.hours = 0; 
time.minutes = Number(START_PAUSE.textContent.split(':')[1])-1;
time.seconds = 59;

var sessionOn;



// we need to update the 'time' object with the user input, after hitting the reset btn
function resetTime(minutes){

  this.hours = minutes / 60 >= 1 ? Math.floor(minutes / 60) : 0;
  minutes -= 60 * this.hours;

  this.minutes = minutes;
  this.seconds = 0;
}



function addZeroToTime(num){

  if(num < 10) num = '0' + num;
  else num = String(num);
  return num;
}


// html textcontent easier update with a string of the whole time value
function timeToString(time){

  var str = time.hours ? addZeroToTime(time.hours) + ':' + addZeroToTime(time.minutes) + ':' + addZeroToTime(time.seconds) : addZeroToTime(time.minutes) + ':' + addZeroToTime(time.seconds);
  START_PAUSE.textContent = str;
}



function changeStyle(sessionon){
  if(sessionon == 'on'){
    BREAK_WRAPPER.style.display = 'none';
    BREAK_WRAPPER.classList.remove('break-wrapper-show');
    START_PAUSE_BTN.style['animation-name'] = 'flash';
  }

  else if(sessionon == 'off'){
    BREAK_WRAPPER.style.display = 'block';
    BREAK_WRAPPER.classList.add('break-wrapper-show');
    START_PAUSE_BTN.style['animation-name'] = 'none';
  }
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



/* The setInterval start/end depends on a 'dataset.session' attribute of the html element, which is
   set to off when the setInterval is off, set to 'on' when the setInterval is on. */
START_PAUSE_BTN.addEventListener('click', function startOrP(callback){
  
  
  timeToString(time);

  var allSeconds = time.hours * 3600 + time.minutes * 60 + time.seconds;

  if(START_PAUSE.dataset.session != 'on'){
    changeStyle('on');
    sessionOn = setInterval(updateTimer, 1000);
    START_PAUSE.dataset.session = 'on';
  }

  else if(START_PAUSE.dataset.session == 'on'){
    changeStyle('off');
    clearInterval(sessionOn);
    START_PAUSE.dataset.session = 'off';
  }



  /*callback function of the setInterval, the 'time' object and the 'allSeconds' variable is updated 
    every second */
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
      START_PAUSE.dataset.session = 'off';
    }

    timeToString(time);

    allSeconds -= 1;
  }
})



/* Changes the session length into number type, clears off the style of the timer, calls the 'resetTime'
   function on the 'time' object, then updates the textcontent of the html */
RESET_BTN.addEventListener('click', function reset(){

  var sessionLength = document.getElementById('session-length');
  var sessLNum = Number(sessionLength.textContent.slice(1, -1));
  
  START_PAUSE_BTN.style['animation-name'] = 'none';
  BREAK_WRAPPER.style.display = 'none';
  BREAK_WRAPPER.classList.remove('break-wrapper-show');

  if(START_PAUSE.dataset.session == 'on') {
      clearInterval(sessionOn);
      START_PAUSE.dataset.session = 'off';
  }

  resetTime.call(time, sessLNum);
  console.log('New time is: ' + time.hours, time.minutes, time.seconds);

  timeToString(time);
})


chSessLength(MINUS_LINK);
chSessLength(PLUS_LINK);
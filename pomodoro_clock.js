const startPause = document.getElementById('pause-link');
const minusLink = document.getElementById('minus-link');
const plusLink = document.getElementById('plus-link');


//updates the time numbers to 2-character string format 
function updater(str, time){
  
  function stringTime(num){
    if(num < 10) num = '0' + num;
    else num = String(num);
    return num;
  }
  
  str = time.hours ? stringTime(time.hours) + ':' + stringTime(time.minutes) + ':' + stringTime(time.seconds) : stringTime(time.minutes) + ':' + stringTime(time.seconds);
  startPause.textContent = str;
}



// adds event listener to the - and + buttons
function changeLength(DOMElement){
  
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



startPause.addEventListener('click', function start(){
  var time = {};
  
  if(startPause.textContent.split(':')[0] !== '00'){
    time.hours = Number(startPause.textContent.split(':')[0]);     
   }
  time.minutes = Number(startPause.textContent.split(':')[1])-1;
  time.seconds = 59;
  console.log(time);
  var timeString = time.hours ? String(time.hours) + ':' + String(time.minutes) + ':' + String(time.seconds) : String(time.minutes) + ':' + String(time.seconds);
  updater(timeString, time);
  
  var startSession = setTimeout(function tick(){
    
    switch(true){
        
      case (time.hours === undefined || time.hours === 0) && time.minutes === 0 && time.seconds === 0:
      clearTimeout(startSession);
      break;
        
      case time.seconds > 0:
      time.seconds -= 1;
      updater(timeString, time);
      startSession = setTimeout(tick, 1000)
      console.log(time);
      break;
        
      case time.seconds === 0 && time.minutes > 0:
      time.minutes -= 1;
      time.seconds = 59;
      updater(timeString, time);
      startSession = setTimeout(tick, 1000)
      break;
        
      case time.seconds === 0 && time.minutes === 0 && time.hours > 0:
      time.hours -= 1;
      time.minutes = 59;
      time.seconds = 59;
      updater(timeString, time);
      startSession = setTimeout(tick, 1000)
      break;
        
    }
  }, 1000)
})


changeLength(minusLink);
changeLength(plusLink);
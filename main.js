const startButtonElement = document.querySelector(".start-button");
const stopButtonElement = document.querySelector(".stop-button");
const pauseButtonElement = document.querySelector(".pause-button");
const shortcutButtonElement = document.querySelector(".shortcut-button");
const inputTime = document.querySelector(".input-time");
const leftTimeElement = document.querySelector(".left-time");
const selectTimeElement = document.querySelector(".select-time");
const progressBar = document.querySelector("#progressBar");
const progressDiv = document.querySelector("#progressDiv");
let timerId;
let paused = false;
let started = false;
let timeNow;

startButtonElement.addEventListener("click", handleStart);
//按ENTER開始
document.addEventListener("keypress", e => {
  if (e.keyCode == 13 && started === false){
    handleStart()
  }
  
});
stopButtonElement.addEventListener("click", handleStop);
pauseButtonElement.addEventListener("click", handlePause)
//快捷鍵
shortcutButtonElement.addEventListener("click", e => {
  inputTime.value = 5;
})

function handleStop() {
  selectTimeElement.style.display = "block";
  leftTimeElement.style.display = "none";
  startButtonElement.style.display = "block";
  shortcutButtonElement.style.display = "block";
  pauseButtonElement.style.display = "none";
  stopButtonElement.style.display = "none";
  progressBar.style.display = "none";
  //console.log("stop", timerId);
  clearInterval(timerId);
  inputTime.value = ''
  started = false;
}

function handleStart(e) {
  
  const minutes = Number(inputTime.value);
  if (typeof minutes !== "number" || minutes === 0) {
    alert("請輸入數值");
    return;
  } else if (isNaN(minutes)) {
    alert("請輸入有效的數值");
    return;
  } else if (minutes > 30) {
    alert("請輸入 30 分鐘以內的時間");
    return;
  }

  startButtonElement.style.display = "none";
  shortcutButtonElement.style.display = "none";
  stopButtonElement.style.display = "block";
  pauseButtonElement.style.display = "block";
  selectTimeElement.style.display = "none";
  leftTimeElement.style.display = "block";
  progressBar.style.display = "block";
  startTimer(minutes * 60);
  started = true;
}

function handlePause(){
  paused = true;
  started = false;
  clearInterval(timerId);
  selectTimeElement.style.display = "none";
  leftTimeElement.style.display = "block";
  startButtonElement.style.display = "block";
  shortcutButtonElement.style.display = "none";
  pauseButtonElement.style.display = "none";
  stopButtonElement.style.display = "block";
  inputTime.value = Number(timeNow) / 60;
}

function startTimer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;

  render(seconds);

  timerId = setInterval(() => {
    const remainingSeconds = Math.round((then - Date.now()) / 1000);
    //progress bar
    const progressDivWidth = remainingSeconds * $('#progressBar').width() / seconds;
    console.log(remainingSeconds, seconds)
    $('#progressDiv').width(progressDivWidth)
    // check if we should stop it!
    if (remainingSeconds < 0) {
      clearInterval(timerId);
      selectTimeElement.style.display = "block";
      leftTimeElement.style.display = "none";
      startButtonElement.style.display = "block";
      shortcutButtonElement.style.display = "block";
      pauseButtonElement.style.display = "none";
      stopButtonElement.style.display = "none";
      progressBar.style.display = "none";
      started = false;
      alert("時間到！");
      $('#progressDiv').width($('#progressBar').width())
      return;
    } 
    timeNow = remainingSeconds
    // display it
    render(remainingSeconds);
  }, 1000);
}

function render(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const display = `${minutes}:${String(seconds).padStart(2, 0)}`;
  document.title = `remaining time: ${display}`;
  leftTimeElement.textContent = display;
}

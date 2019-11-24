const video_container = document.querySelector('.video_container');

// VIDEO element
const video = document.querySelector('.video_container video');

/* CONTROLS */

//play/pause button
const controlsContainer = document.querySelector('.controls_container');
const playBtn           = document.querySelector('.play');
const backBtn           = document.querySelector('.go_back');
const forwardBtn        = document.querySelector('.go_forward');
const volumeBtn         = document.querySelector('.volume');
const helpBtn           = document.querySelector('.help');
const nextBtn           = document.querySelector('.next');
const episodeBtn        = document.querySelector('.episodes');
const captionBtn        = document.querySelector('.captions');
const fullScreenBtn     = document.querySelector('.full_screen');

/* PROGRESS BAR */
const progreeBar    = document.querySelector('.progress_bar');
const watchedBar    =  document.querySelector('.watched_bar');

/* TIME REMAININNG */
let timeRemaininng = document.querySelector('.time_remaininng');

/* PLAY PAUSE ICON */
const playPauseIcon = document.querySelector('.play_pause');

/* VOLUME ICON */
const volumeIcon = document.querySelector('.full_volume_icon');

/* FULL SCREEN ICON  */
const full_screen_icon = document.querySelector('.full_screen_icon');

let controlsTimeout;

// set watch bar to default width
watchedBar.style.width = '0px';

// hide controls 
controlsContainer.style.opacity = '0';

// diplay controls
function displayControls(){

    controlsContainer.style.opacity = '1';

    document.body.style.cursor = 'initial';

    if(controlsTimeout) {
        clearTimeout(controlsTimeout);
    }

    controlsTimeout = setTimeout(() => {
        controlsContainer.style.opacity = '0';
        document.body.style.cursor = 'none';
    }, 5000);

}

function playPause(){

    if (video.paused || video.ended) {
        video.play();
        playPauseIcon.src = './icons/pause.svg';
     }
     else {
        video.pause();
        playPauseIcon.src = './icons/play.svg';
     }

}

function toggleMuted(){

    video.muted = !video.muted;

    if(video.muted) {
        volumeIcon.src = "./icons/volume-x.svg"
    } else {
        volumeIcon.src = "./icons/volume-2.svg"
    }
}

function fullScreen(){

    if(!document.fullscreenElement) {
        video_container.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
}

function forward(){
    video.currentTime += 10
}

function back(){
    video.currentTime -= 10
}

document.addEventListener('mousemove', displayControls);

document.addEventListener('keydown', (e) => {
  if(e.keyCode === 32) {
      playPause();
  }

  if(e.keyCode === 77) {
      toggleMuted();
  }

  if(e.keyCode === 39) {
      forward();
  }

  if(e.keyCode === 37) {
      back();
  }

  displayControls();

});

document.addEventListener('fullscreenchange',() => {
    if(!document.fullscreenElement) {
        full_screen_icon.src = "./icons/maximize.svg";

    } else {
        full_screen_icon.src = "./icons/minimize.svg";
    }
});

progreeBar.addEventListener('click', (e) => {
    const pos = (e.pageX  - (progreeBar.offsetLeft + progreeBar.offsetParent.offsetLeft)) / progreeBar.offsetWidth;
    video.currentTime = pos * video.duration;
})

playBtn.addEventListener('click', playPause);

backBtn.addEventListener('click', back);

forwardBtn.addEventListener('click', forward);

volumeBtn.addEventListener('click', toggleMuted);

fullScreenBtn.addEventListener('click', fullScreen);

video.addEventListener('timeupdate', () => {

    watchedBar.style.width = `${(video.currentTime / video.duration) * 100}%`;

    let totalSecondRemainning = video.duration - video.currentTime;

    const time = new Date(null);

    time.setSeconds(totalSecondRemainning);

    let hours = time.getHours().toString().padStart(2, '0');

    let mins = time.getMinutes().toString().padStart(2, '0');

    let seconds = time.getSeconds().toString().padStart(2, '0');

    timeRemaininng.textContent = `${hours}:${mins}:${seconds}`;

})
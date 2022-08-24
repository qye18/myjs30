const videoBox = document.querySelector('.videoBox');
const controls = document.querySelector('.controls');
const video = document.querySelector('video')
// controls
const playButton = document.querySelector('.playButton');
const volume = document.querySelector('.volume');
const speed = document.querySelector('.speed');
const goBack = document.querySelector('.goBack');
const goAhead = document.querySelector('.goAhead');
const fullScreen = document.querySelector('.fullScreen');
const porgressBar = document.querySelector('.progressBar');
const currentProgressPos = document.querySelector('.currentProgressPos');

function playVideo() {
    if (video.ended) {
        video.currentTime = 0;
        video.play();
    }
    if (video.paused) {
        video.play();
        playButton.innerHTML = '❚ ❚';
    }else {
        video.pause();
        playButton.innerHTML = '►';
    }

}

function HandelVolume() {
    video.volume = this.value / 100;
}

function HandleBack() {
    video.currentTime -= 10;
}

function HandleAhead() {
    video.currentTime += 25;
}

function HandleBackRate() {
    video.playbackRate = this.value / 100;
}

function updateProgressBar() {
    let percent = (video.currentTime / video.duration) * 100;
    currentProgressPos.style.width = `${percent}%`;
}
function setPosition(e) {
    console.log(e.target);
    let pos = (e.offsetX / porgressBar.offsetWidth) * video.duration;
    video.currentTime = pos;
}


fullScreen.addEventListener('click', () => {
    document.fullscreenElement? document.exitFullscreen() : videoBox.requestFullscreen(); 
});
playButton.addEventListener('click', playVideo);
volume.addEventListener('input', HandelVolume);
goBack.addEventListener('click',HandleBack);
goAhead.addEventListener('click', HandleAhead);
speed.addEventListener('input', HandleBackRate);
video.addEventListener('click', playVideo);
video.addEventListener('timeupdate',updateProgressBar);

let mousedown = false;
porgressBar.addEventListener('click', setPosition);
porgressBar.addEventListener('mousemove',(e) => mousedown && setPosition(e));
porgressBar.addEventListener('mousedown', () => mousedown = true);
porgressBar.addEventListener('mouseup', () => mousedown = false);

videoBox.addEventListener('mouseover',() => controls.classList.add('showControls'));
videoBox.addEventListener('mouseout',() => controls.classList.remove('showControls'));

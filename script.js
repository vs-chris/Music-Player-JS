
const playPause = document.getElementById("pause-play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const buttons = document.querySelector(".buttons");
const myAudio = document.querySelector("#my-audio");
const currentTime = document.querySelector(".current-time");
const maxTime = document.querySelector(".max-time");
const disc = document.querySelector(".disc");
const range = document.querySelector("#m-range");
let audioTime = new Date();
let audioDuration = new Date();

myAudio.addEventListener("loadedmetadata", audioLoad );
window.addEventListener("load", audioLoad );

function audioLoad() {
    audioTime = new Date();
    audioTime.setHours(0);
    audioTime.setMinutes(0);
    audioDuration = new Date();
    audioDuration.setHours(0);
    audioDuration.setMinutes(0);
    audioDuration.setSeconds(Math.floor(myAudio.duration));
    let sec = audioDuration.getSeconds();
    let min = audioDuration.getMinutes();
    if (audioDuration.getSeconds() < 10) {
        sec = "0" + audioDuration.getSeconds();
    }

    if (audioDuration.getMinutes() < 10) {
        min = "0" + audioDuration.getMinutes();
    }
    maxTime.innerHTML = `${min}:${sec}`;
    console.log(`Successfully loaded: ${audioTime}`);
    
    if (myAudio.paused) {
        disc.classList.add("paused");
        playPause.classList.add("paused");
    } else {
        disc.classList.remove("paused");
        playPause.classList.remove("paused");
    }
}


myAudio.addEventListener("timeupdate", ()=> {
    audioTime.setMinutes(0);
    audioTime.setSeconds(Math.floor(myAudio.currentTime)); 
    let sec = audioTime.getSeconds();
    let min = audioTime.getMinutes();

    if (audioTime.getSeconds() < 10) {
        sec = "0" + audioTime.getSeconds();
    }

    if (audioTime.getMinutes() < 10) {
        min = "0" + audioTime.getMinutes();

    }
    currentTime.innerHTML = `${min}:${sec}`;

    /**BAR**/

    range.value = (myAudio.currentTime / myAudio.duration) * 1000;

})

buttons.addEventListener("click", (e) => {
    if (e.target.id === "pause-play") { 
        if (myAudio.paused) {
            myAudio.play();
            playPause.classList.remove("paused");
            disc.classList.remove("paused");
        } else {
            myAudio.pause();
            playPause.classList.add("paused");
            disc.classList.add("paused");
        }
    } 
})

Math.floor(Math.floor(myAudio.currentTime) / 60) 

range.addEventListener("change", (e) => {
    console.log(e.target)
    myAudio.currentTime = (range.value / 1000) * myAudio.duration;
})
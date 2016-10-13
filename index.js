const video = document.querySelector('video');
const img = document.querySelector('img');
// video.play();

const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = canvas.width * 0.55;
const context = canvas.getContext('2d');



const frameRate = 29.97;

video.addEventListener('seeked', (event) => {
    console.warn('Video element seeking complete.', event);
    console.log('Taking snapshot ... ');
    // takeSnapShot();
}, true);

video.addEventListener('canplay', runOnce);

function runOnce() {
    // video.currentTime = 8.0;
    // console.log(video.currentTime);
    // video.removeEventListener('canplay', runOnce)
    video.play();
}

video.addEventListener('click', () => {
    pause();
});

function pause() {
    video.pause();
    console.log('video.currentTime is ', video.currentTime);
    // take frame shots
    const numOfFrames = 7;
    const frameRate = 29.97;
    takeSnaps(numOfFrames, frameRate, video.currentTime);
}

function takeSnaps(numOfFrames, frameRate, currentTime) {
    const timeCodes = genTimeCodes(frameRate, numOfFrames, currentTime);
    console.log('timeCodes generated ', timeCodes);
}

function genTimeCodes(frameRate, numOfFrames, currentTime) {
    const timeCodes = [];
    const timePerFrame =  1 / frameRate;
    var time = currentTime - (numOfFrames - 1) / 2 * timePerFrame;
    for (let i = 0; i< numOfFrames; i++) {
        timeCodes.push(time);
        time += timePerFrame
    }
    return timeCodes
}

function genSnapFromTimeCode(timeCode) {
    video.currentTime = timeCode;
}

function getSnapShotAfterSeeked() {
    // addEventListener for seeked
    console.warn('Video element seeking complete for currentTime ', video.currentTime);
    console.log('Taking snapshot ... ');
    const datauri = takeSnapShot();
}

function takeSnapShot() {
    context.drawImage(video, 0, 0);
    img.src = canvas.toDataURL();
}






























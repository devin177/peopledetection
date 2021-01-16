// beginning of the code

let model = undefined;

cocoSsd.load().then(function(loadedModel) {
    model = loadedModel;
})

const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');

function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// array of object created by tensor flow
let children = [];

// If webcam supported, add event listener to button for when user
// wants to activate it.
// We are starting to listen for clicks on the button
if (hasGetUserMedia()) {
    const enableWebcamButton = document.getElementById('webcamButton');
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Enable the live webcam view and start classification.
function enableCam(event) {
    // Check if coco-ssd is loaded
    if (!model) {
        console.log('Wait! Model not loaded yet.')
        return;
    }

    // Hide the button.
    event.target.classList.add('removed');

    // getUsermedia parameters.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        // when the stream connection is created, start the counting
        video.addEventListener('loadeddata', countPeople);
    });
}

// amount people
let numEntered = 0;
let people = [];

function countPeople() {
    // Now let's start classifying the stream.
    model.detect(video).then(function(detections) {
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            // remove that child from existence
            liveView.removeChild(children[i]);
        }
        // splice those children up
        children.splice(0);

        // Now lets loop through detections and draw them to the live view if
        // they have a high confidence score.
        console.log(detections.length);
        for (let n = 0; n < detections.length; n++) {
            // If we are over 66% sure we are sure we classified it right, draw it!
            if (detections[n].score > 0.66 && detections[n].class === "person") {
                console.log("detections[n]: " + detections[n] + "n: " + n);
                const p = document.createElement('p');
                p.innerText = detections[n].class + ' - with ' +
                    Math.round(parseFloat(detections[n].score) * 100) +
                    '% confidence.';
                // Draw in top left of bounding box outline.
                p.style = 'left: ' + detections[n].bbox[0] + 'px;' +
                    'top: ' + detections[n].bbox[1] + 'px;' +
                    'width: ' + (detections[n].bbox[2] - 10) + 'px;';

                // Draw the actual bounding box.
                const highlighter = document.createElement('div');
                highlighter.setAttribute('class', 'highlighter');
                highlighter.style = 'left: ' + detections[n].bbox[0] + 'px; top: ' +
                    detections[n].bbox[1] + 'px; width: ' +
                    detections[n].bbox[2] + 'px; height: ' +
                    detections[n].bbox[3] + 'px;';

                liveView.appendChild(highlighter);
                liveView.appendChild(p);

                // Store drawn objects in memory so we can delete them next time around.
                // If these weren't here, the boxes wouldn't refresh and every few frames, the boxes of detection would just keep
                // stacking on top of each other.
                children.push(highlighter);
                children.push(p);
            }
        }

        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(countPeople);
    });
}
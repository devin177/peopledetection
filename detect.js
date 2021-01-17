// beginning of the code

let model = undefined;

cocoSsd.load().then(function(loadedModel) {
    model = loadedModel;
})

// get user location info before loading the stream
var form = document.getElementById("inputbutton")
var locationdiv = document.getElementById("locationbox");

// Setting up references to the video
const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');

form.addEventListener('click', handleForm);

var place = null
var number = null;


// handler function for the form submission
function handleForm(event) {
    place = document.getElementById("loc").value;
    number = document.getElementById("num").value;
    console.log(number);
    console.log(place);
    form.hidden = true;
    liveView.hidden = false;
    // create element with info that was entered, and display it
    const info = document.createElement('p');
    info.innerText = "Location: " + place + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "Phone: " + number;
    locationdiv.innerText = info.innerText;
    event.preventDefault();
}

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

var pp = false;
var count = 0;
var loc = [];

function countPeople() {
    // Now let's start classifying the stream.
    model.detect(video).then(function(detections) {
        // Some one finished a movement
        if (pp === true && children.length === 0) {
            pp = false;
            if (loc[0] < loc[loc.length - 1]) {
                // entry
                count += 1;
                console.log("left to right: " + count.toString());
            } else {
                // exit
                count -= 1;
                console.log("right to left: " + count.toString());
            }
            loc.splice(0);
            // call api to update count 
        }

        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            // remove that child from existence
            liveView.removeChild(children[i]);
        }
        // splice those children up
        children.splice(0);

        // Now lets loop through detections and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < detections.length; n++) {
            // If we are over 66% sure we are sure we classified it right, draw it!
            if (detections[n].score > 0.50 && detections[n].class === "person") {
                pp = true;
                //console.log(detections[n].bbox[0]);
                loc.push(detections[n].bbox[0]);
                //console.log("detections[n]: " + detections[n] + "n: " + n);
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
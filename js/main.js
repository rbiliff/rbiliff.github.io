"use strict";

// Put variables in global scope to make them available to the browser console.
const constraints = (window.constraints = {
  audio: false,
  video: true,
});

const compliments = (window.compliments = [
  "Your positivity is infectious.",
  "You should be so proud of yourself.",
  "You're a true gift to the people in your life.",
  "You're an incredible friend.",
  "You're amazing!",
  "You are the most perfect you there is.",
  "Your perspective is refreshing.",
  "You’re an awesome friend.",
  "If I wasn't a computer, I would hug you right now!",
  "You are making a difference!",
  "If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now!",
  "Everything would be better if more people were like you!",
  "You were cool way before hipsters were cool.",
  "Colors seem brighter when you’re around.",
  "You’re more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)",
  "You’re better than a triple-scoop ice cream cone. With sprinkles.",
  "Your hair looks stunning.",
  "If you were a box of crayons, you’d be the giant name-brand one with the built-in sharpener.",
  "Our community is better because you’re in it.",
  "You’re a candle in the darkness.",
  "You’re a great example to others.",
  "You’re always learning new things and trying to better yourself, which is awesome.",
  "You could survive a Zombie apocalypse.",
  "If someone based an Internet meme on you, it would have impeccable grammar.",
  "The people you love are lucky to have you in their lives!",
  "You’re like a breath of fresh air!",
  "You’re gorgeous — and that’s the least interesting thing about you, too!",
  "You’re even better than a unicorn, because you’re real!",
  "You’re a gift to those around you!",
  "You have a good head on your shoulders.",
  "How do you keep being so funny and making everyone laugh?",
  "💖💖💖!!!!",
]);

function displayMessage() {
  setTimeout(function () {
    const message =
      compliments[Math.floor(Math.random() * compliments.length)].trim();
    alert(message);
  }, 1500);
}

function handleSuccess(stream) {
  const video = document.querySelector("video");
  const videoTracks = stream.getVideoTracks();
  console.log("Got stream with constraints:", constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
  video.onplay = displayMessage();
}

function handleError(error) {
  if (error.name === "ConstraintNotSatisfiedError") {
    const v = constraints.video;
    errorMsg(
      `The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`
    );
  } else if (error.name === "PermissionDeniedError") {
    errorMsg(
      "Permissions have not been granted to use your camera and " +
        "microphone, you need to allow the page access to your devices in " +
        "order for the demo to work."
    );
  }
  errorMsg(`getUserMedia error: ${error.name} ${error.stack}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector("#errorMsg");
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== "undefined") {
    console.error(error);
  }
}

async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    handleError(e);
  }
}

window.onload = function () {
  init();
};

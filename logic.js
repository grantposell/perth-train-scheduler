//Set Global variables
//Iniatialize Firebase
//link moment.js to html page
//There will be a form that needs to be filled out.
//This form will comprise the name of the train,destination, the first time it leaves, frequency, and the logic should reflect the minutes away the next train is from the current station.

//Global Variables
var trainName = " ";
var destination = " ";
var firstTime = " ";
var frequency = " ";
var nextTrain = " ";
var minutesUntilArrival = " ";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAKgDJ0vPX-kgO93N67wJaSgRseO0VLfWs",
    authDomain: "fir-database-60e71.firebaseapp.com",
    databaseURL: "https://fir-database-60e71.firebaseio.com",
    projectId: "fir-database-60e71",
    storageBucket: "fir-database-60e71.appspot.com",
    messagingSenderId: "117988961394"
};
firebase.initializeApp(config);
var database = firebase.database();


// Capture Button Click
$("#add-train").on("click", function(event) {
    event.preventDefault();


    trainName = $("#add-name").val().trim();
    destination = $("#add-destination").val().trim();
    firstTime = $("#add-firstTime").val().trim();
    frequency = $("#add-frequency").val().trim();

    // Code for the push
    database.ref().push({

      trainName: trainName,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % frequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = frequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
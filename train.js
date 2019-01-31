

    var config = {
        apiKey: "AIzaSyBXk1jLtbDvhneAr9bgvfiarstbhUUNzQ8",
        authDomain: "traintime-f55d4.firebaseapp.com",
        databaseURL: "https://traintime-f55d4.firebaseio.com",
        projectId: "traintime-f55d4",
        storageBucket: "",
        messagingSenderId: "544608781773"
    };
    firebase.initializeApp(config);


    var database = firebase.database();

    // var $name = $("#train-name").val().trim();
    // var $destination = $("#destination").val().trim();
    // var $time = $("#time").val().trim();
    // var $frequency = $("#frequency").val().trim();

    // console.log($name, $destination, $time, $frequency);

$("#add-train").on("click", function(){


    var $name = $("#train-name").val().trim();
    var $destination = $("#destination").val().trim();
    var $time = $("#time").val().trim();
    var $frequency = $("#frequency").val().trim();

    console.log($name, $destination, $time, $frequency);

    database.ref().push({
        name: $name,
        destination: $destination,
        time: $time,
        frequency: $frequency

  });

});

database.ref().on("child_added", function(snapshot){

    //make new table row each time a child is added to data base
    var t_row = $("<tr>");
    //get the name, destination and frequency from the database and store in variables
    var t_name = $("<td>").html(snapshot.val().name);
    var t_destination = $("<td>").html(snapshot.val().destination);

    //get frequency of train from databse and store into variable for calculations for next train and 
    //minutes away
    var tFrequency = snapshot.val().frequency;
    var t_frequency = $("<td>").html(tFrequency);


    //get first train time from database and store to variable for next train and minutes away calcs...
    var firstTime = snapshot.val().time;
    // var formattedTime = moment(snapshot.val().time, "HH:mm").format("hh:mm a");
    // var t_time = $("<td>").html(formattedTime); 

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log(tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    
    var t_nextTrain = $("<td>").html(moment(nextTrain).format("hh:mm a"));
    var t_minutesAway = $("<td>").html(tMinutesTillTrain);

    t_row.append(t_name, t_destination, t_frequency, t_nextTrain, t_minutesAway);
    $("#schedule-body").append(t_row);
    
});

//set current time to show on screen
var currentTime = moment().format('LT');
$("#current-time").text(currentTime);
  



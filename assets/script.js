var lastUpdate = 0;

// current date and time
var getDate = function() {
    var currentDate = moment().format('[Today is] dddd, Do MMMM YYYY, h:mm:ss A');
    //displays date and time on <p> with currentDay ID
    $("#currentDay").text(currentDate);
    // check for hour change
    if (lastUpdate != moment().format('HH')) {
        colorTextArea();
    }
};

// save timeid and text input to local storage
$(".saveBtn").click(function() {
    var eventTime = $(this)
        .closest(".row")
        .attr("id");    
    var eventText = $(this)
         .closest(".row")
         .find("textarea")
         .val();
    localStorage.setItem(eventTime, eventText);
});

// change background color for past, present, and future
var colorTextArea = function() {
    // to test if works, change currentHour to int within 9-17
    var currentHour = 13;
    // HH = ..10, 11, 12, 13.. (24hr)
    var hourNum = +currentHour;
    var timeId = "#" + currentHour;
    // for loop going through 9AM-5PM 
    for(var i=9; i<18; i++){
        if (i == hourNum) {
            $(timeId).find("textarea").addClass("present");
        }
        else if (i < hourNum) {
            $("#" + i).find("textarea").addClass("past");
        }
        else {
            $("#" + i).find("textarea").addClass("future");
        }
    }
    lastUpdate = currentHour;
};

// saved events loaded with page
var loadEvents = function() {
    for (var i=0; i<localStorage.length; i++) {
        var time = localStorage.key(i);
        var description = localStorage.getItem(time);
        var timeId = ("#" + time);
        $(timeId).find("textarea").val(description);
    }
};

setInterval(getDate, 1000);
colorTextArea();
loadEvents();
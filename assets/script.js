var myDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    
]

function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

//SAVES DATA TO A LOCAL STORAGE
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}


function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

//SETS THE CURRENT HEADER DATE
getHeaderDate();


//CREATES THE TEXT BLOCK IN THE PLANNER (not working come back to this)
myDay.forEach(function(thisHour) {
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "hour"
    });


    var hourPlan = $("<div>")
        .attr({
            "class": "description"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

//HERE IS THE SAVE BUTTON 
    var saveButton = $("<i class='save'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

//THIS IS FOR LOCAL DATA STORAGE IT LOAD AFTER THE FACT
init();

//THIS WILL SAVE THE DATA TO LOCAL STORAGE
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})
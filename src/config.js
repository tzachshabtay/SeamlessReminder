var days = document.querySelectorAll("input[type=checkbox]");
var time = document.querySelector("input[type=time]");

chrome.storage.sync.get(["seamless_reminder_days", "seamless_reminder_time"], function (result) {
    console.log("config: " + JSON.stringify(result));
    
    selectedDays = result.seamless_reminder_days || [1, 2, 3, 4];
    initDays(selectedDays);

    selectedTime = result.seamless_reminder_time || "10:45";
    initTime(selectedTime);
});

function initDays(selectedDays) {
    for(var i = 0; i < days.length; i++) {
        var day = days[i];
        if (selectedDays.includes(parseInt(day.value))) {
            day.checked = true;
        }
        day.addEventListener("click", updateDays);
    }
}

function updateDays() {
    order_on_days = [];
    for(var i = 0; i < days.length; i++) {
        var day = days[i];
        if(day.checked) {
            order_on_days.push(parseInt(day.value));
        }
    }
    chrome.storage.sync.set({"seamless_reminder_days": order_on_days}, function(e) {
        console.log("refreshing days: " + JSON.stringify(order_on_days));
        chrome.runtime.sendMessage("seamless_refresh");
    });
}

function initTime(selectedTime) {
    time.value = selectedTime;
    time.onchange = onTimeChanged;
}

function onTimeChanged() {
    chrome.storage.sync.set({"seamless_reminder_time": time.value}, function(e) {
        console.log("refreshing time: " + time.value);
        chrome.runtime.sendMessage("seamless_refresh");
    });
}
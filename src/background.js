console.log("Starting background.js");

function createNotification() {
    console.log("Creating Notification");
	/*var opt = {
		type: "basic",
		title: "You didn't order from seamless yet!",
		message: "Go to seamless and order food.",
		iconUrl: "restaurant.png",
        priority: 2,
        requireInteraction: true,
		buttons: [{
			title: "OK"
		}]
	};
    chrome.notifications.create("popup", opt);*/
    alert("You didn't order from seamless yet!");
}

function onNewDay() {
    console.log("New Day");
    chrome.storage.sync.set({'seamless_ordered_today': false});
    chrome.storage.sync.get("seamless_reminder_time", function (result) {
        console.log("time: " + JSON.stringify(result));
        result = result.seamless_reminder_time || "10:45";
        var alarmTime = getTime(new Date(), result);
        var tomorrowTime = new Date();
        tomorrowTime.setDate(tomorrowTime.getDate() + 1);
        var newDayTime = tomorrowTime.setHours(00, 00, 01);
        var now = new Date().getTime();
        if (alarmTime < now) {
            alarmTime = getTime(tomorrowTime, result);
        }
        console.log("setting seamless_alarm at " + alarmTime);
        console.log("setting seamless_alarm_new_day at " + newDayTime);
        chrome.alarms.create("seamless_alarm", { when: alarmTime});
        chrome.alarms.create("seamless_alarm_new_day", { when: newDayTime});
    });
}

function getTime(date, time) {
    tokens = time.replace(".", ":").split(":");
    return date.setHours(tokens[0], tokens[1], tokens.length > 2 ? tokens[2] : 00);
}

onNewDay();

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("received alarm: " + JSON.stringify(alarm));
    if (alarm.name === "seamless_alarm") {
        chrome.storage.sync.get(["seamless_ordered_today", "seamless_reminder_days"], function (result) {
            console.log("ordered = " + JSON.stringify(result));
            var orderedSeamless = result.seamless_ordered_today || false;
            var days = result.seamless_reminder_days || [1, 2, 3, 4];
            if (days.includes(new Date().getDay())) {
                if (!orderedSeamless) {
                    createNotification();
                }
            }
            else console.log("Skipped check for today");
        });
    }
    else if (alarm.name === "seamless_alarm_new_day") {
        onNewDay();
    }
});

chrome.webNavigation.onCommitted.addListener(function(e) {
    console.log("Ordered Seamless!");
    chrome.storage.sync.set({'seamless_ordered_today': true});
}, {url: [{
    urlContains: "seamless.com/MealsThankYou"
}]});

chrome.runtime.onMessage.addListener(function(msg) {
    console.log("got message: " + msg);
    if (msg === "seamless_refresh") {
        console.log("Refreshing seamless");
        onNewDay();
    }
});
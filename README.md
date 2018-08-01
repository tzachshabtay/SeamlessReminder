# Seamless Reminder

A chrome add-in to remind you if you forgot to order from a [group Seamless order](https://corporate.seamless.com/group-ordering/).

## Why?

If your employer is providing you with a corporate group lunch order from Seamless, it might come with a time limit. For us, for example, we need to order by 11:15 AM, or we lose our right to order lunch for the day.
It can be very frustrating if you forget to order by 11:15 AM, and this is what this add-on tries to prevent.

## How does it work?

You install the extension from chrome (yet to be published). You then configure the days of the week and time of day (by default it's Monday-Thursday and 10:45).
If you didn't order from Seamless yet by that time in one of the selected days you'll get a reminder in the browser that you need to order soon.
If you did order from Seamless then you won't get a reminder -> this only works if you made the Seamless order from that chrome browser. It can in theory (not tested) work also if you ordered from another chrome browser (i.e on another device) with this extension installed.

## For Developers

You can install this extensions by going the `chrome://extensions/` in the chrome browser, enabling `Developer Mode` on the top-right corner (if it wasn't already enabled), clicking on `LOAD UNPACKED` and then selecting the `src` folder in your cloned copy of this repository.


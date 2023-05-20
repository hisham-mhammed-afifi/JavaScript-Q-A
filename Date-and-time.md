# Basics

**1. Creating a Date object:**

```js
const currentDate = new Date(); // Current date and time
const specificDate = new Date("2022-01-01"); // Specific date and time
const yearMonthDay = new Date(2022, 0, 1); // Year, month (0-11), day
```

**2. Getting components of a date:**

```js
const year = currentDate.getFullYear(); // Get the year (e.g., 2022)
const month = currentDate.getMonth(); // Get the month (0-11, where 0 is January)
const day = currentDate.getDate(); // Get the day of the month (1-31)
const hours = currentDate.getHours(); // Get the hour (0-23)
const minutes = currentDate.getMinutes(); // Get the minute (0-59)
const seconds = currentDate.getSeconds(); // Get the second (0-59)
const milliseconds = currentDate.getMilliseconds(); // Get the millisecond (0-999)
const dayOfWeek = currentDate.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
```

**3. Formatting a date:**

```js
const formattedDate = currentDate.toDateString(); // Convert to a human-readable date string
const formattedTime = currentDate.toTimeString(); // Convert to a human-readable time string
const formattedDateTime = currentDate.toLocaleString(); // Convert to a human-readable date and time string
```

**4. Manipulating dates:**

```js
const nextYear = currentDate.getFullYear() + 1;
currentDate.setFullYear(nextYear); // Change the year
currentDate.setMonth(2); // Change the month (0-11, where 0 is January)
currentDate.setDate(15); // Change the day of the month (1-31)
currentDate.setHours(12); // Change the hour (0-23)
currentDate.setMinutes(30); // Change the minute (0-59)
currentDate.setSeconds(0); // Change the second (0-59)
currentDate.setMilliseconds(0); // Change the millisecond (0-999)
```

**5. Calculating differences between dates:**

```js
const otherDate = new Date("2022-12-31");
const timeDiff = otherDate - currentDate; // Difference in milliseconds between two dates
const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Difference in days
```

**6. Working with UTC dates:**

```js
const utcDate = new Date(Date.UTC(2022, 0, 1)); // Create a UTC date
const utcYear = utcDate.getUTCFullYear(); // Get the UTC year
const utcMonth = utcDate.getUTCMonth(); // Get the UTC month
// ...similar to the previous examples, but using UTC methods (e.g., getUTCDate(), getUTCHours())
```

**7. Formatting dates using libraries:** While JavaScript provides basic date formatting methods, you may also consider using third-party libraries like Moment.js or date-fns for more advanced date formatting and manipulation options. These libraries offer various formatting patterns, localization support, and additional utilities for working with dates.
Example using Moment.js:

```js
const formattedDate = moment(currentDate).format("YYYY-MM-DD"); // Format date as 'YYYY-MM-DD'
```

**8. Parsing dates from strings:** JavaScript allows you to parse date strings into Date objects using the `Date.parse()` method or by passing the string directly to the `Date` constructor.

```js
const dateString = "2022-06-15";
const parsedDate = new Date(dateString); // Parse date string into a Date object
```

**9. Timezone handling:** JavaScript Date objects represent time in the local timezone of the browser or runtime environment. If you need to work with specific timezones or perform timezone conversions, you can use libraries like Moment.js with timezone support or the built-in `toLocaleString()` method.
Example using Moment.js with timezone support:

```js
const utcDate = moment.utc("2022-01-01T12:00:00Z");
const localDate = utcDate.local(); // Convert UTC date to local timezone
const formattedDate = localDate.format("YYYY-MM-DD HH:mm:ss"); // Format the local date
```

**10. Working with durations:** If you need to work with durations or intervals of time, you can use the `Date` object in combination with numerical operations or libraries like Moment.js or date-fns.
Example calculating a duration using Moment.js:

```js
const startDate = moment("2022-01-01");
const endDate = moment("2022-02-15");
const duration = moment.duration(endDate.diff(startDate));
const days = duration.asDays(); // Get the duration in days
```

**11. Working with timestamps:** A timestamp represents the number of milliseconds that have passed since January 1, 1970 (Unix epoch). JavaScript provides methods to convert between dates and timestamps.
Example converting a date to a timestamp:

```js
const timestamp = currentDate.getTime(); // Get the timestamp in milliseconds
```

Example converting a timestamp to a date:

```js
const timestamp = 1642348800000; // Example timestamp
const dateFromTimestamp = new Date(timestamp); // Convert timestamp to a Date object
```

**12. Date arithmetic:** JavaScript allows you to perform arithmetic operations on dates by adding or subtracting milliseconds.
Example adding days to a date:

```js
const newDate = new Date();
newDate.setDate(newDate.getDate() + 7); // Add 7 days to the current date
```

**13. Comparing dates:** You can compare dates using comparison operators like `<`, `>`, `<=`, `>=`. The operators work directly with Date objects.
Example comparing two dates:

```js
const date1 = new Date("2022-01-01");
const date2 = new Date("2022-02-01");
if (date1 < date2) {
  console.log("date1 is earlier than date2");
} else if (date1 > date2) {
  console.log("date1 is later than date2");
} else {
  console.log("date1 and date2 are equal");
}
```

**14. Localizing dates:** You can format dates according to different locales and display them in the user's preferred language and formatting conventions using the `toLocaleString()` method.
Example localizing a date:

```js
const localizedDate = currentDate.toLocaleString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
console.log(localizedDate); // Output: "Friday, January 1, 2022"
```

**15. Timezone offset:** You can obtain the timezone offset in minutes between the user's local timezone and UTC using the `getTimezoneOffset()` method.
Example getting the timezone offset:

```js
const timezoneOffsetMinutes = currentDate.getTimezoneOffset();
console.log(timezoneOffsetMinutes); // Output: -60 (for UTC+01:00)
```

# Advanced

**1. Date Formatting:** JavaScript provides various methods for formatting dates according to specific patterns using the `Intl.DateTimeFormat` object.
Example formatting a date with specific options:

```js
const date = new Date("2022-01-01T12:00:00");
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};
const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
console.log(formattedDate); // Output: "January 1, 2022, 12:00 PM"
```

**2. Timezone Conversion:** To convert a date from one timezone to another, you can use libraries like Moment.js with timezone support or the built-in `toLocaleString()` method with the `timeZone` option.
Example converting a date to a specific timezone:

```js
const date = new Date("2022-01-01T12:00:00");
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  timeZone: "America/New_York",
};
const formattedDate = date.toLocaleString("en-US", options);
console.log(formattedDate); // Output: "January 1, 2022, 7:00 AM"
```

**3. Date Parsing with Moment.js:** Moment.js provides a flexible and comprehensive set of parsing functions to parse dates from various formats.
Example parsing a date using Moment.js:

```js
const dateString = "2022-01-01";
const parsedDate = moment(dateString, "YYYY-MM-DD");
console.log(parsedDate.format("MMMM DD, YYYY")); // Output: "January 01, 2022"
```

**4. Date Arithmetic with Moment.js:** Moment.js allows you to perform various operations on dates, including addition, subtraction, and duration calculations.
Example performing date arithmetic with Moment.js:

```js
const startDate = moment("2022-01-01");
const endDate = moment("2022-01-31");
const duration = moment.duration(endDate.diff(startDate));
const days = duration.asDays();
console.log(days); // Output: 30
```

**5. Timezone Support with Moment.js:** Moment.js provides extensive support for working with timezones, including converting between timezones and displaying timezone information.
Example converting a date to a specific timezone using Moment.js:

```js
const date = moment("2022-01-01T12:00:00Z").tz("America/New_York");
console.log(date.format("YYYY-MM-DD HH:mm:ss")); // Output: "2022-01-01 07:00:00"
```

**6. Duration Calculation with date-fns:** The date-fns library offers a set of functions for working with durations and calculating differences between dates.
Example calculating the duration between two dates using date-fns:

```js
const startDate = new Date("2022-01-01");
const endDate = new Date("2022-02-01");
const diffInDays = dateFns.differenceInDays(endDate, startDate);
console.log(diffInDays); // Output: 31
```

**7. Working with Time Intervals:** JavaScript provides methods to work with time intervals, allowing you to add or subtract specific units of time from a date.
Example adding hours to a date:

```js
const date = new Date();
date.setHours(date.getHours() + 3); // Add 3 hours to the current date
```

Example subtracting minutes from a date:

```js
const date = new Date();
date.setMinutes(date.getMinutes() - 30); // Subtract 30 minutes from the current date
```

**8. Daylight Saving Time Handling:** JavaScript's Date object automatically handles Daylight Saving Time (DST) adjustments based on the system's timezone settings. The Date object takes into account DST when calculating and formatting dates.
Example checking if a date is during Daylight Saving Time:

```js
const date = new Date("2022-06-01");
const isDST = date.getTimezoneOffset() < new Date().getTimezoneOffset();
console.log(isDST); // Output: true (if the date is during DST)
```

**9. Leap Year Validation:** JavaScript allows you to determine if a particular year is a leap year, which has an extra day (February 29) in it.
Example checking if a year is a leap year:

```js
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
console.log(isLeapYear(2024)); // Output: true
console.log(isLeapYear(2023)); // Output: false
```

**10. Working with Timezones using Luxon:** Luxon is a library that provides a powerful API for working with dates and times in JavaScript, including timezone handling and formatting.
Example working with timezones using Luxon:

```js
const DateTime = luxon.DateTime;
const dateTime = DateTime.now().setZone("America/New_York");
console.log(dateTime.toFormat("yyyy-MM-dd HH:mm:ss zzz")); // Output: "2022-05-01 10:30:00 EDT"
```

**11. Relative Time Calculation with Luxon:** Luxon allows you to calculate relative time intervals such as "X days ago" or "Y hours from now."
Example calculating relative time using Luxon:

```js
const DateTime = luxon.DateTime;
const pastDateTime = DateTime.now().minus({ days: 3 });
const relativeTime = pastDateTime.toRelative(); // Outputs "3 days ago"
```

**12. Date Validation:** You can validate if a date is valid using the `isValid()` method provided by libraries like Moment.js or Luxon.
Example validating a date using Moment.js:

```js
const date = moment("2022-02-30", "YYYY-MM-DD");
console.log(date.isValid()); // Output: false
```

Example validating a date using Luxon:

```js
const DateTime = luxon.DateTime;
const date = DateTime.fromISO("2022-02-30");
console.log(date.isValid); // Output: false
```

**13. Date Comparison:** You can compare two dates to check their relative order using the comparison operators (`<`, `<=`, `>`, `>=`) or the comparison methods provided by date libraries.
Example comparing two dates using JavaScript's built-in Date object:

```js
const date1 = new Date("2022-01-01");
const date2 = new Date("2022-02-01");
console.log(date1 < date2); // Output: true
```

Example comparing two dates using Moment.js:

```js
const date1 = moment("2022-01-01");
const date2 = moment("2022-02-01");
console.log(date1.isBefore(date2)); // Output: true
```

**14. Date Arithmetic with Luxon:** Luxon provides powerful date arithmetic methods to perform various operations on dates, such as adding or subtracting durations.
Example adding days to a date using Luxon:

```js
const DateTime = luxon.DateTime;
const date = DateTime.now().plus({ days: 5 });
console.log(date.toISODate()); // Output: "2022-05-25"
```

**15. Time Formatting:** You can format time values using libraries like Moment.js or Luxon, which offer extensive formatting options.
Example formatting a time value using Moment.js:

```js
const time = moment("12:30:00", "HH:mm:ss");
console.log(time.format("hh:mm A")); // Output: "12:30 PM"
```

Example formatting a time value using Luxon:

```js
const DateTime = luxon.DateTime;
const time = DateTime.fromFormat("12:30:00", "HH:mm:ss");
console.log(time.toFormat("hh:mm a")); // Output: "12:30 pm"
```

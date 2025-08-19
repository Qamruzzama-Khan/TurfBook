import { format } from "date-fns";

// function generateSlots(openingTime, closingTime, date) {
//   const slots = [];

//   let [openHour, openMin] = openingTime.split(":").map(Number);
//   let [closeHour, closeMin] = closingTime.split(":").map(Number);

//   // Explanation:
//   // 1. split(":")
//   // openingTime.split(":"); // ["08", "30"]
//   // closingTime.split(":"); // ["20", "15"]
//   // This splits the string into two parts:
//   // First part = hours
//   // Second part = minutes

//   // 2. .map(Number)
//   // ["08", "30"].map(Number); // [8, 30]
//   // ["20", "15"].map(Number); // [20, 15]
//   // Converts the string values into numbers.

//   // 3. Destructuring [hour, min]
//   // let [openHour, openMin] = [8, 30];
//   // let [closeHour, closeMin] = [20, 15];

//   // Now you get:
//   // openHour = 8
//   // openMin = 30
//   // closeHour = 20
//   // closeMin = 15

//   // Conclusion: So basically, these two lines extract the hour and minute (as numbers) from the opening and closing time strings.

//   const start = new Date(date);
//   start.setHours(openHour, openMin, 0, 0);

//   const end = new Date(date);
//   end.setHours(closeHour, closeMin, 0, 0);

//   // Explanation:
//   // Suppose :
//   // date = "2025-08-16"
//   // openHour = 8, openMin = 30
//   // closeHour = 20, closeMin = 0

//   // 1. Create a Date Object
//   // const start = new Date(date);
//   //  const end = new Date(date);
//   // This makes two Date objects, both pointing to the same day (2025-08-16) but at midnight by default.
//   // start = Sat Aug 16 2025 00:00:00
//   // end   = Sat Aug 16 2025 00:00:00

//   // 2. setHours(hour, minute, second, millisecond)
//   // start.setHours(openHour, openMin, 0, 0)
//   // end.setHours(closeHour, closeMin, 0, 0)
//   // This sets the exact time on those date objects
//   // start becomes 2025-08-16 08:30:00.000
//   // end becomes 2025-08-16 20:00:00.000

//   // Why do this?
//   // start = the turf's opening time on that date.
//   // end = the turf's closing time on that date.
//   // Later, the code uses these two values in the while(star < end) loop to generate 1-hour slots in between.

//   // Conclusion: In short
//   // new Date(date) - create the day.
//   // .setHours(...) - position the clock to opening/closing times.

//   while (start < end) {
//     const slotStart = new Date(start);
//     const slotEnd = new Date(start);
//     slotEnd.setHours(slotEnd.getHours() + 1); // 1 hr slot

//     slots.push({
//       startTime: format(new Date(slotStart), "hh:mm a"),
//       endTime: format(new Date(slotEnd), "hh:mm a"),
//     });

//     start.setHours(start.getHours() + 1);
//   }

//   //   Step-by-step explanation:
//   // 1. Loop condition
//   // while (start < end)
//   // Keep running as long as the current start time is before the closing time (end).
//   // This ensures slots are created only between opening and closing hours.

//   // 2. Mark the begining of the slot
//   // const slotStart = new Date(start);
//   // Copy the current start tiem into slotStart.
//   // This is the beginning of the slot (like 08:30 for the first one).

//   // 3. Mark the end of the slot (1hr later)
//   // const slotEnd = new Date(start);
//   // slotEnd.setHours(slotEnd.getHours() + 1);
//   // Copy the same start time into slotEnd.
//   // Add 1 hour - new slotEnd is 1 hour ahead of slotStart.
//   // Example: if slotStart = 08:30, then slotEnd = 09:30.

//   // 4. Save the slot into the list
//   // slots.push({
//   //   startTime: slotStart.toISOString(),
//   //   endTime: slotEnd.toISOString(),
//   //   isBooked: false,
//   // });
//   // Push an object into the slots array.
//   // Each slot has:
//   // startTime - begining of the slot
//   // endTime - end of the slot
//   // isBooked: false - by default its's available (later can be updated to true when someone books it).

//   // 5. Move start ahead by 1 hour for the nex slot
//   // start.setHours(start.getHours() + 1);
//   // Increase the start time by 1 hour.
//   // So if it was 08:30, now it becomes 09:30.
//   // The next loop itereation will create a slot 09:30 to 10:30.

//   // Example Run:
//   // If turf opens at 08:30 and closes at 11:30:
//   // 1st loop - 08:30 to 09:30
//   // 2nd loop - 09:30 to 10:30
//   // 3rd loop - 10:30 to 11:30
//   // Then start = 11:30 equals end, so loop stops.

//   // Conclusion: In short
//   // This loop keeps creating 1-hour slots from opening time until closing time, and stores them in an array with availability info.

//   return slots;
//   // Finally return slots
// }

function generateSlots(openingTime, closingTime, intervalMinutes = 60){
  const slots = [];
  let start = new Date(openingTime);
  let end = new Date(closingTime);

   while (start < end) {
    let slotEnd = new Date(start.getTime() + intervalMinutes * 60000);
    if (slotEnd <= end) {
      slots.push({
        startTime: start.toTimeString().slice(0,5), 
        endTime: slotEnd.toTimeString().slice(0,5)
      });
    }
    start = slotEnd;
  }
  return slots;
}

export default generateSlots;

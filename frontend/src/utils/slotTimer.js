import { parse } from "date-fns";

// Format seconds into human-readable time like "1h 5m 20s
export function formatSlotTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h > 0 ? h + "h " : ""}${m}m ${s}s`;
}

// Get remaining time message for a slot
export function getSlotTimeLeft(startTimeStr, endTimeStr) {
  const now = new Date();

  // Parse "10:30 PM" into a Date for today
  const start = parse(startTimeStr, "HH:mm", now);
  const end = parse(endTimeStr, "hh:mm a", now);

  if (now < start) {
    const diff = Math.floor((start - now) / 1000);
    return `Starts in ${formatSlotTime(diff)}`;
  } else if (now >= start && now <= end) {
    const diff = Math.floor((end - now) / 1000);
    return `Ongoing | Time left: ${formatSlotTime(diff)}`;
  } else {
    return "Expired!";
  }
}

import cron from "node-cron";
import { Slot } from "../models/slot.model.js";

const slotCleanup = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const dateStr = yesterday.toISOString().split("T")[0];

      await Slot.deleteMany({ date: dateStr });
      console.log(`Deleted slots for ${dateStr}`);
    } catch (err) {
      console.error("Error deleting old slots:", err.message);
    }
  });
};

export default slotCleanup;

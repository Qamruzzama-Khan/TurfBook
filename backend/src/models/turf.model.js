import mongoose from "mongoose";

const turfSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    address: {
      street: String,
      city: { type: String, required: true },
      state: String,
      pincode: String,
    },
    images: [{ type: String }],
    pricePerHour: { type: Number, required: true },
    sportsTypes: [{ type: String }], // e.g. ["football", "cricket"]
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
  },
  { timestamps: true }
);

export const Turf = mongoose.model("Turf", turfSchema);

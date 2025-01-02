import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  tripType: {
    type: String,
    enum: ["oneway", "roundtrip"],
    required: true,
  },

  fromLocation: {
    type: String,
    required: true,
  },

  toLocation: {
    type: String,
    required: true,
  },

  startDate: {
    type: Date,
    required: true,
  },

  endDate: {
    type: Date,
  }, // Optional, only for round trips

  searchedAt: {
    type: Date,
    default: Date.now,
  }, // Automatically logs when the search is made

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Search || mongoose.model("Search", searchSchema);

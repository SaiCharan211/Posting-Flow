import mongoose from "mongoose";

const RequirementSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    venue: { type: String },

    hireType: {
      type: String,
      enum: ["planner", "performer", "crew"],
      required: true,
    },

    plannerDetails: {
      budget: Number,
      experienceLevel: String,
    },

    performerDetails: {
      performerType: String,
      genre: String,
      durationMinutes: Number,
    },

    crewDetails: {
      crewType: String,
      numberOfPeople: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Requirement", RequirementSchema);

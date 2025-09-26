import mongoose from "mongoose";
import "./Emotion";

const { Schema } = mongoose;

const entrySchema = new Schema({
  emotion: [{ type: Schema.Types.ObjectId, ref: "Emotion", required: true }],
  intensity: { type: Number, required: true },
  notes: { type: String, required: false },
  dateTime: { type: Date, required: true },
});

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;

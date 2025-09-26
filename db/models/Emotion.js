import mongoose from "mongoose";

const { Schema } = mongoose;

const emotionSchema = new Schema({
  emotion: { type: String, required: true },
});

const Emotion =
  mongoose.models.Emotion || mongoose.model("Emotion", emotionSchema);

export default Emotion;

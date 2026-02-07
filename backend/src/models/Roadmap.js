import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: String,
  status: String
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;

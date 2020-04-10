const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    placeID: String,
    seatRatingAverage: Number,
    comfortRatingAverage: Number,
    internetRatingAverage: Number,
    noiseRating: Number,
    outletRatingAverage: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("DataTwo", DataSchema);

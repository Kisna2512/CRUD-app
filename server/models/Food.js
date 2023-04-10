const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daySinceIAte: {
    type: Number,
    requiredtrue: true,
  },
});

const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;

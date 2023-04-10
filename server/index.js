const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const FoodModel = require("./models/Food");
app.use(express.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://krishnakotgire*****:****@crud.tpr9uqh.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daySinceIAte: days });
  try {
    await food.save();
    res.send("Data inserted succesfully");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.put("/update", async (req, res) => {
  const newfoodName = req.body.newfoodName;
  const id = req.body.id;

  try {
    await FoodModel.findById(id, (err, updatedfood) => {
      updatedfood.foodName = newfoodName;
      updatedfood.save();
      res.send("success!!");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("Deleted");
});

app.listen(5000, () => {
  console.log("Server is listeniong on 5000...");
});

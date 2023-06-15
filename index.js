const express = require("express");
const port = 8000;
const path = require("path");
const db = require("./config/mongoose");
const Todo = require("./models/todo");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

app.get("/", async (req, res) => {
  try {
    const todo = await Todo.find({}).exec();
    return res.render("home", {
      title: "Todo list!",
      todo_list: todo,                            // This is used to get the schema.
    });
  } catch (err) {
    console.log("Error in fetching from db:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// This will create my list
app.post("/create-list", async (req, res) => {
  try {
    await Todo.create({
      task: req.body.task,
      date: req.body.date,
      category: req.body.category,
    });
    return res.redirect("back");
  } catch (err) {
    console.log("Error in creating a contact:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// To delete the list item.
app.post("/delete-list", async (req, res) => {
  try {
    // console.log("req", req.body);
    const id = req.body.ids;
    // console.log("ID is :",id);
    await Todo.findByIdAndDelete(id);
    return res.redirect("back");
  } catch (err) {
    console.log("Error in deleting the object from database:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});

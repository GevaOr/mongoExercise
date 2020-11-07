const express = require("express");
const mongoose = require("mongoose");
const Tutorials = require("./Models/Tutorials");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb+srv://<username>:<password>@cluster0.luqmg.mongodb.net/<db>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected.");
  }
);

app.get("/tutorials/", (_req, res) => {
  Tutorials.find()
    .exec()
    .then((docs) => {
      res.send(docs);
    });
});

app.get("/tutorials/:id", (req, res) => {
  Tutorials.findById(req.params.id)
    .exec()
    .then((docs) => {
      res.send(docs);
    });
});

app.get("/tutorials/:title", (req, res) => {
  Tutorials.find({ title: req.params.title })
    .exec()
    .then((docs) => {
      res.send(docs);
    });
});

app.get("/tutorials/published", (_req, res) => {
  Tutorials.find({ published: true })
    .exec()
    .then((docs) => {
      res.send(docs);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/tutorials", (req, res) => {
  const tutorial = new Tutorials({
    title: req.body.title,
    parts: req.body.parts,
    published: req.body.published,
  });
  tutorial.save().then(() => {
    res.send("Tutorial added.");
  });
});

app.put("/tutorials/:id", (req, res) => {
  Tutorials.update({ _id: req.params.id }, { $set: req.body })
    .exec()
    .then((docs) => {
      res.send(docs);
    });
});

app.delete("/tutorials/:id", (req, res) => {
  Tutorials.remove({ _id: req.params.id })
    .exec()
    .then((docs) => {
      res.send(docs);
    });
});

app.delete("/tutorials", (_req, res) => {
  Tutorials.remove()
    .exec()
    .then((docs) => {
      res.send(docs);
    });
});

app.listen(5000);

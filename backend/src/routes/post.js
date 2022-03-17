const express = require("express");
const postSchema = require("../models/post");

const router = express.Router();

// create posts
router.post("/posts", (req, res) => {
  const post = postSchema(req.body);
  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// get all posts
router.get("/posts", (req, res) => {
  postSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// get all posts
router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  postSchema
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// update a post
router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, text, image, tag, date } = req.body;
  postSchema
    .updateOne({ _id: id }, { $set: { title, text, image, tag, date } })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// delete a post
router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  postSchema
    .remove({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

module.exports = router;

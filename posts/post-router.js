const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("posts")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("posts")
    .where({ id: req.params.id })
    .first()
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError(err);
    });
});

router.post("/", (req, res) => {
  const postData = req.body;

  //validate

  db("posts")
    .insert(postData, "id")
    .returning("id")
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

function handleError(error, res) {
  res.status(500).json({ message: error.message });
}

module.exports = router;

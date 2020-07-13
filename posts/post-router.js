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
      handleError();
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("posts")
    .where({ id: req.params.id })
    .then((post) => {
      res.status(200).json({ data: post });
    })
    .catch((err) => {
      handleError();
    });
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

function handleError(err) {
  res.status(500).json({ message: error.message });
}

module.exports = router;

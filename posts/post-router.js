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
    .then((ids) => {
      db("posts")
        .where({ id: ids[0] })
        .then((post) => {
          res.status(200).json({ data: post[0] });
        });
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "there were no records to delete" });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
});

function handleError(error, res) {
  res.status(500).json({ message: error.message });
}

module.exports = router;

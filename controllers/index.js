const express = require("express");
const router = express.Router();
const db = require("../models/exerciseModel");

router.get("/api/workouts", (req, res) => {
  db.find({})
    .then((db) => {
      console.log(db);
      // db.aggregate([
      //   {$addFields: {
      //       totalDuration: {$sum: "$exercises[0].duration"}
      //   }}
      // ]).exec((err, data)=> {
      //     if (err) console.log(err);
      //     console.log(data)
      // });
      res.json(db);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  db.create({
    day: new Date(new Date().setDate(new Date().getDate())),
    exercises: [],
  })
    .then((created) => {
      res.json(created);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.updateOne(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    (error, success) => {
      if (error) {
        res.json(error);
      } else {
        db.aggregate([
          {
            $addFields: {
              totalDuration: 0,
            },
          },
        ]);
        res.json(success);
      }
    }
  );
});

module.exports = router;

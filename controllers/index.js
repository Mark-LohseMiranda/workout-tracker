const express = require("express");
const router = express.Router();
const db = require("../models/exerciseModel");

router
  .get("/api/workouts", (req, res) => {
    db.aggregate(
      [
        { $match: {} },
        {
          $addFields: {
            totalDuration: {
              $reduce: {
                input: "$exercises",
                initialValue: 0,
                in: {
                  $add: ["$$value", "$$this.duration"],
                },
              },
            },
          },
        },
      ],
      (err, data) => {
        if (err) {
          res.json(err);
        } else {
          res.json(data);
        }
      }
    );
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
        res.json(success);
      }
    }
  );
});

router.get("/aggregate", (req, res) => {
  db.aggregate(
    [
      { $match: {} },
      {
        $addFields: {
          totalDuration: {
            $reduce: {
              input: "$exercises",
              initialValue: 0,
              in: {
                $add: ["$$value", "$$this.duration"],
              },
            },
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    }
  );
});

module.exports = router;

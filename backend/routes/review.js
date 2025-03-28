import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("reviews");
    let result = await collection.find().toArray();

    if (result.length === 0) {
      return res.status(404).send("Nincs értékelés");
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Hiba");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, rating, text, created } = req.body;
    const newReview = {
      name,
      rating,
      text,
      created,
    };
    let collection = await db.collection("reviews");
    let result = await collection.insertOne(newReview);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Hiba");
  }
});

export default router;

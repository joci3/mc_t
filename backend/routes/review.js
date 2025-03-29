import express from "express";
import db from "../db/connection.js";

const router = express.Router();

router.get("/:storeId", async (req, res) => {
  try {
    const { storeId } = req.params;
    const collection = await db.collection("reviews");

    let result = await collection.find({ storeId }).toArray();

    if (result.length === 0) {
      return res.status(404).send("Nincs értékelés");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hiba");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, rating, text, created, storeId } = req.body;
    const newReview = {
      name,
      rating,
      text,
      created,
      storeId,
    };

    setTimeout(async () => {
      let collection = await db.collection("reviews");
      let result = await collection.insertOne(newReview);
      res.send(result).status(204);
    }, 3000);
  } catch (err) {
    console.error(err);
    res.status(500).send("Hiba");
  }
});

export default router;

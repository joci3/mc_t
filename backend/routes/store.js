import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/:id", async (req, res) => {
  let collection = await db.collection("stores");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) {
    res.send("Nem talált").status(404);
  } else {
    res.send(result).status(200);
  }
});

export default router;

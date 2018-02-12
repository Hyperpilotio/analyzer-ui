import express from "express";
import MongoClient from "mongodb";
import fetch from "node-fetch";

const router = express();

router.get("/api/", (req, res) => {
  res.json({ status: "ok" });
});


export default router;

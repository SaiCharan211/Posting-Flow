import express from "express";
import Requirement from "../models/Requirement.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!data.hireType) {
      return res.status(400).json({ error: "hireType is required" });
    }

    const requirement = new Requirement(data);
    await requirement.save();

    res.status(201).json(requirement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

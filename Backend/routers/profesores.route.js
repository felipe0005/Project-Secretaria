import express from "express";
import controller from "../controllers/profesores.controller.js";

const router = express.Router();

router.get("/", controller.profesores);

export default router;

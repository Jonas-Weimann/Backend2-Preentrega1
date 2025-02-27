import { Router } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/", (req, res) => {});

router.get("/:cid", (req, res) => {});

router.post("/:cid/product/:pid", (req, res) => {});

export default router;

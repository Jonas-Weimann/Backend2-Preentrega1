import { Router } from "express";
import { CarritosModel } from "../models/productos.model.js";
import { CarritosDao } from "../models/dao/productos.dao.js";

const router = Router();
const CarritosService = new CarritosDao(CarritosModel);

router.post("/", (req, res) => {});

router.get("/:cid", (req, res) => {});

router.post("/:cid/product/:pid", (req, res) => {});

export default router;

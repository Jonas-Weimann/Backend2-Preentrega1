import { Router } from "express";

const router = Router();

//ENDPOINT GET
router.get("/", (req, res) => {});

//ENDPOINT GET BY ID
router.get("/:pid", (req, res) => {});

//ENDPOINT POST
router.post("/", (req, res) => {});

//ENDPOINT REAL TIME PRODUCTS GET
router.get("/realTimeProducts", (req, res) => {});

//ENDPOINT PUT BY ID
router.put("/:pid", (req, res) => {});

//ENDPOINT DELETE BY ID
router.delete("/:pid", (req, res) => {});

export default router;

import { Router } from "express";
import { CarritosModel } from "../models/carritos.model.js";
import { CarritosDao } from "../models/dao/carritos.dao.js";

const router = Router();
const CarritosService = new CarritosDao(CarritosModel);

//ENDPOINT GET ALL FROM CART
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const carrito = await CarritosService.getAllFromCart(cid);
  if (!carrito) return res.status(404).json("Carrito no encontrado");
  res.json(carrito);
});

//ENDPOINT POST CART
router.post("/", async (req, res) => {
  const carrito = req.body;
  const result = await CarritosService.create(carrito);
  if (!result) return res.status(400).json("Error al crear el carrito");
  res.status(201).json("Carrito creado con éxito");
});

//ENDPOINT POST PRODUCT TO CART
router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const result = await CarritosService.addToCart(cid, pid);
  if (!result)
    return res.status(400).json("Error al agregar producto al carrito");
  res.status(201).json("Producto agregado al carrito con éxito");
});

//ENDPOINT DELETE ALL PRODUCTS FROM CART
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const result = await CarritosService.removeAllFromCart(cid, pid);
  if (!result)
    return res.status(400).json("Error al eliminar producto del carrito");
});

//ENDPOINT DELETE EMPTY CART
router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  const result = await CarritosService.emptyCart(cid);
  if (!result) return res.status(400).json("Error al vaciar el carrito");
});

//ENDPOINT PUT BY ID
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  // Array de productos
  const productos = req.body;
  const result = await CarritosService.update(cid, { products: productos });
  if (!result) return res.status(400).json("Error al actualizar el carrito");
  res.status(200).json("Carrito actualizado con éxito");
});

//ENDPOINT PUT QUANTITY BY ID
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body;
  const result = await CarritosService.updateQuantity(cid, pid, quantity);
  if (!result)
    return res.status(400).json("Error al actualizar la cantidad del producto");
  res.status(200).json("Cantidad actualizada con éxito");
});

export default router;

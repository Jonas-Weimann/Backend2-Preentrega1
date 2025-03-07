import { Router } from "express";
import { ProductosModel } from "../models/productos.model.js";
import { ProductosDao } from "../models/dao/productos.dao.js";
import { formatear } from "../utils.js";

const router = Router();
const ProductosService = new ProductosDao(ProductosModel);

//ENDPOINT GET
router.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  //Obtengo todos los productos paginados y filtrados según la query
  let productos = await ProductosModel.paginate(
    query ? JSON.parse(query) : {},
    {
      page: page ? parseInt(page) : 1,
      limit: 10,
    }
  );

  if (!productos) {
    return res.status(404).send("No se encontraron productos");
  }

  //Limito los resultados al valor de limit dentro de la misma página
  productos.docs = limit
    ? productos.docs.slice(0, parseInt(limit))
    : productos.docs.slice(0, parseInt(10));

  //Ordeno los resultados por precio según el valor de sort
  productos.docs = productos.docs.sort((a, b) => {
    return sort == "asc"
      ? a.price - b.price
      : sort == "desc"
      ? b.price - a.price
      : 0;
  });

  //Creo los links de paginación
  productos["prevLink"] = productos.hasPrevPage
    ? `/?limit=${limit || ""}&page=${productos.prevPage}&sort=${
        sort || ""
      }&query=${query || ""}`
    : null;

  productos["nextLink"] = productos.hasNextPage
    ? `/?limit=${limit || ""}&page=${productos.nextPage}&sort=${
        sort || ""
      }&query=${query || ""}`
    : null;

  //Cambio el nombre de docs a payload
  productos["payload"] = productos.docs;

  delete productos.docs;

  res.status(201).json(productos);
});

//ENDPOINT GET BY ID
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const producto = await ProductosService.getById(pid);
  if (!producto) return res.status(404).send("Producto no encontrado");
  res.status(201).json(producto);
});

//ENDPOINT POST
router.post("/", async (req, res) => {
  const producto = req.body;
  const result = Array.isArray(producto)
    ? await ProductosService.createMany(producto)
    : await ProductosService.create(producto);
  if (!result) res.status(400).send("Error al crear los productos");
  res.status(201).send("Productos creados con exito");
});

//ENDPOINT PUT BY ID
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await ProductosService.update(pid, req.body);
  if (!result) return res.status(400).send("Error al actualizar el producto");
  res.status(201).send("Producto actualizado con exito");
});

//ENDPOINT DELETE BY ID
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const result = await ProductosService.delete(pid);
  if (!result) return res.status(400).send("Error al eliminar el producto");
  res.status(201).send("Producto eliminado con exito");
});

export default router;

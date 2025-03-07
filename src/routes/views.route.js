import { Router } from "express";
import { ProductosModel } from "../models/productos.model.js";
import { formatear } from "../utils.js";
import { CarritosModel } from "../models/carritos.model.js";
import { CarritosDao } from "../models/dao/carritos.dao.js";
import { ProductosDao } from "../models/dao/productos.dao.js";

const CarritosService = new CarritosDao(CarritosModel);
const ProductosService = new ProductosDao(ProductosModel);

const router = Router();

router.get("/", (req, res) => {
  res.render("landing", {});
});

router.get("/products", async (req, res) => {
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
    return res.render("error", { error: "No se encontraron productos" });
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
    ? `/products/?limit=${limit || ""}&page=${productos.prevPage}&sort=${
        sort || ""
      }&query=${query || ""}`
    : null;

  productos["nextLink"] = productos.hasNextPage
    ? `/products/?limit=${limit || ""}&page=${productos.nextPage}&sort=${
        sort || ""
      }&query=${query || ""}`
    : null;

  //Cambio el nombre de docs a payload
  productos["payload"] = productos.docs;

  delete productos.docs;

  //Renderizo una vista con todos los productos paginados
  res.render("index", {
    productos: JSON.parse(JSON.stringify(productos.payload)),
    formatear,
    prevPage: productos.prevLink,
    nextPage: productos.nextLink,
  });
});

router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const producto = await ProductosService.getById(pid);
  if (!producto)
    return res.render("error", { error: "Producto no encontrado" });
  //Renderizo una vista con el producto seleccionado
  res.render("product", { producto: JSON.parse(JSON.stringify(producto)) });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const carritoConProducts = await CarritosService.getAllFromCart(cid);
  const products = carritoConProducts.products;
  if (!carrito) return res.render("error", { error: "Producto no encontrado" });
  //Renderizo una vista con el carrito seleccionado
  res.render("cart", { productos: products });
});

export default router;

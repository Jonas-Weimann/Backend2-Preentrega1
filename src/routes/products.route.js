import { Router } from "express";
import { leerJSON, actualizarJSON } from "../utils.js"
import { formatear } from "../utils.js";

const router = Router();


//ENDPOINT GET
router.get("/", (req, res) => {
  const products = leerJSON("src/db/products.json");
  const query = req.query
    if(query.limit){
        return res.render("home", { products: products.slice(0, query.limit), formatear });
    }
    if(query.category){
      return res.render("home", {products: products.filter(prod => prod.category == query.category), formatear})
    }
  res.render("home",  {products, formatear} );
});

//ENDPOINT GET BY ID
// router.get("/:pid",(req, res)=>{
//   const productos = leerJSON("src/db/products.json")
//   const {pid} = req.params
//   const producto = productos.find(producto => producto.id == pid)
//   if(!producto){
//       return res.status(404).json({error: "producto no encontrado"})
//   }
//   res.json(producto)
// })

//ENDPOINT POST
router.post("/", (req, res)=>{
  const products = leerJSON("src/db/products.json")
  const producto = req.body
  producto.id = uuidv4()
  producto.status = producto.status?? true
  if(!producto.title || !producto.description || !producto.code || !producto.price || !producto.stock || !producto.category){
    return res.status(400).json({error: "Hay campos obligatorios faltantes"})
  }
  products.push(producto)
  actualizarJSON("src/db/products.json", products)
  res.json({mensaje: "Producto agregado con éxito"})
})

//ENDPOINT REAL TIME PRODUCTS GET
router.get("/realTimeProducts", (req, res) => {
  const products = leerJSON("src/db/products.json");
  res.render("realTimeProducts", {products})
});

//ENDPOINT PUT BY ID
router.put("/:pid",(req, res)=>{
  const productos = leerJSON("src/db/products.json")
  const productoActualizado = req.body
  const {pid} = req.params

  const productoEncontrado = productos.find(producto => producto.id === pid)
  if(!productoEncontrado){
      return res.status(404).json({error: "Producto no encontrado"})
  }

  const productoNuevo = {
      ...productoEncontrado,
      ...productoActualizado
  }

  const productosActualizados = productos.map(producto => producto.id === pid ? productoNuevo : producto)

  actualizarJSON("src/db/products.json", productosActualizados)

  res.json({mensaje: "Producto actualizado con éxito"})
})

//ENDPOINT DELETE BY ID
router.delete("/:pid",(req, res)=>{
  const productos = leerJSON("src/db/products.json")
  const {pid} = req.params

  const productoEncontrado = productos.find(producto => producto.id === pid)
  if(!productoEncontrado){
      return res.status(404).json({error: "Producto no encontrado"})
  }

  const productosActualizados = productos.filter(producto => producto.id !== pid)

  actualizarJSON("src/db/products.json", productosActualizados)

  res.json({mensaje: "Producto eliminado con éxito"})
})

export default router;

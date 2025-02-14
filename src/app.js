import express from "express";
import ProductsRoute from "./routes/products.route.js";
import CartsRoute from "./routes/carts.route.js"
import handlebars from "express-handlebars";
import path from "path";
import { actualizarJSON, formatear, leerJSON } from "./utils.js";
import { Server } from "socket.io";
import { upload } from "./utils.js";
import { v4 as uuidv4 } from "uuid";


const app = express();

app.engine("handlebars", handlebars.engine({
  helpers:{
    formatear
  }
}));

app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");
app.use("/static", express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products/", ProductsRoute);
app.use("/carts/", CartsRoute);

const serverHttp = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

const webSocketServer= new Server(serverHttp)

webSocketServer.on('connection', async (socket) => {
  console.log('Nueva conexion')
  socket.on('add-product', async (data) => {
    //Recibo la data del evento add-product y la uso para actualizar el json de productos
    const productos = await leerJSON('src/db/products.json')
    data['id'] = uuidv4()
    data['status'] = data.status?? true
    productos.push(data)
    actualizarJSON('src/db/products.json', productos)
    //Emito un evento al socket para volver a cargar los productos
    webSocketServer.emit('load-products', productos)
  })
  socket.on('delete-product', async(productId)=>{
  const productos = await leerJSON('src/db/products.json')
  const productoEncontrado = productos.find(producto => producto.id === productId)
  const productosActualizados = productos.filter(producto => producto.id !== productId)
  actualizarJSON("src/db/products.json", productosActualizados)
  webSocketServer.emit('load-products', productosActualizados)
  })
})

//ENDPOINT POST PARA CARGAR LAS IMAGENES CON MULTER
app.post('/upload', upload.single('img'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No hay ningun archivo para cargar.');
  }
  res.send(`/static/images/${req.file.filename}`);
});
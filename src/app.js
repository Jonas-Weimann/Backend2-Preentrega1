import express from "express";
import ProductsRoute from "./routes/products.route.js";
import CartsRoute from "./routes/carts.route.js";
import handlebars from "express-handlebars";
import path from "path";
import { formatear } from "./utils.js";
import { upload } from "./utils.js";
import { v4 as uuidv4 } from "uuid";
import { connectToMongo } from "./connections/mongo.js";

const app = express();

app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      formatear,
    },
  })
);

app.set("views", path.join(process.cwd(), "src", "views"));
app.set("view engine", "handlebars");
app.use("/static", express.static(path.join(process.cwd(), "src", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products/", ProductsRoute);
app.use("/api/carts/", CartsRoute);

//ENDPOINT POST PARA CARGAR LAS IMAGENES CON MULTER
app.post("/upload", upload.single("img"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No hay ningun archivo para cargar.");
  }
  res.send(`/static/images/${req.file.filename}`);
});

connectToMongo();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

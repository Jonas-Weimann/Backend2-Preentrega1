import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import ViewsRoute from "./routes/views.route.js";
import ProductsRoute from "./routes/products.route.js";
import CartsRoute from "./routes/carts.route.js";
import { initMongoDB } from "./daos/mongodb/connection.js";
import { formatear, subtotal } from "./utils.js";
import { upload, __dirname } from "./utils.js";
import "dotenv/config.js";

const app = express();
const PORT = 8080;

initMongoDB()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));

const cookieConfig = {
  maxAge: 180000,
  httpOnly: true,
  secure: false,
};

const ttlSeconds = 180;

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: ttlSeconds,
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: cookieConfig,
};

app.use(session(sessionConfig));

app.engine(
  "handlebars",
  handlebars.engine({
    helpers: {
      formatear,
      subtotal,
    },
  })
);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");
app.use("/static", express.static(path.join(__dirname, "/public")));

app.use("/", ViewsRoute);
app.use("/api/products/", ProductsRoute);
app.use("/api/carts/", CartsRoute);

//ENDPOINT POST PARA CARGAR LAS IMAGENES CON MULTER
app.post("/upload", upload.single("img"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No hay ningun archivo para cargar.");
  }
  res.send(`/static/images/${req.file.filename}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const warehouseRoutes = require("./routes/warehouse-routes");
const inventoryRoutes = require("./routes/inventory-routes");

app.use(express.json());
app.use(cors());

app.use("/api/warehouses", warehouseRoutes);

app.use("/api/inventories", inventoryRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

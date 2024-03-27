require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT;

const warehouseRoutes = require('./routes/warehouse-routes')

app.use("/", warehouseRoutes);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

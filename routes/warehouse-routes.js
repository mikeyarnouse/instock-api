const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

router
  .route("/")
  .get(warehouseController.getWarehouses)
  .post(warehouseController.addWarehouse);

router
  .route("/:id")
  .get(warehouseController.findWarehouse)
  .put(warehouseController.updateWarehouse)

router
  .route("/:id/inventories")
  .get(warehouseController.getInventoryWarehouse)
module.exports = router;


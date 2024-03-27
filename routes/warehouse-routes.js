const router = require('express').Router();
const warehouseController = require('../contollers/warehouse-controller')

router.route('/:id').get(warehouseController.findWarehouse);


module.exports = router;

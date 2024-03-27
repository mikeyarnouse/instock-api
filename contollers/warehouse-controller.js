const knex = require('knex')(require('../knexfile'));

const findWarehouse = async (req, res) => {
    try {
        const warehousefound = await knex('warehouses')
            .where({ id: req.params.id });
        if (warehousefound === 0) {
            return res.status(404).json({
                message: `Warehouse with ID ${req.params.id} not found`
            });
        }
        const warehouseData = warehousefound[0];
        res.json(warehouseData);
    } catch (err) {
        res.status(500).json({
            message: `Unable to retrieve user data for user with ID ${req.params.id}`,
        });
    }
}

module.exports = {
    findWarehouse,
}
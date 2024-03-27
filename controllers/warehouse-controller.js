const knex = require("knex")(require("../knexfile"));

const getWarehouses = async (req, res) => {
  try {
    const warehouses = await knex("warehouses").select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    );
    res.json(warehouses);
  } catch (e) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data. ${req.params.id}`,
    });
  }
};

const findWarehouse = async (req, res) => {
  try {
    const warehousefound = await knex("warehouses")
      .where({
        id: req.params.id,
      })
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      );
    if (warehousefound === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    const warehouseData = warehousefound[0];
    res.json(warehouseData);
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve warehouse data for warehouse with ID: ${req.params.id}.`,
    });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    const rowsUpdated = await knex("warehouses")
      .where({ id: req.params.id })
      .update(req.body);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    const updatedWarehouse = await knex("warehouses")
      .where({
        id: req.params.id,
      })
      .first()
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      );

    res.json(updatedWarehouse);
  } catch (e) {}
};

module.exports = {
  getWarehouses,
  findWarehouse,
  updateWarehouse,
};

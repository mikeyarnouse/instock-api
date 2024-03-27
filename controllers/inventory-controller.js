const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("inventories").select(
      "id",
      "warehouse_id",
      "item_name",
      "description",
      "status",
      "quantity"
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving Inventories: ${error}`);
  }
};

const findItem = async (req, res) => {
  try {
    const warehouseInventories = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.status",
        "inventories.quantity"
      )
      .where("inventories.id", req.params.id);

    res.json(warehouseInventories[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Unable to retrieve item data for item with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  index,
  findItem,
};

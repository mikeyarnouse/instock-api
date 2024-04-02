const knex = require("knex")(require("../knexfile"));

const index = async (_req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
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
        "inventories.quantity",
        "inventories.category"
      )
      .where("inventories.id", req.params.id);

    res.json(warehouseInventories[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve item data for item with ID ${req.params.id}`,
    });
  }
};

const add = async (req, res) => {
  //Long conditional that just checks that every required field is filled out
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res.status(400).json({
      message:
        "Please provide necessary details for the inventory item in the request",
    });
  } else if (isNaN(req.body.quantity)) {
    //Checks if quantity is a valid number. Returns false if not a number
    return res.status(400).json({
      message: "Quantity is not a valid number",
    });
  }

  // Code to check if warehouse exists
  const existingWarehouse = await knex("warehouses").where({
    id: req.body.warehouse_id,
  });
  if (existingWarehouse.length === 0) {
    return res.status(400).json({
      message: "Please provide a valid warehouse_id",
    });
  }

  try {
    const result = await knex("inventories").insert(req.body); //Adds an item to the db. Only reaches here with valid fields

    const newInventoryId = result[0]; //Takes the newly generated id for the item
    const createdInventoryItem = await knex("inventories")
      .where({ id: newInventoryId }) //Retrieves the newly created item to return
      .select(
        "id",
        "warehouse_id",
        "item_name",
        "description",
        "category",
        "status",
        "quantity"
      );
    res.status(201).json(createdInventoryItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new inventory item: ${error}`,
    });
  }
};

const update = async (req, res) => {
  console.log(req.body)
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status
  ) {
    return res.status(400).json({
      message:
        "Please provide necessary details for the inventory item in the request",
    });
  } else if (isNaN(req.body.quantity)) {
    //Checks if quantity is a valid number. Returns false if not a number
    return res.status(400).json({
      message: "Quantity is not a valid number",
    });
  }
  try {
    const itemUpdated = await knex("inventories")
      .where({ id: req.params.id })
      .update(req.body);

    if (itemUpdated === 0) {
      return res.status(404).json({
        message: `Inventory item with ID ${req.params.id} not found`,
      });
    }

    const updatedItem = await knex("inventories").where({
      id: req.params.id,
    });

    res.json(updatedItem[0]);
  } catch (error) {
    res.status(500).json({
      message: `Unable to update user with ID ${req.params.id}: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDelete = await knex("inventories")
      .where({ id: req.params.id })
      .delete();
    if (rowsDelete === 0) {
      return res
        .status(404)
        .json({ message: `Inventory with ID: ${req.params.id} not found` });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete inventory: ${error}`,
    });
  }
};

module.exports = {
  index,
  findItem,
  add,
  update,
  remove,
};

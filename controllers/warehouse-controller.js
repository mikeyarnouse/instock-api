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
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    res.status(500).send({message: "All fields must be inputted"})
    return
  }
  else if (!req.body.contact_email.includes("@") || !req.body.contact_email.includes(".com")){
    res.status(500).send({message: "Invalid Email Address"})
    return
  } 
  else if (req.body.contact_phone.length!==17){
    res.status(500).send({message: "Invalid Phone Number Format, Must Use Format: +1 (XXX) XXX-XXXX"})
    return
  }

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
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

module.exports = {
  getWarehouses,
  findWarehouse,
  updateWarehouse,
};

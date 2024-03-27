const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
        const data = await knex('inventories');
        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Error retrieving Inventories: ${error}`)
    }
}

const findItem = async (req, res) => {
    try {
      const itemFound = await knex("inventories")
        .where({ id: req.params.id });
  
      if (itemFound.length === 0) {
        return res.status(404).json({
          message: `Item with ID ${req.params.id} not found` 
        });
      }
  
      const itemData = itemFound[0];
    //   const wareHouse = await knex("warehouse")
    //     .where(itemData.id === wareHouse.id);
    //   itemData.warehouse_id = wareHouse.name;
      res.json(itemData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve item data for item with ID ${req.params.id}`,
      });
    }
};

module.exports = {
    findItem,
    index
  }
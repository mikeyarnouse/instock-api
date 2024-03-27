const knex = require('knex')(require('../knexfile'));

const findItem = async (req, res) => {
    try {
      const itemFound = await knex("user")
        .where({ id: req.params.id });
  
      if (itemFound.length === 0) {
        return res.status(404).json({
          message: `Item with ID ${req.params.id} not found` 
        });
      }
  
      const itemData = itemFound[0];
      res.json(itemData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve item data for item with ID ${req.params.id}`,
      });
    }
};

module.exports = {
    findItem
  }
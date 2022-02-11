const express = require('express');
const router = express.Router();


const PantryController = require("../controllers/pantryController.js")
const BasketController = require("../controllers/basketController.js")

//**********************************Pantry**************** */
router.post('/createPantry', PantryController.createPantry);
router.get('/pantry/:pantryId',PantryController.getPantry)
/***********************************Basket*********************** */
router.post('/pantry/:PantryId/basket/:BasketName',BasketController.createBasket)
router.get('/pantry/:PantryId/basket/:BasketName',BasketController.getBasket)
router.put('/pantry/:PantryId/basket/:BasketName',BasketController.updateBasket)
router.delete('/pantry/:PantryId/basket/:BasketName',BasketController.deleteBasket)

module.exports = router;






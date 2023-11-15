import express from 'express';
import { body } from 'express-validator';
import {
    addToCart,
    deleteCart,
    getCart,
    getCartTotal,
    updateCart,
} from '../handlers/handleCarts';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/cart', getCart);
router.post('/cart',
    body('quantity').isNumeric(),
    handleInputErrors,
    addToCart
);
router.put('/cart/:id',
    body('quantity').isNumeric(),
    handleInputErrors,
    updateCart
);
router.delete('/cart/:id', deleteCart);
router.get('/cart/total', getCartTotal);

export default router;
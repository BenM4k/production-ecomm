import express from 'express';
import { body } from 'express-validator';
import {
    createShipping,
    deleteShipping,
    getShipping,
    getShippings,
    updateShipping
} from '../handlers/handleShipping';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/shippings', getShippings);
router.post('/shippings',
    body('tracking_number').isNumeric(),
    body('address').isString(),
    handleInputErrors,
    createShipping
);
router.get('/shippings/:id', getShipping);
router.put('/shippings/:id',
    body('address').optional().isString(),
    body('tracking_number').optional().isNumeric(),
    body('status').optional().isString(),
    handleInputErrors,
    updateShipping
);
router.delete('/shippings/:id', deleteShipping);

export default router;
import express from 'express';
import { body } from 'express-validator';
import {
    createPayment,
    deletePayment,
    getPayment,
    getPayments,
    updatePayment
} from '../handlers/handlePayments';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/payments', getPayments);
router.post('/payments',
    body('amount').isNumeric(),
    body('date').isDate(),
    handleInputErrors,
    createPayment
);
router.get('/payments/:id', getPayment);
router.put('/payments/:id',
    body('amount').optional().isNumeric(),
    body('date').optional().isDate(),
    handleInputErrors,
    updatePayment
);
router.delete('/payments/:id', deletePayment);

export default router;
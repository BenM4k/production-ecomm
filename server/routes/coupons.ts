import express from 'express';
import { body } from 'express-validator';
import {
    createCoupon,
    deleteCoupon,
    getCoupon,
    getCoupons,
    updateCoupon
} from '../handlers/handleCoupons';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/coupons', getCoupons);
router.post('/coupons',
    body('code').isString(),
    body('discount').isNumeric(),
    body('expiry_date').isString(),
    handleInputErrors,
    createCoupon
);
router.get('/coupons/:id', getCoupon);
router.put('/coupons/:id',
    body('code').optional().isString(),
    body('discount').optional().isNumeric(),
    body('expiry_date').optional().isString(),
    handleInputErrors,
    updateCoupon
);
router.delete('/coupons/:id', deleteCoupon);

export default router;
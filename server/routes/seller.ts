import express from 'express';
import { body } from 'express-validator';
import {
    createSeller,
    deleteSeller,
    getSeller,
    getSellers,
    updateSeller
} from '../handlers/handleSellers';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/sellers', getSellers);
router.post('/sellers',
    body('company_name').isString(),
    body('contact_info').isString(),
    body('bio').isString(),
    handleInputErrors,
    createSeller
);
router.get('/sellers/:id', getSeller);
router.put('/sellers/:id',
    body('company_name').optional().isString(),
    body('contact_info').optional().isString(),
    body('bio').optional().isString(),
    handleInputErrors,
    updateSeller
);
router.delete('/sellers/:id', deleteSeller);

export default router;
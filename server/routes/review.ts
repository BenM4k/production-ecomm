import express from 'express';
import { body } from 'express-validator';
import {
    createReview,
    deleteReview,
    getReview,
    getReviews,
    updateReview
} from '../handlers/handleReviews';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/reviews', getReviews);
router.post('/reviews',
    body('rating').isNumeric(),
    body('comment').isString(),
    handleInputErrors,
    createReview
);
router.get('/reviews/:id', getReview);
router.put('/reviews/:id',
    body('rating').optional().isNumeric(),
    body('comment').optional().isString(),
    handleInputErrors,
    updateReview
);
router.delete('/reviews/:id', deleteReview);

export default router;
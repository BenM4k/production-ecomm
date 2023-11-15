import express from 'express';
import { body } from 'express-validator';
import {
    createCategory,
    deleteCategory,
    getCategory,
    getCategories,
    updateCategory
} from '../handlers/handleCategories'
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories',
    body('name').isString(),
    handleInputErrors,
    createCategory
);
router.get('/categories/:id', getCategory);
router.put('/categories/:id',
    body('name').optional().isString(),
    handleInputErrors,
    updateCategory
);
router.delete('/categories/:id', deleteCategory);

export default router;
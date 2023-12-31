import express from 'express';
import { body } from 'express-validator';
import handleLogin from '../handlers/handleLogin';
import handleLogout from '../handlers/handleLogout';
import handleRefreshtoken from '../handlers/handleRefresh';
import handleRegistration from '../handlers/handleRegister';
import { handleInputErrors } from '../middlewares/validate';

const router = express.Router();

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    handleInputErrors,
    handleLogin
);
router.get('/logout', handleLogout);
router.get('/refresh', handleRefreshtoken);
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('first_name').isLength({ min: 2 }).isString(),
    body('last_name').isLength({ min: 2 }).isString(),
    handleInputErrors,
    handleRegistration
);

export default router;

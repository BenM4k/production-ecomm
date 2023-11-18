import prisma from '../db';
import jwt from 'jsonwebtoken';
import { createJWT } from '../utils/auth';

const handleRefreshtoken = async (req, res) => {
    const cookie = req.cookies.jwt;

    if (!cookie) {
        res.status(401).json({message: 'could not find a refresh token cookie'});
        return
    }

    const refreshToken = cookie;
    const user = await prisma.user.findFirst({
        where: {
            refresh_token: refreshToken
        },
        include: {
            Seller: true,
        }
    })

    if (!user) {
        res.status(401).json({message: 'Unauthorized'});
        return
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
        if (err || user.email !== decoded.email) return res.sendStatus(403);
        const token = createJWT(user);
        const responseUser = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
            Seller: user.Seller,
        }
        res.json({
            user: responseUser,
            token: token
        });
    });
}

export default handleRefreshtoken;
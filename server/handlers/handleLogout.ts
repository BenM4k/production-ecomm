import prisma from "../db";

const handleLogout = async (req, res) => {
    const cookie = req.cookies.jwt;

    if (!cookie) {
        res.status(401).json({message: 'Unauthorized'});
        return
    }

    const refreshToken = cookie;

    const user = await prisma.user.findFirst({
        where: {
            refresh_token: refreshToken
        }
    })

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            refresh_token: null
        }
    })

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
};

export default handleLogout;
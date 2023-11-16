import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '10s'}
    );
    return token;
}

export const createRefreshJWT = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role
        },
        process.env.JWT_SECRET_REFRESH,
        {expiresIn: '1w'}
    );
    return token;
};

export const comparePassword = (pwd, hash) => {
    return bcrypt.compare(pwd, hash);
}

export const hashPwd = async (pwd) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pwd, salt);
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401).json({message: 'Token not found'});
        return
    }

    const [, token] = bearer.split(' ');

    if (!token){
        res.status(401).json({message: 'Token not found'});
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        if (user.role === 'ADMIN') {
            next();
        }else{
            res.status(401).json({message: 'You must be an admin'});
            return
        }
    }catch(e) {
        res.status(401).json({message: 'Token not found'});
        return
    }
}

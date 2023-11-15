import prisma from '../db';
import { hashPwd } from '../utils/auth';

const handleRegistration = async (req, res) => {
    const data = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: await hashPwd(req.body.password)
    }

    try {
        const user = await prisma.user.create({data: data});
        res.status(200).json({message: `User ${user.first_name} - ${user.last_name} created successfully`});
    }catch(e) {
        res.status(500).json({message: e.message});
    }
};

export default handleRegistration;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const jwtSecret = (userId: string) => {
    try {
        return process.env.JWT_SECRET;
    } catch (error) {
        console.log('error ===> ', error);
    }
};

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, { algorithm: 'HS256', expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string, { algorithms: ['HS256'] });
};

export default class UserAccountService {
    JWT_Secret: string | boolean;
    saltRounds: number;

    constructor() {
        console.log('JWT ==> UserAccountService');
        this.JWT_Secret = process?.env?.JWT_SECRET || false;
        // bcrypt
        this.saltRounds = 10;
    }

    async hashCompare(userId: string, hash: any) {
        return bcrypt.compareSync(userId, hash);
    }

    async hashUser(userId: string) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(userId, salt);
            const compare = await this.hashCompare(userId, hash);

            return { hash, compare };
        } catch (error) {
            return { error: `Error JWT Hashuser ${userId}` };
        }
    }

    jwtSecret() {
        try {
            return this.JWT_Secret;
        } catch (error) {
            console.log('error ===> ', error);
            return 'Error JWT Secret';
        }
    }

    generationToken(userId: string) {
        const id = userId;
        // console.log('generationToken ==> ID ===> ', id);
        return jwt.sign({ id }, this.JWT_Secret as string, { algorithm: 'HS256', expiresIn: '1h' });
    }
}

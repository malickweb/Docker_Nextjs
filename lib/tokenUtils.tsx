import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AES, enc, mode, pad } from 'crypto-js';

export class UserLogin {
    key: string;
    data: any;
    passPhrase: string;
    result: { [key: string]: string };
    client: any;

    constructor() {
        this.key = '123';
        this.passPhrase = 'Bope';
        this.result = { email: '', password: '' };
    }

    encodedata(elm: string) {
        try {
            const key = enc.Utf8.parse(this.passPhrase.padEnd(16, '0'));
            const iv = enc.Utf8.parse('0000000000000000');

            const cryptoEncrypt = AES.encrypt(elm, key, { iv: iv, mode: mode.CBC, padding: pad.Pkcs7 }).toString();
            console.log('crypto_Encrypt', cryptoEncrypt);

            const cryptoDecrypt = AES.decrypt(cryptoEncrypt, key, { iv: iv, mode: mode.CBC, padding: pad.Pkcs7 }).toString(enc.Utf8);

            console.log('Original:', elm);
            console.log('crypto_Decrypt', cryptoDecrypt);

            return cryptoEncrypt;
        } catch (error) {
            console.error('Error in encodedata:', error);
            return 'Error Encode Data';
        }
    }

    async hashCompare(userId: string, hash: any) {
        return bcrypt.compareSync(userId, hash);
    }

    generationToken(userId: string) {
        const id = userId;
        // console.log('generationToken ==> ID ===> ', id);
        return jwt.sign({ id }, this.passPhrase as string, { algorithm: 'HS256', expiresIn: '1h' });
    }

    decodeToken(token: string): boolean {
        try {
            const secret = process.env.JWT_SECRET || this.passPhrase;
            const decoded = jwt.verify(token, secret) as { id: string; iat: number; exp: number };

            console.log('DECODED', decoded.id);
            console.log('IAT', decoded.iat);
            console.log('EXP', decoded.exp);

            if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
                console.log('DECODED id', decoded.id);
            }
            const timestamp = decoded.exp * 1000;
            const dateNow = Date.now();
            if (dateNow > timestamp) {
                return false;
            }
            // console.log('TOKEN TRUE ', decoded);
            return true;
        } catch (error) {
            console.log('ERROR', error);
            return false;
        }
    }

    initLogin() {
        try {
            if (typeof this.data === 'object') {
                Object.keys(this.data).map((elm) => {
                    this.result[elm] = this.encodedata(this.data[elm]);
                });
                console.log('<== RESULT ==> ', this.result);
            } else {
                console.log('ELSE ===> THIS.DATA', this.data);
            }
        } catch (error) {
            console.log('Error <== InitLogin ==>');
        }
    }
}

// Instance pour réutilisation
export const userLogin = new UserLogin();

// Fonctions rapides
export const generateToken = (email: string) => userLogin.generationToken(email);
export const encodedata = (email: string) => userLogin.encodedata(email);
export const decodedToken = (token: string) => userLogin.decodeToken(token);

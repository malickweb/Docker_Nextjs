import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AES, enc, mode, pad } from 'crypto-js';

export class UserLogin {
    key: string;
    data: string | { [key: string]: string } = '';
    passPhrase: string;
    result: { [key: string]: string };

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
            // const cryptoDecrypt = AES.decrypt(cryptoEncrypt, key, { iv: iv, mode: mode.CBC, padding: pad.Pkcs7 }).toString(enc.Utf8);

            return cryptoEncrypt;
        } catch {
            return 'Error Encode Data';
        }
    }

    generationToken(userId: string) {
        const id = userId;
        return jwt.sign({ id }, this.passPhrase as string, { algorithm: 'HS256', expiresIn: '1h' });
    }

    decodeToken(token: string): boolean {
        try {
            const secret = process.env.JWT_SECRET || this.passPhrase;
            const decoded = jwt.verify(token, secret) as { id: string; iat: number; exp: number };
            const timestamp = decoded.exp * 1000;
            const dateNow = Date.now();

            if (dateNow > timestamp) {
                return false;
            }

            return true;
        } catch {
            return false;
        }
    }

    initLogin() {
        try {
            if (typeof this.data === 'object' && this.data !== null) {
                Object.keys(this.data).forEach((elm: string) => {
                    this.result[elm] = this.encodedata((this.data as { [key: string]: string | [] })[elm] as string);
                });
            } else if (typeof this.data === 'string') {
                this.encodedata(this.data);
            }
        } catch {
            return 'Error <== InitLogin ==>';
        }
    }
}

// Instance pour réutilisation
export const userLogin = new UserLogin();

// Fonctions rapides
export const generateToken = (email: string) => userLogin.generationToken(email);
export const encodedata = (email: string) => userLogin.encodedata(email);
export const decodedToken = (token: string) => userLogin.decodeToken(token);

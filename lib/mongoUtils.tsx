import { clientPromise } from './mongodb';
import { ObjectId, MongoClient, Db } from 'mongodb';
import { generateToken, encodedata } from './tokenUtils';

export interface User {
    _id?: ObjectId;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MongoResponse {
    success: boolean;
    data?: { [key: string]: string | number } | unknown;
    message?: string;
    token?: string;
    error?: string;
}

export class MongoUtils {
    private client: MongoClient | null = null;
    private db: Db | null = null;

    private getDb(): Db {
        if (!this.db) {
            throw new Error('DB non initialisée. Appelez connect() avant.');
        }
        return this.db;
    }

    // Recherche utilisateur par email
    async findUserByEmail(elm: string): Promise<MongoResponse> {
        try {
            if (!this.db) await this.connect();
            const collection = this.getDb().collection('users');
            const user = await collection.findOne({ email: elm });

            if (!user) return { success: false, message: 'Utilisateur pas dans la DB' };

            return { success: true, message: 'Utilisateur dans la DB', data: user };
        } catch {
            console.error('Erreur dans la recherche utilisateur par email');
            return { success: false, error: 'Erreur dans la recherche utilisateur par email' };
        }
    }

    // Création de l'utilisateur
    async createUser(userData: Omit<User, '_id'>): Promise<MongoResponse> {
        try {
            if (!this.db) await this.connect();
            const collection = this.getDb().collection('users');

            const encodeEmail = encodedata(userData.email);
            const token = generateToken(userData.email);
            userData.email = encodeEmail;

            const existingUser = await this.findUserByEmail(userData?.email);
            if (existingUser.success) {
                await this.closeConnection();
                return { success: existingUser.success, message: `${existingUser?.message || existingUser?.error}`, token: token };
            }
            const newUser = {
                ...userData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const result = await collection.insertOne(newUser);
            /*
            Exemple de reponse
            {
                success: true,
                data: {
                  acknowledged: true,
                  insertedId: new ObjectId('68a667c48723ab49e3192555')
                }
            }
            */
            await this.closeConnection();
            if (result?.acknowledged) return { success: true, message: 'Nouvelle entrée', token: token };
            return { success: false, error: "Erreur dans l'enregistrement" };
        } catch {
            return { success: false, error: 'Erreur création utilisateur' };
        }
    }

    // Suppression de l'utilisateur
    async deleteUser(email: string): Promise<MongoResponse> {
        try {
            if (!this.db) await this.connect();
            const collection = this.getDb().collection('users');
            const encodeEmail = encodedata(email);
            const existingUser = await this.findUserByEmail(email);
            if (existingUser.success) {
                const result = await collection.deleteOne({ email: encodeEmail });
                return { success: true, message: `Suppression de l'utilisateur ${email}`, data: result };
            }
            return { success: false, message: `L'utilisateur n'est pas dans la DB ${email}` };
        } catch (error) {
            return { success: false, error: `Erreur dans la suppression de l utilisateur: ${error}` };
        }
    }

    // Récupération de la liste des utilisateurs
    async getAllUsers(): Promise<MongoResponse> {
        try {
            if (!this.db) await this.connect();
            const collection = this.getDb().collection('users');
            const users = await collection.find({}).toArray();
            return { success: true, data: users };
        } catch {
            return { success: false };
        }
    }

    // Ouverture de la connexion
    async connect() {
        try {
            this.client = await clientPromise;
            this.db = this.client.db('newProject');
            console.log('Connexion MongoDB réussie');
            return true;
        } catch {
            console.log('FALSE CONNECT');
            return false;
        }
    }

    // Fermeture des connexions
    async closeConnection() {
        try {
            if (this.client) {
                await this.client.close();
                console.log('Connexion MongoDB fermé');
            }
        } catch (error) {
            console.error('Error closeConnection ==>', error);
        }
    }
}

// Instance pour réutilisation
export const mongoUtils = new MongoUtils();

// Fonctions rapides
export const createUser = (userData: Omit<User, '_id'>) => mongoUtils.createUser(userData);
export const deleteUser = (email: string) => mongoUtils.deleteUser(email);
export const getAllUsers = () => mongoUtils.getAllUsers();

import { ObjectId, MongoClient, Db } from 'mongodb';
import { clientPromise2 } from './mongodb';

export class MongoUtils2 {
    private client: MongoClient | null = null;
    private db: Db | null = null;

    private getDb(): Db {
        if (!this.db) {
            throw new Error('DB non initialisée. Appelez connect() avant.');
        }
        return this.db;
    }
    async obtainData() {
        try {
            if (!this.db) {
                console.log("MongoDB n'est pas connecté");
                await this.connectDB2();
            }
            const collection = this.getDb().collection('sales');
            const resultat = await collection.find({}).limit(8).toArray();
            return resultat;
        } catch (error) {
            return 'Error ObtainData';
        }
    }

    async connectDB2() {
        try {
            console.log('START DB 2');
            this.client = await clientPromise2;
            this.db = this.client.db('sample_supplies');
            console.log('Connexion MongoDB réussie 02');
            return true;
        } catch {
            console.log('FALSE CONNECT');
            return false;
        }
    }
    async closeConnection2() {
        try {
            if (this.client) {
                await this.client.close();
                console.log('Connexion MongoDB 2 fermé');
            }
        } catch (error) {
            console.error('Error closeConnection 2 ==>', error);
        }
    }
}

export const mongoUtils = new MongoUtils2();

export const obtainData = () => mongoUtils.obtainData();

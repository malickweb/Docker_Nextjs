import { MongoClient } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default class MongoDB {
    client: Promise<MongoClient>;
    db: string;
    collection: string;

    constructor() {
        console.log('Class MongoDB');
        this.client = clientPromise;
        this.db = 'newProject';
        this.collection = 'users';
    }
}

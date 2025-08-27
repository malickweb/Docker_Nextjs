import { MongoClient } from 'mongodb';
// docker compose exec mongodb mongosh -u root -p example --authenticationDatabase admin;
const uri = 'mongodb://root:example@mongodb:27017/';

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = global._mongoClientPromise!;

export default clientPromise;

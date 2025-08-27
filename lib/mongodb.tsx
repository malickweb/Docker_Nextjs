import { MongoClient } from 'mongodb';
// docker compose exec mongodb mongosh -u root -p example --authenticationDatabase admin;
const uri = 'mongodb://root:example@mongodb:27017/';

let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise!;

export default clientPromise;

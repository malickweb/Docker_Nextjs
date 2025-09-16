import { MongoClient } from 'mongodb';

// docker compose exec mongodb mongosh -u root -p example --authenticationDatabase admin;
const uri = 'mongodb://root:example@mongodb:27017/';
const uri2 = `mongodb+srv://${process.env['NEXT_PUBLIC_MONGODB_USER']}:${process.env['NEXT_PUBLIC_MONGODB_PASSWORD']}@cluster0.o6wjfri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log('MONGO CLIENT', uri2);
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
    var _mongoClientPromise2: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

if (!global._mongoClientPromise2) {
    const client2 = new MongoClient(uri2);
    global._mongoClientPromise2 = client2.connect();
}

const clientPromise: Promise<MongoClient> = global._mongoClientPromise!;
const clientPromise2: Promise<MongoClient> = global._mongoClientPromise2!;

export { clientPromise, clientPromise2 };

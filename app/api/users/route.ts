import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
    try {
        const client = await clientPromise;
        console.log('Connexion MongoDB réussie');
        const db = client.db('newProject');
        const users = await db.collection('users').find({}).toArray();
        return NextResponse.json({
            success: true,
            data: users,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la récupération des utilisateurs',
            },
            { status: 500 }
        );
    }
}

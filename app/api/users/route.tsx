import { NextResponse } from 'next/server';
import { clientPromise } from '../../../lib/mongodb';

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
    } catch {
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors de la récupération des utilisateurs',
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // console.log('REQUEST', request);
        const body = await request.json();
        // Affichage dans la console côté serveur
        console.log('Données reçues:', body);

        const client = await clientPromise;
        console.log('Connexion MongoDB réussie');
        const db = client.db('newProject');

        // On insère l'utilisateur dans la collection "users"
        const existingUser = await db.collection('users').findOne({ email: body.email });
        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: "L'utilisateur existe déjà",
                },
                { status: 400 }
            );
        } else {
            const result = await db.collection('users').insertOne(body);

            if (result.acknowledged) {
                // On log aussi le résultat de l'insertion
                return NextResponse.json({
                    success: true,
                    message: 'Utilisateur ajouté avec succès',
                    insertedId: result.insertedId,
                });
            } else {
                console.error("L'utilisateur n'a pas pu être ajouté");
                return NextResponse.json(
                    {
                        success: false,
                        error: "L'utilisateur n'a pas pu être ajouté",
                    },
                    { status: 500 }
                );
            }
        }
    } catch {
        // Affichage détaillé de l'erreur dans la console
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur lors du POST',
            },
            { status: 500 }
        );
    }
}

// Méthode: POST
// url: /api/auth/register
// Récupération de l'email et password pour la création du compte

import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '../../../../lib/mongoUtils';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ success: false, error: 'Email requis' }, { status: 400 });
        }

        const result = await createUser(body);
        return NextResponse.json({
            result,
        });
    } catch {
        return NextResponse.json({
            success: false,
        });
    }
}

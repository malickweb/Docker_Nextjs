// Méthode: GET
// url: /api/auth/token
// Récupération du token dans les headers et vérification de sa validité

import { NextRequest, NextResponse } from 'next/server';
import { decodedToken } from '../../../../lib/tokenUtils';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader?.startsWith('Bearer ')) return NextResponse.json({ success: false, error: 'Pas de token' }, { status: 400 });

        const token = authHeader.substring(7);
        const valableToken = decodedToken(token);

        return NextResponse.json({
            success: valableToken,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
        });
    }
}

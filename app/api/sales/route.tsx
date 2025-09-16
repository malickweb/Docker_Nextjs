import { NextRequest, NextResponse } from 'next/server';
import { obtainData } from './../../../lib/mongoUtils2';

export async function POST(request: NextRequest) {
    try {
        const data = await obtainData();
        return NextResponse.json({
            data: data,
        });
    } catch {
        return NextResponse.json({
            success: false,
        });
    }
}

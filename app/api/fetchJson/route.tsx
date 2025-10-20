import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: NextRequest) {
    try {
        const urlParams = new URLSearchParams(request.nextUrl.search);
        const paramUrl = urlParams.get('url');
        const paramjsonFile = urlParams.get('jsonFile');
        if (paramjsonFile) {
            const pathFile = path.join(process.cwd(), `json/${paramUrl}.json`);
            const fileContents = await fs.readFile(pathFile, 'utf-8');
            const data = JSON.parse(fileContents);
            console.log('data[`${paramUrl}`]', data[`${paramUrl}`]);
            return NextResponse.json({
                success: true,
                response: data[`${paramUrl}`],
            });
        }
        return NextResponse.json({
            success: false,
        });
    } catch (error) {
        console.log('error', error);
    }
}

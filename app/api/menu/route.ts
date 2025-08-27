import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
    try {
        const pathFile = path.join(process.cwd(), 'app/api/menu/menu.json');
        const fileContents = await fs.readFile(pathFile, 'utf-8');
        console.log('menuData', fileContents);
        const data = JSON.parse(fileContents);
        console.log('data', data);
        return NextResponse.json({
            success: true,
            data: data.menu,
        });
        // return JSON.stringify(menuData);
    } catch (error) {
        console.log('error', error);
    }
}

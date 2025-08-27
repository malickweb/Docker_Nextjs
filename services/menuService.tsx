'use server';

import path from 'path';
import { promises as fs } from 'fs';

export async function getMenu() {
    const pathFile = path.join(process.cwd(), 'app/api/menu/menu.json');
    const fileContents = await fs.readFile(pathFile, 'utf-8');
    const data = JSON.parse(fileContents);
    return data.menu;
}

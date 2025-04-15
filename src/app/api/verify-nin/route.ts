import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { nin } = await request.json();

        // Read the users database
        const dbPath = path.join(process.cwd(), 'src', 'data', 'users.json');
        const dbContent = fs.readFileSync(dbPath, 'utf-8');
        const { users } = JSON.parse(dbContent);

        // Find user with matching NIN
        const user = users.find((u: any) => u.nin === nin);

        if (user) {
            return NextResponse.json({
                success: true,
                user: {
                    ...user,
                    bvn: user.bvn // We'll keep the BVN for verification
                }
            });
        }

        return NextResponse.json({
            success: false,
            message: 'NIN not found'
        }, { status: 404 });

    } catch (error) {
        console.error('Error verifying NIN:', error);
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
} 
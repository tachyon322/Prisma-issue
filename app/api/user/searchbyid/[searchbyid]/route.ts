import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(req: NextRequest, { params }: { params: { searchbyid: string } }) {
    const userID = params.searchbyid; // Здесь мы получаем новый параметр

    if (!userID) {
        console.log(userID);
        return NextResponse.json({ message: 'ID не указан' }, { status: 400 });
    }

    try {
        const user = await db.user.findUnique({ where: { id: userID } });
        if (!user) {
            return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

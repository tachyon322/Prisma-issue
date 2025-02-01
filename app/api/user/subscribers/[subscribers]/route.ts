import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(req: NextRequest, { params }: { params: { subscribers: string } }) {
    const userID = params.subscribers;

    if (!userID) {
        return NextResponse.json({ message: 'ID не указан' }, { status: 400 });
    }

    try {
        const subscriptions = await db.subscription.findMany({
            where: { subscribedToId: userID },
            include: { subscriber: true }, // Включаем информации о подписчике
        });

        if (subscriptions.length === 0) {
            return NextResponse.json({ message: 'Подписчиков не найдено' }, { status: 404 });
        }

        const subscribers = subscriptions.map(sub => sub.subscriber); // Получаем массив подписчиков

        return NextResponse.json(subscribers);
    } catch (error) {
        console.error("Ошибка при получении подписчиков:", error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

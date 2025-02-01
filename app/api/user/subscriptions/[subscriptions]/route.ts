import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET(req: NextRequest, { params }: { params: { subscriptions: string } }) {
    const userID = params.subscriptions;

    if (!userID) {
        return NextResponse.json({ message: 'ID не указан' }, { status: 400 });
    }

    try {
        const subscriptions = await db.subscription.findMany({
            where: { subscriberId: userID },
            include: { subscribedTo: true }, // Пользователи на которых подписан userID
        });

        if (subscriptions.length === 0) {
            return NextResponse.json({ message: 'Не найдено подписок' }, { status: 404 });
        }

        const subscribedUsers = subscriptions.map(sub => sub.subscribedTo); // Получаем массив пользователей, на которых подписан

        return NextResponse.json(subscribedUsers);
    } catch (error) {
        console.error("Ошибка при получении подписок:", error);
        return NextResponse.json({ message: 'Внутренняя ошибка сервера' }, { status: 500 });
    }
}

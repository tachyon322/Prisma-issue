"use client";

import React, { useEffect, useState } from 'react';
import { getUserById } from '@/data/user';

export default function NonAuthUser({ userID }: { userID: string }) {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getUserById(userID).then((user) => {
            setUserProfile(user);
            setLoading(false);
        });
    }, [userID]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <p>Пользователь не авторизован</p>
            <p>ID: {userID}</p>
            <p>Имя: {userProfile?.name ?? "Не найдено"}</p>
        </div>
    );
}
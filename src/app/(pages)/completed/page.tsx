import React from 'react';

import { fetchCompletedData } from '@/lib/FetchAnime';

import AnimeCompleted from '@/hooks/pages/completed/AnimeCompleted';

import AnimeCompletedSkeleton from '@/hooks/pages/completed/AnimeCompletedSkeleton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Anime Completed | Riznime',
    description: 'Jelajahi koleksi lengkap anime completed di Riznime. Temukan berbagai judul anime yang sudah selesai tayang dengan kualitas terbaik dan subtitle Indonesia.',
}

export default async function Ongoing() {
    try {
        const animeData = await fetchCompletedData();
        return <AnimeCompleted animeData={animeData} />;
    } catch (error) {
        console.error('Error fetching ongoing data:', error);
        return (
            <AnimeCompletedSkeleton />
        );
    }
}

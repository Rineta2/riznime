import React from 'react';

import { fetchMangaRecentData } from '@/lib/FetchManga';

import RecentMangaLayout from '@/hooks/pages/manga/recent/RecentMangaLayout';

import RecentMangaSkelaton from '@/hooks/pages/manga/recent/RecentMangaSkelaton';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Manga Terbaru | Riznime',
    description: 'Manga Terbaru',
}

export default async function Recent() {
    try {
        const page = 1;
        const mangaData = await fetchMangaRecentData(page);
        return <RecentMangaLayout mangaData={mangaData} />;
    } catch (error) {
        console.error('Error fetching manga data:', error);
        return (
            <RecentMangaSkelaton />
        );
    }
}

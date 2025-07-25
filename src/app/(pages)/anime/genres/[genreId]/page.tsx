import React from 'react'

import DetailsGenres from "@/hooks/pages/anime/genres/DetailsGenres"

import { Metadata, ResolvingMetadata } from "next"

import { fetchAnimeGenresId } from "@/lib/FetchAnime"

type Props = {
    params: Promise<{ genreId: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface Genre {
    title: string;
    genreId: string;
    href: string;
    otakudesuUrl: string;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Disable static generation
export const generateStaticParams = async () => {
    return [];
};

async function getAnimeData(genreId: string, page: number = 1) {
    try {
        const response = await fetchAnimeGenresId(genreId, page);
        return response;
    } catch (error) {
        console.error("Error fetching episode data:", error);
        return null;
    }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page as string) : 1;

    // fetch data
    const animeData = await getAnimeData(genreId, page);
    const animeList = animeData?.data?.animeList;

    if (!animeList || animeList.length === 0) {
        return {
            title: "Genre Not Found",
            description: "The requested genre could not be found.",
        };
    }

    // Get the first anime's genre title for metadata
    const genreTitle = animeList[0].genreList.find((genre: Genre) => genre.genreId === genreId)?.title || genreId;

    // optionally access and extend parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${genreTitle} | Riznime`,
        description: `Watch ${genreTitle} anime online. Browse our collection of ${genreTitle} anime series and movies.`,
        openGraph: {
            title: `${genreTitle} | Riznime`,
            description: `Watch ${genreTitle} anime online. Browse our collection of ${genreTitle} anime series and movies.`,
            images: [...previousImages],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${genreTitle} Anime | Riznime`,
            description: `Watch ${genreTitle} anime online. Browse our collection of ${genreTitle} anime series and movies.`,
        },
    };
}

export default async function GenrePage({ params, searchParams }: Props) {
    const { genreId } = await params;
    const resolvedSearchParams = await searchParams;
    return <DetailsGenres genreId={genreId} searchParams={resolvedSearchParams} />;
} 
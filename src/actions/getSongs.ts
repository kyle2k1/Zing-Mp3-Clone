'use server';
import { Slug } from '@/constants/music';
import apiClient, { transformSongItem, handleApiError, type ApiSongItem } from '@/libs/apiClient';
import { Song } from '@/types/types';

/** Lesson learn
 - Without 'use server'
 1. Server component calls: work (already on server).
 2. Client component calls: fail (can't access server-only env vars)
 
 - With 'use server':
 1. Server component calls: work (Server Actions can be called from server components)
 2. Client component calls: work (Server Actions run on the server)
 */
const SONGS_LIMIT = 25;

export async function getSongsByType(type: string, limit?: number): Promise<Song[] | null> {
  try {
    const response = await apiClient.get<{ data: ApiSongItem[] }>(`/music/${type}`, {
      params: {
        _limit: limit || SONGS_LIMIT,
        _page: Math.round(Math.random() * 10)
      }
    });

    if (!response.data?.data || response.data.data.length === 0) {
      return null;
    }

    return response.data.data.map((item) => transformSongItem(item));
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

export async function getSongsByWordSearch(query: string): Promise<Song[] | null> {
  try {
    const response = await apiClient.get<{ data: ApiSongItem[] }>('/search', {
      params: {
        query,
        _limit: 10
      }
    });

    if (!response.data?.data || response.data.data.length === 0) {
      return null;
    }

    // Search results use a different singer parsing (split by comma/ft/x)
    const parseSearchSingers = (value: string) => {
      return value.split(/,|ft.| x /).map((name: string) => name.trim());
    };

    return response.data.data.map((item) => transformSongItem(item, parseSearchSingers));
  } catch (error) {
    handleApiError(error);
    return null;
  }
}

const INFINITE_SCROLL_LIMIT = 10;

export async function getInfiniteSongs({
  pageParam = 1,
  slug
}: {
  slug: Slug;
  pageParam: number;
}): Promise<Song[] | undefined> {
  try {
    const response = await apiClient.get<{ data: ApiSongItem[] }>(`/music${slug}`, {
      params: {
        _limit: INFINITE_SCROLL_LIMIT,
        _page: pageParam
      }
    });

    if (!response.data?.data || response.data.data.length === 0) {
      return undefined;
    }

    return response.data.data.map((item) => transformSongItem(item));
  } catch (error) {
    handleApiError(error);
    return undefined;
  }
}

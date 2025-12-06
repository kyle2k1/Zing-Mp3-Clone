import axios, { AxiosInstance, AxiosError } from 'axios';

import getArrSinger from '@/helpers/getArrSinger';
import { Song } from '@/types/types';
import { api,envClient } from './env';

const baseApi = api.url || envClient.api.url
/**
 * Centralized API client with base configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: baseApi,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Format favorites count to readable string (e.g., 1000 -> "1K", 1000000 -> "1M")
 */
export function formatFavorites(favorite: number): number | string {
  if (favorite < 999) {
    return favorite;
  }
  if (favorite < 1000000) {
    return `${Math.floor(favorite / 1000)}K`;
  }
  return `${Math.floor(favorite / 1000000)}M`;
}

/**
 * Raw API response item structure
 * Note: Properties use snake_case to match the external API response format
 */
export interface ApiSongItem {
  name_singer: string;
  name_music: string;
  category: string;
  src_music: string;
  image_music: string;
  time_format: string;
  link_mv: string;
  favorite: number;
}

/**
 * Transform a single API song item to Song type
 * @param item - Raw API response item
 * @param parseSingers - Optional function to parse singers string (default: getArrSinger)
 */
export function transformSongItem(
  item: ApiSongItem,
  parseSingers?: (value: string) => string[]
): Song {
  const parseFn = parseSingers || getArrSinger;

  return {
    singers: parseFn(item.name_singer),
    songName: item.name_music,
    category: item.category,
    src: item.src_music,
    image: item.image_music,
    duration: item.time_format,
    link: item.link_mv,
    favorites: formatFavorites(item.favorite)
  };
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message || axiosError.message || 'An error occurred';
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unknown error occurred';
}

export default apiClient;

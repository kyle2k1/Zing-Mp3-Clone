import apiClient, { transformSongItem, handleApiError, type ApiSongItem } from '@/libs/apiClient';
import { Song } from '@/types/types';

const SINGER_LIMIT = 5;

export async function getSinger(name: string): Promise<Song[]> {
  try {
    const response = await apiClient.get<{ data: ApiSongItem[]; message?: string }>(
      '/music/get-singer-name',
      {
        params: {
          _limit: SINGER_LIMIT,
          _singer: name
        }
      }
    );

    // Check for error message in response
    if (typeof response.data?.message === 'string') {
      throw new Error(response.data.message);
    }

    if (!response.data?.data || !Array.isArray(response.data.data)) {
      return [];
    }

    // For singer results, each item has a single singer name (not comma-separated)
    const parseSingerName = (value: string) => [value.trim()];
    return response.data.data.map((item) => transformSongItem(item, parseSingerName));
  } catch (error) {
    handleApiError(error);
    return [];
  }
}

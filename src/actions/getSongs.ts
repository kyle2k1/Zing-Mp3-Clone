import axios from 'axios';

import getArrSinger from '@/helpers/getArrSinger';
import { api } from '@/libs/env';
import { Song } from '@/types/types';

const url = api.url;
const songsLimit = 25;

/* export const params = {
   trending: 'trending',
   favorite: 'favorite',
   newMusic: 'new-music',
   topViews: 'top-views',
}; */
export const typeMusic = ['trending', 'favorite', 'new-music', 'top-views'];

export async function getSongsByType(type: string, limit?: number) {
  const baseURL = `${url}/music/${type}`;

  const response = await axios
    .get(baseURL, {
      params: {
        _limit: limit || songsLimit,
        _page: Math.round(Math.random() * 10)
      }
    })
    .then((res) => {
      if (res.data.data.length === 0) {
        return;
      }
      const data: Song = res.data.data.map((item: any) => {
        return {
          singers: getArrSinger(item.name_singer),
          songName: item.name_music,
          category: item.category,
          src: item.src_music,
          image: item.image_music,
          duration: item.time_format,
          link: item.link_mv,
          favorites:
            item.favorite < 999
              ? item.favorite
              : item.favorite < 1000000
                ? `${Math.floor(item.favorite / 1000)}K`
                : `${Math.floor(item.favorite / 1000000)}M`
        };
      });
      return data;
    })
    .catch((_err) => {
      ('Something went wrong');
    });
  return response;
}

export async function getSongsByWordSearch(query: string) {
  const baseURL = `${url}/search`;
  const response = await axios
    .get(baseURL, {
      params: {
        query,
        _limit: 10
      }
    })
    .then((res) => {
      const data: Song = res.data.data.map((item: any) => {
        return {
          singers: item.name_singer.split(/,|ft.| x /).map((name: string) => name.trim()),
          songName: item.name_music,
          category: item.category,
          src: item.src_music,
          image: item.image_music,
          duration: item.time_format,
          link: item.link_mv,
          favorites:
            item.favorite < 999
              ? item.favorite
              : item.favorite < 1000000
                ? `${Math.floor(item.favorite / 1000)}K`
                : `${Math.floor(item.favorite / 1000000)}M`
        };
      });
      return data;
    })
    .catch((_err) => 'Something went wrong');
  return response;
}

export type Slug = '/trending' | '/favorite' | '/new-music' | '/top-views';
interface GetSongsProps {
  slug: Slug;
  params?: {
    _limit?: number;
    _page?: number;
    _type?: 'million' | 'billion';
  };
  pageParam: number;
}

export const LIMIT = 10;

const getInfiniteSongs = async ({ pageParam = 1, slug }: GetSongsProps) => {
  const url = `${api.url}/music${slug}`;
  const response = await axios
    .get(url, {
      params: {
        _limit: LIMIT,
        _page: pageParam
      }
    })
    .then((res) => {
      if (res.data.data.length === 0) {
        return;
      }
      const data: Song[] = res.data.data.map((item: any) => {
        return {
          singers: getArrSinger(item.name_singer),
          songName: item.name_music,
          category: item.category,
          src: item.src_music,
          image: item.image_music,
          duration: item.time_format,
          link: item.link_mv,
          favorites:
            item.favorite < 999
              ? item.favorite
              : item.favorite < 1000000
                ? `${Math.floor(item.favorite / 1000)}K`
                : `${Math.floor(item.favorite / 1000000)}M`
        };
      });
      return data;
    })
    .catch((_err) => {
      ('Something went wrong');
    });
  return response;
};

export default getInfiniteSongs;

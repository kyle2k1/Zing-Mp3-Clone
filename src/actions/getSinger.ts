import axios from 'axios';

import { api } from '@/libs/env';

const url = api.url;
const singerLimit = 5;

export async function getSinger(name: string) {
  const baseURL = `${url}/music/get-singer-name`;
  const response = await axios
    .get(baseURL, {
      params: {
        _limit: singerLimit,
        _singer: name.trim()
      }
    })
    .then((res) => {
      if (typeof res.data?.message === 'string') throw new Error(res.data.message);
      const data = res.data.data.map((item: any) => {
        return {
          singers: [item.name_singer],
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
    .catch(() => {
      return 'Music not found';
    });
  return response;
}

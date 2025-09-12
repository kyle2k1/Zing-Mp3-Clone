/* eslint-disable indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-expressions */
import { create } from 'zustand';

import { Song } from '@/types/types';

enum TYPE {
  PREV = -1,
  NEXT = 1
}

interface PlayerProps {
  showPlayer: boolean;
  /* data */
  index: number;
  currentSong: Song | undefined;
  list: Song[];
  typeRepeat: number;
  /* song state */
  isPlaying: boolean;
  isLoad: boolean;
  isFirst: boolean;

  isRandom: boolean;
  isLoop: boolean;
  /* action */
  setShowPlayer: (value: boolean) => void;
  setPlaying: (song: Song | undefined, isPlaying?: boolean) => void;
  setPlaylist: (song: Song) => void;
  setPlayNext: (song: Song) => void;

  setClear: () => void;

  setPrev: () => void;
  setNext: () => void;
  setContinue: (value?: boolean) => void;
  setRandom: () => void;
  setRepeat: () => void;
  setLoad: (value: boolean) => void;
  setFirst: (value: boolean) => void;
}

type setProps = (
  partial:
    | PlayerProps
    | Partial<PlayerProps>
    | ((state: PlayerProps) => PlayerProps | Partial<PlayerProps>),
  replace?: boolean | undefined
) => void;
type getProps = () => PlayerProps;

function getIndexSong(currentSong: Song | undefined, list: Song[]) {
  return list.findIndex((prev) => prev.src === currentSong?.src);
}

function getSong(state: PlayerProps, type: number) {
  const { list, currentSong, isRandom, typeRepeat } = state;
  let song;
  let idx;
  /* Check repeat */
  if (typeRepeat !== 0) {
    if (typeRepeat === 1) return currentSong;
    if (typeRepeat === 2) {
      /* Check random */
      if (isRandom) {
        idx = Math.round(Math.random() * (list.length - 1));
        song = list[idx];
      } else {
        idx = getIndexSong(currentSong, list);
        if (idx === 0 && type === TYPE.PREV) song = list[list.length + type];
        else if (idx === list.length - 1 && type === TYPE.NEXT) {
          [song] = list;
        } else song = list[idx + type];
      }
      return song;
    }
  }
  if (isRandom) {
    idx = Math.round(Math.random() * (list.length - 1));
    song = list[idx];
    return song;
  }
  idx = getIndexSong(currentSong, list);
  if (idx === list.length - 1 && type === 1) {
    return currentSong;
  }
  if (idx === 0 && type === -1) {
    return currentSong;
  }
  song = list[idx + type];
  return song;
}

function update(list: Song[], src: string, updatedSong: Song) {
  let data = list.filter((song) => song.src !== src);
  data.length === list.length ? data.push(updatedSong) : (data = list);
  return data;
}

function playNext(list: Song[], currentSong: Song | undefined, updatedSong: Song) {
  const data = list.filter((song) => song.src !== updatedSong.src);

  const index = getIndexSong(currentSong, data) + 1;
  data.splice(index, 0, updatedSong);
  return data;
}

const initialState = {
  showPlayer: false,
  /* data */
  currentSong: undefined,
  index: -1,
  list: [],
  typeRepeat: 0,

  /* song state */
  isPlaying: false,
  isLoad: false,
  isFirst: false,

  isRandom: false,
  isLoop: false
};

const action = (set: setProps, get: getProps) => ({
  /* action */

  setShowPlayer: (value: boolean) => set({ showPlayer: value }),
  setPlaying: (song: Song | undefined, isPlaying?: boolean) =>
    set(() => ({
      currentSong: song,
      isPlaying: isPlaying !== undefined ? isPlaying : true,
      isLoad: true
    })),
  setPlayNext: (song: Song) => {
    set((state) => ({
      list: playNext(state.list, state.currentSong, song)
    }));
    if (get().isPlaying === false) {
      get().setPlaying(song, true);
    }
  },

  setPlaylist: (song: Song) =>
    set((state) => ({
      list: update(state.list, song.src, song)
    })),

  setPrev: () => {
    (set((state) => ({
      currentSong: getSong(state, TYPE.PREV)
    })),
      !get().isPlaying && get().setPlaying(get().currentSong, true));
  },
  setNext: () => {
    (set((state) => ({
      currentSong: getSong(state, TYPE.NEXT)
    })),
      !get().isPlaying && get().setPlaying(get().currentSong, true));
  },
  setClear: () =>
    set({
      list: [],
      isPlaying: false,
      currentSong: undefined,
      showPlayer: false
    }),

  /* state action */
  setContinue: (value?: boolean) =>
    set((state) => ({
      isPlaying: value !== undefined ? value : !state.isPlaying
    })),
  setRandom: () => set((state) => ({ isRandom: !state.isRandom })),
  setLoad: (value: boolean) => set({ isLoad: value }),
  setFirst: (value: boolean) => set({ isFirst: value }),
  setRepeat: () =>
    set((state) => ({
      typeRepeat: state.typeRepeat + 1 > 2 ? 0 : state.typeRepeat + 1
    }))
});

/* Main */
const usePlayer = create<PlayerProps>((set, get) => ({
  /* initial state */
  ...initialState,
  ...action(set, get)
}));

export default usePlayer;

/* Helper Function */

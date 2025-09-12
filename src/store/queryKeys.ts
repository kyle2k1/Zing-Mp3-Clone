const favorite = {
  all: ['favorites'] as const,
  favorites: () => [...favorite.all, 'favorite'] as const,
  favorite: (id: number) => [...favorite.favorites(), id]
};
const ranking = {
  all: ['rankings'] as const,
  rankings: () => [...ranking.all, 'ranking'] as const,
  ranking: (id: number) => [...ranking.rankings(), id]
};
const artist = {
  all: ['artists'] as const,
  artists: () => [...artist.all, 'artist'] as const,
  artist: (name: string | undefined) => (name ? [...artist.artists(), name] : [])
};
const billboard = {
  all: ['billboards'] as const,
  billboards: () => [...billboard.all, 'billboard'] as const
};
const radio = {
  all: ['radios'] as const,
  radios: () => [...radio.all, 'radio'] as const
};

export { favorite, ranking, artist, billboard, radio };

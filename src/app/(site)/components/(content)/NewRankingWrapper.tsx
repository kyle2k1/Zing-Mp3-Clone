import { getSongsByType } from '@/actions/getSongs';
import NewRanking from '@/app/(site)/components/(content)/NewRanking';
import { typeMusic } from '@/constants/music';

const NewRankingWrapper = async () => {
  const randomType = typeMusic[Math.round(Math.random() * 3)];
  const songs = await getSongsByType(randomType, 9);

  if (!songs || songs.length === 0) {
    return null;
  }

  return <NewRanking songs={songs} category={randomType} />;
};

export default NewRankingWrapper;

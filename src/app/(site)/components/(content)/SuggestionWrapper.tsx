import { getSongsByType } from '@/actions/getSongs';
import Suggestion from '@/app/(site)/components/(content)/Suggestion';
import { typeMusic } from '@/constants/music';

const SuggestionWrapper = async () => {
  const randomType = typeMusic[Math.round(Math.random() * 3)];
  const songs = await getSongsByType(randomType, 25);
  if (!songs || songs.length === 0) {
    return null;
  }
  console.log({ songs });

  return <Suggestion songs={songs} category={randomType} />;
};

export default SuggestionWrapper;

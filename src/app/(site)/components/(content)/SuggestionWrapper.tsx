import { getSongsByType, typeMusic } from '@/actions/getSongs';
import Suggestion from '@/app/(site)/components/(content)/Suggestion';

const SuggestionWrapper = async () => {
  const randomType = typeMusic[Math.round(Math.random() * 3)];
  const songs = await getSongsByType(randomType, 25);

  if (!songs || songs.length === 0) {
    return null;
  }

  return <Suggestion songs={songs} />;
};

export default SuggestionWrapper;

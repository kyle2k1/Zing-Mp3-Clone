import { getSongsByType, typeMusic } from '@/actions/getSongs';
import NewRelease from '@/app/(site)/components/(content)/NewRelease';

const NewReleaseWrapper = async () => {
  const randomType = typeMusic[Math.round(Math.random() * 3)];
  const songs = await getSongsByType(randomType, 36);

  if (!songs || songs.length === 0) {
    return null;
  }

  return <NewRelease songs={songs} />;
};

export default NewReleaseWrapper;

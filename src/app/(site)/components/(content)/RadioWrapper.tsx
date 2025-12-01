import { getSongsByType, typeMusic } from '@/actions/getSongs';
import Radio from '@/app/(site)/components/(content)/Radio';

const RadioWrapper = async () => {
  const randomType = typeMusic[Math.round(Math.random() * 3)];
  const songs = await getSongsByType(randomType, 9);

  if (!songs || songs.length === 0) {
    return null;
  }

  return <Radio songs={songs} />;
};

export default RadioWrapper;

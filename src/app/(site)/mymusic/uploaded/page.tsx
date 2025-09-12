import { User } from '@prisma/client';

import getCurrentUser from '@/actions/getCurrentUser';

import Uploaded from './Uploaded';

export const metadata = {
  title: 'Uploaded | Xem bài hát, album, MV đang hot nhất hiện tại'
};

const Home = async () => {
  const currentUser = (await getCurrentUser()) as User;

  return (
    <main className="h-screen flex-1 flex-col overflow-hidden">
      <Uploaded currentUser={currentUser} />
    </main>
  );
};

export default Home;

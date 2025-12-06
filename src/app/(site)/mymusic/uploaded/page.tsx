import { redirect } from 'next/navigation';

import getCurrentUser from '@/actions/getCurrentUser';

import Uploaded from './Uploaded';

export const metadata = {
  title: 'Uploaded | Xem bài hát, album, MV đang hot nhất hiện tại',
};

const Home = async () => {
  const currentUser = await getCurrentUser();

  // If user is not authenticated, redirect to home
  // This is a fallback in case middleware doesn't catch it
  if (!currentUser) {
    redirect('/');
  }

  return (
    <main className="h-screen flex-1 flex-col overflow-hidden">
      <Uploaded currentUser={currentUser} />
    </main>
  );
};

export default Home;

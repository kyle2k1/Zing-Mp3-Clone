import Album from './Album';

export const metadata = {
  title: 'Album | Xem bài hát, album, MV đang hot nhất hiện tại'
};

const Home = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <main className="h-screen flex-1 flex-col overflow-hidden">
      <Album params={id} />
    </main>
  );
};

export default Home;

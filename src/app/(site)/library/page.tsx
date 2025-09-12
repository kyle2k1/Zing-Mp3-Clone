import { cn } from '@/libs/utils';

import Library from './Library';
import LibraryCard from './LibraryCard';

export const metadata = {
  title: 'Thư Viện | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV',
  description:
    'Dịch vụ nhạc số với hàng triệu bài hát và MV có bản quyền chất lượng cao, giúp bạn nghe nhạc, tải nhạc, upload và đồng bộ kho nhạc của tôi trên nhiều thiết bị.'
};

const Home = async () => {
  return (
    <main className={cn('flex-1 flex-col overflow-hidden')}>
      <Library />
      <LibraryCard />
    </main>
  );
};

export default Home;

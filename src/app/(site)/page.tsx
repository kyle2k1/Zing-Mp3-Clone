import { cn } from '@/libs/utils';

import Content from './components/Content';

const Home = () => {
  return (
    <main className={cn('flex-1 flex-col overflow-hidden')}>
      <Content />
    </main>
  );
};

export default Home;

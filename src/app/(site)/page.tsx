import { Suspense } from 'react';

import { cn } from '@/libs/utils';

import Gallery from '@/app/(site)/components/(content)/Gallery';
import NewRankingLoading from '@/app/(site)/components/(content)/NewRankingLoading';
import NewRankingWrapper from '@/app/(site)/components/(content)/NewRankingWrapper';
import NewReleaseLoading from '@/app/(site)/components/(content)/NewReleaseLoading';
import NewReleaseWrapper from '@/app/(site)/components/(content)/NewReleaseWrapper';
import Partner from '@/app/(site)/components/(content)/Partner';
import RadioLoading from '@/app/(site)/components/(content)/RadioLoading';
import RadioWrapper from '@/app/(site)/components/(content)/RadioWrapper';
import SuggestionLoading from '@/app/(site)/components/(content)/SuggestionLoading';
import SuggestionWrapper from '@/app/(site)/components/(content)/SuggestionWrapper';
import Content from './components/Content';

const Home = () => {
  return (
    <main className={cn('flex-1 flex-col overflow-hidden')}>
      <Content>
        <Gallery />
        <Suspense fallback={<SuggestionLoading />}>
          <SuggestionWrapper />
        </Suspense>
        <Suspense fallback={<NewReleaseLoading />}>
          <NewReleaseWrapper />
        </Suspense>
        <Suspense fallback={<NewRankingLoading />}>
          <NewRankingWrapper />
        </Suspense>
        <Suspense fallback={<RadioLoading />}>
          <RadioWrapper />
        </Suspense>
        <Partner />
      </Content>
    </main>
  );
};

export default Home;

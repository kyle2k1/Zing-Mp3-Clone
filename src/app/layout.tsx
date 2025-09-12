import { User } from '@prisma/client';
import { Inter } from 'next/font/google';

import getCurrentUser from '@/actions/getCurrentUser';
import Sidebar from '@/app/(site)/components/Sidebar';
import siteMetadata from '@/libs/siteMetaData';
import LoginModal from '@/models/(header)/LoginModal';
import UploadModal from '@/models/(header)/UploadModal';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import ToastifyProvider from '@/providers/ToastifyProvider';

import Header from './(site)/components/Header';
import Player from './(site)/components/Player';

import '@/app/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const font = Inter({ subsets: ['latin'] });
const title = 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV';
const description =
  'Dịch vụ nhạc số với hàng triệu bài hát và MV có bản quyền chất lượng cao, giúp bạn nghe nhạc, tải nhạc, upload và đồng bộ kho nhạc của tôi trên nhiều thiết bị.';
const content = siteMetadata({ title, description });

export const metadata = {
  metadataBase: new URL(content.siteUrl),
  title: {
    template: `%s | ${content.title}`,
    default: content.title
  },
  description: content.description,
  openGraph: {
    title: content.title,
    description: content.description,
    url: content.siteUrl,
    siteName: content.title,
    images: [content.socialBanner],
    locale: content.locale,
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = (await getCurrentUser()) as User;
  return (
    <html lang="en">
      <body className={font.className}>
        <ReactQueryProvider>
          <ToastifyProvider />
          <LoginModal />
          <UploadModal />
          <Header currentUser={currentUser} />
          <Sidebar currentUser={currentUser}>{children}</Sidebar>
          <Player />
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;

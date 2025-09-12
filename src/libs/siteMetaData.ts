const siteMetadata = ({ title, description }: { title: string; description: string }) => {
  return {
    title,
    author: 'BMO',
    headerTitle: 'Zing Mp3 Clone',
    description,
    language: 'vi-ve',
    theme: 'system', // system, dark or light
    siteUrl: process.env.NEXTAUTH_URL, // your website URL
    siteLogo: '/logo.png',
    socialBanner: '/banner.png', // add social banner in the public folder
    email: 'haiminh612a@gmail.com',
    github: 'https://github.com/bmo4401',
    locale: 'vi-ve'
  };
};

export default siteMetadata;

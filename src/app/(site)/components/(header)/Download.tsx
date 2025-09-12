'use client';

import { VscDesktopDownload } from 'react-icons/vsc';

const Download = () => {
  return (
    <a
      href="https://github.com/zmp3-pc/zmp3-pc/releases/download/v1.1.3/Zing-MP3-Setup-1.1.3.exe"
      target="_blank"
      className="hidden h-9 w-[190px] cursor-pointer justify-items-center gap-1 rounded-full bg-search px-5 py-[10px] hover:opacity-90 lg:flex"
      rel="noreferrer"
    >
      <VscDesktopDownload size={20} className="text-textPrimary" title="Tải xuống" />
      <span className="text-xds font-semibold text-textPrimary">Tải bản Windows</span>
    </a>
  );
};

export default Download;

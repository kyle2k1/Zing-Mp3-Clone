import { useEffect } from 'react';

import usePlayer from '@/hooks/(player)/usePlayer';

const DEFAULT_TITLE = 'Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV';

/**
 * Hook to update document title based on currently playing song
 *
 * Note: `document` is a browser global object (DOM API) that's only available on the client side.
 * This hook is safe to use in client components ('use client').
 */
export default function useDocumentTitle() {
  const { currentSong, isPlaying } = usePlayer();

  useEffect(() => {
    // Safety check: ensure we're in the browser (client-side)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (currentSong && isPlaying) {
      const singers = currentSong.singers.join(', ');
      const title = `${currentSong.songName} - ${singers} | Zing MP3`;
      document.title = title;
    } else {
      document.title = DEFAULT_TITLE;
    }

    // Cleanup: restore default title when component unmounts
    return () => {
      if (typeof document !== 'undefined') {
        document.title = DEFAULT_TITLE;
      }
    };
  }, [currentSong, isPlaying]);
}

/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { AiOutlineRise } from 'react-icons/ai';
import { BiLoaderCircle } from 'react-icons/bi';
import { IoSearchOutline } from 'react-icons/io5';

import CardContent from '@/components/CardContent';
import useInput from '@/hooks/(data)/useInput';
import useSearch from '@/hooks/(header)/useSearch';
import usePlayer from '@/hooks/(player)/usePlayer';
import useDebounce from '@/hooks/(utils)/useDebounce';
import { cn } from '@/libs/utils';
import { artist } from '@/store/queryKeys';
import { Song } from '@/types/types';

type SearchProps = {};

function Suggestions() {
  const suggestions = [
    {
      icon: AiOutlineRise,
      label: 'có ai hẹn hò cùng em chưa'
    },
    { icon: AiOutlineRise, label: 'mưa tháng sáu' },
    { icon: AiOutlineRise, label: 'cô ấy của anh ấy' },
    { icon: AiOutlineRise, label: 'ngày mai người ta lấy chồng' },
    { icon: AiOutlineRise, label: 'kẻ viết ngôn tình' },
    { icon: AiOutlineRise, label: 'hoa cỏ lau' }
  ];
  return suggestions.map((suggestion) => (
    <div
      key={suggestion.label}
      className="flex items-center gap-2 rounded-md px-[10px] py-[8px] hover:bg-[#493961]"
    >
      <div className="h-3 w-3">
        {' '}
        <suggestion.icon size={16} />
      </div>
      <span className="line-clamp-1 text-xds">{suggestion.label}</span>
    </div>
  ));
}

function Songs({
  songs,
  setShowSearch
}: { songs: Song[]; setShowSearch: (value: boolean) => void }) {
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist, currentSong, setContinue } =
    usePlayer();
  return songs.map((song) => (
    <div
      key={song.src}
      onClick={(e) => {
        e.stopPropagation();
        if (!showPlayer) {
          setShowPlayer(true);
        }
        if (song?.src === currentSong?.src) {
          setContinue();
        } else {
          setPlaying(song, true);
          if (song) {
            setPlaylist(song);
          }
        }
        setShowSearch(false);
      }}
      className="w- flex cursor-pointer items-center gap-2 rounded-md px-[10px] py-[8px] hover:bg-[#493961]"
    >
      <CardContent play data={song} width="w-12" height="h-12" disabled nowrap />
    </div>
  ));
}
const Result = ({
  songs,
  showSearch,
  setShowSearch
}: {
  songs: Song[] | undefined;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}) => {
  return (
    <div
      className={cn('w-full overflow-hidden px-[13px] py-[10px] transition delay-150 duration-150')}
    >
      <div className={cn('flex flex-col overflow-hidden text-sm', showSearch ? '' : 'h-0 w-0')}>
        <label htmlFor="search-input" className="pb-2 text-xds font-bold text-white">
          Đề xuất cho bạn
        </label>
        <div className="g-3 flex max-h-96 flex-col overflow-hidden overflow-y-auto text-white">
          {typeof songs === 'string' || songs?.length === 0 ? (
            <h2 className="pb-2 text-xds text-[#dadada]">
              Please try a different search keyword...
            </h2>
          ) : songs ? (
            <Songs songs={songs} setShowSearch={setShowSearch} />
          ) : (
            <Suggestions />
          )}
        </div>
      </div>
    </div>
  );
};

const Search: React.FC<SearchProps> = () => {
  const queryClient = useQueryClient();
  const [songs, setSongs] = useState<Song[] | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);
  const debounce = useDebounce(value, 500);
  const { isLoading, data } = useInput(artist.artist(debounce?.trim()));
  const { showSearch, setShowSearch } = useSearch();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    setSongs(queryClient.getQueryData(artist.artist(debounce)));
  }, [debounce, data, queryClient]);
  return (
    <div
      className={cn(
        'relative h-9 rounded-full bg-search sm:w-60 md:w-80 lg:w-90 xl:w-100',
        showSearch ? 'fixed top-[15px] w-72' : 'w-40'
      )}
    >
      <div
        className={cn(
          'absolute w-full',
          showSearch && 'bg-searchFocus',
          showSearch ? 'h-auto' : 'h-9',
          showSearch && 'rounded-2xl'
        )}
      >
        {/* /// Layout */}
        {showSearch && (
          <div
            onClick={() => setShowSearch(false)}
            className="fixed inset-0  bg-black  bg-opacity-25"
          />
        )}
        {/* /// Icon */}
        <div className={cn(showSearch ? 'relative z-10' : 'z-0')}>
          <div>
            <div
              className={cn(
                'text absolute left-2 top-0 flex h-9 w-9 items-center justify-center',
                isLoading && showSearch && 'animate-spin duration-150'
              )}
            >
              {isLoading && showSearch ? (
                <BiLoaderCircle size={25} />
              ) : (
                <IoSearchOutline size={25} />
              )}
            </div>
            <div className="h-9 w-full pl-10 pr-8">
              <form className="h-9' flex w-full items-center pl-2">
                <input
                  autoComplete="off"
                  id="search-input"
                  onFocus={(e) => {
                    e.stopPropagation();
                    setShowSearch(true);
                  }}
                  onChange={(e) => onChange(e)}
                  type="text"
                  placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                  className={cn(
                    's h-9 w-full text-xds placeholder:text-xds placeholder:text-contentDesc/25 focus:outline-none',
                    showSearch ? 'bg-[#27193B]' : 'bg-search'
                  )}
                  aria-labelledby="search-input-label"
                />
              </form>
            </div>
          </div>
          <Result songs={songs} showSearch={showSearch} setShowSearch={setShowSearch} />
        </div>
      </div>
    </div>
  );
};

export default Search;

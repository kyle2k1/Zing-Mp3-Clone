'use client';

import Image from 'next/image';

import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import { cn } from '@/libs/utils';

const partners = [
  '/partner/1.png',
  '/partner/2.png',
  '/partner/3.png',
  '/partner/4.png',
  '/partner/5.png',
  '/partner/6.png',
  '/partner/7.png',
  '/partner/8.png',
  '/partner/9.png',
  '/partner/10.png',
  '/partner/11.png',
  '/partner/12.png',
  '/partner/13.png',
  '/partner/14.png',
  '/partner/15.png',
  '/partner/16.png'
];

const breakpoints = getBreakpoint([4, 4, 4, 8, 8, 8]);

const Partner = () => {
  const className = getClassName(breakpoints);
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex w-full justify-center text-xs font-semibold uppercase tracking-wider text-contentDesc">
        đối tác âm nhạc
      </div>
      <div className="w-full">
        <div className={cn('gap-3 sm:h-1/7 lg:h-1/14', className)}>
          {partners.map((partnerImage, index) => (
            <div
              key={index + Math.random() * 10}
              className="flex h-full w-full items-center justify-center rounded-md bg-white p-2"
            >
              <Image
                width={0}
                height={0}
                alt="Partner"
                src={partnerImage || '/bmw.jpg'}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                className="aspect-video object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center text-center text-xs font-semibold uppercase tracking-wider text-contentDesc/50">
        <h2>This clone is for educational purpose only.</h2>
      </div>
    </div>
  );
};

export default Partner;

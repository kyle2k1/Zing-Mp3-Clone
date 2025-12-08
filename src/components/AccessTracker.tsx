'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { User } from '@prisma/client';

import logger from '@/libs/logger';

interface AccessTrackerProps {
  currentUser?: User | null;
}

const AccessTracker = ({ currentUser }: AccessTrackerProps) => {
  const pathname = usePathname();
  const hasLoggedRef = useRef<boolean>(false);

  useEffect(() => {
    // Only log once per page load to avoid duplicate logs
    if (hasLoggedRef.current) return;
    hasLoggedRef.current = true;

    // Get user agent and other browser info
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown';
    const screenWidth = typeof window !== 'undefined' ? window.screen.width : 0;
    const screenHeight = typeof window !== 'undefined' ? window.screen.height : 0;
    const referrer = typeof document !== 'undefined' ? document.referrer : '';

    // Log the access with user information if available
    logger.transferToStore({
      level: 'info',
      message: 'Website access',
      context: {
        pathname,
        userAgent,
        screenWidth,
        screenHeight,
        referrer,
        timestamp: new Date().toISOString(),
        user: currentUser
          ? {
              id: currentUser.id,
              email: currentUser.email,
              username: currentUser.username,
              name: currentUser.name,
            }
          : null,
      },
    });
  }, [pathname, currentUser]);

  return null;
};

export default AccessTracker;

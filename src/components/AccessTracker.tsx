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

    // Log the access via API route (server-side) with user information if available
    fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    }).catch((error) => {
      // Silently fail - don't break the app if logging fails
      logger.error(`Failed to log access: ${error}`);
    });
  }, [pathname, currentUser]);

  return null;
};

export default AccessTracker;

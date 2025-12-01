import { useCallback, useRef } from 'react';

/**
 * Custom hook to debounce a callback function
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns A debounced version of the callback
 * @example
 * const debouncedSearch = useDebouncedCallback((value: string) => {
 *   console.log(value);
 * }, 300);
 */
function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay?: number): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay ?? 500);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
}

export default useDebouncedCallback;

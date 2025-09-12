/* eslint-disable react-hooks/exhaustive-deps */

const useWindowSize = () => {
  const width = typeof window !== 'undefined' && window?.innerWidth;
  const height = typeof window !== 'undefined' && window?.innerHeight;
  return { width, height };
};

export default useWindowSize;

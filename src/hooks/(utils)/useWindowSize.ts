/* eslint-disable react-hooks/exhaustive-deps */

const useWindowSize = () => {
  const width = (typeof window !== 'undefined' && window?.innerWidth) || 0;
  const height = (typeof window !== 'undefined' && window?.innerHeight) || 0;
  return { width, height };
};

export default useWindowSize;

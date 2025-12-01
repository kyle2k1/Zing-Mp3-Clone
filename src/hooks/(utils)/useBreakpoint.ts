import { useEffect, useState } from 'react';

interface WindowSizeProps {
  width: number;
  height: number;
}

function CheckingBreakpoint(
  windowSize: { width: number; height: number },
  breakpoints: NonNullable<unknown>[]
) {
  const Breakpoints = [
    { xs: 500 },
    { sm: 640 },
    { md: 768 },
    { lg: 1024 },
    { xl: 1280 },
    { '2xl': 1536 }
  ];
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    // @ts-ignore

    const width = Breakpoints[i][Object.keys(breakpoints[i])[0]];
    if (windowSize.width > width) return Object.values(breakpoints[i])[0] as number;
  }
  return 1;
}

const useBreakpoint = (breakpoints: object[]) => {
  const [breakpoint, setBreakPoint] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: 0,
    height: 0
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    // @ts-ignore
    setBreakPoint(CheckingBreakpoint(windowSize, breakpoints));

    return () => window.removeEventListener('resize', handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.width]);
  return breakpoint;
};

export default useBreakpoint;

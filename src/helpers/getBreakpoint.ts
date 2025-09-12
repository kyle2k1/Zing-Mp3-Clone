const getBreakpoint = (breakpoints: Array<NonNullable<unknown>>) => {
  const type = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  return breakpoints.map((breakpoint, idx) => {
    return { [type[idx]]: breakpoint };
  });
};

export default getBreakpoint;

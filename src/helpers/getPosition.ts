const getPosition = ({ width, height }: { width: number; height: number }) => {
  let pos: string;
  if (width < 50) {
    if (height < 50) {
      pos = '-right-1 top-0 translate-x-full ';
    } else {
      pos = '-right-1 bottom-0 translate-x-full';
    }
  } else if (width < 66) {
    if (height < 50) {
      pos = '-right-1 top-0 translate-x-full ';
    } else {
      pos = '-left-1 bottom-0 -translate-x-full';
    }
  } else if (height < 50) {
    pos = '-left-1 top-0 -translate-x-full';
  } else {
    pos = '-left-1 -bottom-20 -translate-x-full';
  }
  return pos;
};

export default getPosition;

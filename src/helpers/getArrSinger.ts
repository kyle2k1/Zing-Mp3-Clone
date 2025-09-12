const getArrSinger = (value: string) => {
  return value.split(/,|ft.| x /).map((name: string) => name.trim());
};

export default getArrSinger;

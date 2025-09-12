function pad(number: number) {
  return `0${number}`.slice(-2);
}

function format(seconds: number) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}

const getDuration = (seconds: number) => {
  return format(seconds);
};

export default getDuration;

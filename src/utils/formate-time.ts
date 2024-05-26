export const formateTime = (timestampPerSec: number) => {
  const seconds = Math.trunc(timestampPerSec);
  const sss = Math.trunc((timestampPerSec - seconds) * 1000);
  const MM = Math.trunc(seconds / 60);
  const SS = seconds - MM * 60;

  return `${MM < 10 ? '0' + MM : MM}:${SS < 10 ? '0' + SS : SS}:${
    sss < 10 ? '00' + sss : sss < 100 ? '0' + sss : sss
  }`;
};

export type TZone = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type TTimestamp = {
  timestamp: number;
  duration: number;
  zone: TZone;
};

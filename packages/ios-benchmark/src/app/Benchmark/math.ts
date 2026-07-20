export const getStdDev = (values: number[]): number => {
    throw new Error("STUB");
};

export const getMean = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((a, b) => { throw new Error("STUB"); }, 0);
  return sum / values.length;
};

export const getMedian = (values: number[]): number => {
    throw new Error("STUB");
};

// Trimmed mean — drop `trim` proportion from each tail (e.g. 0.05 = 5% from
// each side). Robust to GC-pause spikes and other tail outliers without
// throwing away the central tendency information that median collapses.
export const getTrimmedMean = (sortedAsc: number[], trim = 0.05): number => {
    throw new Error("STUB");
};

// Inter-quartile range (Q3 - Q1). A robust spread metric.
export const getIQR = (sortedAsc: number[]): number => {
    throw new Error("STUB");
};

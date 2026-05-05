import type { BatchApple } from "../stores/useBatchStore";
import type { BlendProfile } from "./types";

const calculateWeightedAverage = (
  apples: BatchApple[],
  totalWeight: number,
  getValue: (apple: BatchApple) => number,
) =>
  totalWeight > 0
    ? apples.reduce((sum, apple) => sum + getValue(apple) * apple.weight, 0) /
      totalWeight
    : 0;

const calculateEstimatedPh = (apples: BatchApple[], totalWeight: number) =>
  totalWeight > 0
    ? -Math.log10(
        apples.reduce(
          (sum, apple) => sum + Math.pow(10, -apple.ph) * apple.weight,
          0,
        ) / totalWeight,
      )
    : 0;

const calculateDistribution = (
  apples: BatchApple[],
  totalWeight: number,
  getKey: (apple: BatchApple) => string,
) => {
  const weights = apples.reduce<Record<string, number>>((acc, apple) => {
    const key = getKey(apple);
    acc[key] = (acc[key] ?? 0) + apple.weight;
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(weights).map(([key, weight]) => [
      key,
      totalWeight > 0 ? (weight / totalWeight) * 100 : 0,
    ]),
  );
};

export const calculateBlendProfile = (apples: BatchApple[]): BlendProfile => {
  const totalWeight = apples.reduce((sum, apple) => sum + apple.weight, 0);
  const estimatedBrix = calculateWeightedAverage(
    apples,
    totalWeight,
    (apple) => apple.brix,
  );
  const estimatedTannin = calculateWeightedAverage(
    apples,
    totalWeight,
    (apple) => apple.tannin,
  );
  const estimatedPh = calculateEstimatedPh(apples, totalWeight);
  const estimatedAbv = estimatedBrix * 0.55;

  return {
    totalWeight,
    estimatedBrix,
    estimatedPh,
    estimatedTannin,
    estimatedAbv,
    flavorDistribution: calculateDistribution(
      apples,
      totalWeight,
      (apple) => apple.flavor,
    ),
    categoryDistribution: calculateDistribution(
      apples,
      totalWeight,
      (apple) => apple.category,
    ),
  };
};

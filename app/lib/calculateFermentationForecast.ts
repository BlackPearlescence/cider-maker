import type { FermentationPlan } from "./types";
import type {
  ImpactLevel,
  PreparedMustForecast,
} from "./calculatePreparationEffects";

export type FermentationPace = "slow" | "standard" | "fast" | "unpredictable";

export type FermentationForecast = {
  reliability: ImpactLevel;
  pace: FermentationPace;
  aromaPreservation: ImpactLevel;
  offFlavorRisk: ImpactLevel;
  drynessLikelihood: ImpactLevel;
  monitoringNeeds: ImpactLevel;
  notes: string[];
};

const createBaseForecast = (): FermentationForecast => ({
  reliability: "medium",
  pace: "standard",
  aromaPreservation: "medium",
  offFlavorRisk: "low",
  drynessLikelihood: "medium",
  monitoringNeeds: "medium",
  notes: [],
});

export const calculateFermentationForecast = (
  fermentationPlan: FermentationPlan,
  preparedMustForecast: PreparedMustForecast,
): FermentationForecast => {
  const forecast = createBaseForecast();

  if (preparedMustForecast.spoilageRisk === "medium") {
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "The prepared must has moderate spoilage risk, so clean handling and active fermentation monitoring matter.",
    );
  }

  if (preparedMustForecast.oxidationRisk === "medium") {
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "The must has some oxidation risk, so limit splashing after fermentation begins.",
    );
  }

  if (preparedMustForecast.clarity === "low") {
    forecast.notes.push(
      "A cloudier must may create more sediment during and after primary fermentation.",
    );
  }

  if (preparedMustForecast.sugarImpact === "increase") {
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "Higher sugar potential can make fermentation more demanding, so yeast health should be watched.",
    );
  }

  if (preparedMustForecast.acidityImpact === "increase") {
    forecast.notes.push(
      "A brighter must can ferment into a crisp cider, but sharpness may remain noticeable in the finish.",
    );
  }

  if (preparedMustForecast.tanninImpact === "increase") {
    forecast.notes.push(
      "A more tannic must can create structure, but it may need time after fermentation to soften.",
    );
  }

  if (fermentationPlan.fermentationStyle === "wild") {
    forecast.reliability = "medium";
    forecast.pace = "unpredictable";
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "Wild fermentation can produce more local character, but timing and flavor development are less predictable.",
    );

    if (preparedMustForecast.wildFermentationFit === "low") {
      forecast.reliability = "low";
      forecast.offFlavorRisk = "medium";
      forecast.notes.push(
        "The prepared must is not an ideal fit for wild fermentation, so pitched yeast may be safer.",
      );
    }

    if (preparedMustForecast.wildFermentationFit === "high") {
      forecast.reliability = "medium";
      forecast.notes.push(
        "The preparation choices leave wild fermentation as a reasonable option if the fruit is clean and well handled.",
      );
    }

    if (preparedMustForecast.spoilageRisk === "medium") {
      forecast.offFlavorRisk = "medium";
      forecast.notes.push(
        "Wild fermentation with moderate spoilage risk needs careful smelling, tasting, and observation.",
      );
    }
  }

  if (fermentationPlan.fermentationStyle === "pitched") {
    forecast.reliability = "high";
    forecast.notes.push(
      "Pitched yeast is usually more predictable for hobbyist cider batches.",
    );
  }

  if (
    fermentationPlan.fermentationStyle === "pitched" &&
    fermentationPlan.yeastCategory === "none"
  ) {
    forecast.reliability = "low";
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "Pitched fermentation needs an actual yeast choice. Select a cider, wine, champagne, or ale yeast.",
    );
  }

  if (fermentationPlan.yeastCategory === "cider") {
    forecast.reliability = "high";
    forecast.aromaPreservation = "high";
    forecast.notes.push(
      "Cider yeast is a good default for preserving apple character while keeping fermentation predictable.",
    );
  }

  if (fermentationPlan.yeastCategory === "wine") {
    forecast.reliability = "high";
    forecast.drynessLikelihood = "high";
    forecast.notes.push(
      "Wine yeast is usually reliable and can make a clean, dry, wine-like cider.",
    );
  }

  if (fermentationPlan.yeastCategory === "champagne") {
    forecast.reliability = "high";
    forecast.drynessLikelihood = "high";
    forecast.aromaPreservation = "medium";
    forecast.notes.push(
      "Champagne yeast is likely to ferment cleanly and dry, but may reduce some delicate apple character.",
    );
  }

  if (fermentationPlan.yeastCategory === "ale") {
    forecast.drynessLikelihood = "medium";
    forecast.aromaPreservation = "high";
    forecast.notes.push(
      "Ale yeast can preserve fruitiness and create a rounder fermentation profile.",
    );
  }

  if (fermentationPlan.fermentationTemperature === "cool") {
    forecast.pace = "slow";
    forecast.aromaPreservation = "high";
    forecast.notes.push(
      "Cool fermentation usually moves more slowly but can preserve fresh apple aroma.",
    );
  }

  if (fermentationPlan.fermentationTemperature === "room-temp") {
    forecast.pace = "fast";
    forecast.aromaPreservation = "medium";
    forecast.offFlavorRisk = "medium";
    forecast.notes.push(
      "Room-temperature fermentation is convenient and faster, but warmer conditions can increase rough or solvent-like flavors.",
    );
  }

  if (fermentationPlan.nutrientPlan === "none") {
    forecast.reliability = "medium";
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "Skipping nutrients can work, but cider must can be nutrient-poor and may ferment less reliably.",
    );

    if (preparedMustForecast.sugarImpact === "increase") {
      forecast.reliability = "low";
      forecast.offFlavorRisk = "medium";
      forecast.notes.push(
        "Higher sugar with no nutrient plan can raise the chance of a sluggish fermentation.",
      );
    }
  }

  if (fermentationPlan.nutrientPlan === "simple") {
    forecast.reliability = "high";
    forecast.notes.push(
      "A simple nutrient addition is a practical hobbyist default for supporting yeast health.",
    );
  }

  if (fermentationPlan.nutrientPlan === "staggered") {
    forecast.reliability = "high";
    forecast.offFlavorRisk = "low";
    forecast.monitoringNeeds = "medium";
    forecast.notes.push(
      "Staggered nutrients can support steadier fermentation, especially for demanding batches.",
    );
  }

  if (fermentationPlan.vessel === "bucket") {
    forecast.notes.push(
      "A bucket is convenient for active primary fermentation and easy cleanup, but it is better suited to short early fermentation than long aging.",
    );
  }

  if (fermentationPlan.vessel === "carboy") {
    forecast.notes.push(
      "A carboy helps reduce oxygen exposure once fermentation slows, making it a good default for hobbyist cider.",
    );
  }

  if (fermentationPlan.vessel === "demijohn") {
    forecast.notes.push(
      "A demijohn is useful for small experimental batches and makes it easier to compare blends.",
    );
  }

  if (fermentationPlan.targetFinish === "dry") {
    forecast.drynessLikelihood = "high";
    forecast.notes.push(
      "A dry target means most fermentable sugar should be allowed to ferment out.",
    );
  }

  if (fermentationPlan.targetFinish === "off-dry") {
    forecast.drynessLikelihood = "medium";
    forecast.monitoringNeeds = "medium";
    forecast.notes.push(
      "An off-dry target can balance acidity, but sweetness should be managed after fermentation unless you are deliberately arresting it.",
    );
  }

  if (fermentationPlan.targetFinish === "semi-sweet") {
    forecast.drynessLikelihood = "low";
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "A semi-sweet target usually needs stabilization, pasteurization, or careful backsweetening to avoid refermentation.",
    );
  }

  if (fermentationPlan.primaryDuration === "short") {
    forecast.pace = "fast";
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "A short primary timeline should be treated as active monitoring, not a guarantee that fermentation is finished.",
    );
  }

  if (fermentationPlan.primaryDuration === "standard") {
    forecast.notes.push(
      "A standard primary timeline is a sensible default for most hobbyist cider fermentations.",
    );
  }

  if (fermentationPlan.primaryDuration === "slow") {
    forecast.pace = "slow";
    forecast.aromaPreservation = "high";
    forecast.notes.push(
      "A slow primary fermentation can preserve aroma and allow a gentler cider profile, especially when paired with cooler temperatures.",
    );
  }

  if (
    fermentationPlan.fermentationTemperature === "cool" &&
    fermentationPlan.primaryDuration === "short"
  ) {
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "Cool fermentation and a short primary timeline are in tension; cool batches often need more patience.",
    );
  }

  if (
    fermentationPlan.fermentationTemperature === "room-temp" &&
    fermentationPlan.primaryDuration === "slow"
  ) {
    forecast.offFlavorRisk = "medium";
    forecast.notes.push(
      "Room-temperature fermentation with a long primary timeline should be watched for oxidation or stale flavors after activity slows.",
    );
  }

  if (
    fermentationPlan.fermentationStyle === "wild" &&
    fermentationPlan.nutrientPlan === "staggered"
  ) {
    forecast.notes.push(
      "Staggered nutrients can make a wild fermentation more active, but may reduce some of the slow rustic character people seek from wild cider.",
    );
  }

  if (
    fermentationPlan.yeastCategory === "champagne" &&
    fermentationPlan.targetFinish !== "dry"
  ) {
    forecast.monitoringNeeds = "high";
    forecast.notes.push(
      "Champagne yeast often ferments aggressively dry, so off-dry or semi-sweet goals usually require post-fermentation sweetness management.",
    );
  }

  if (
    preparedMustForecast.clarity === "low" &&
    fermentationPlan.vessel !== "bucket"
  ) {
    forecast.notes.push(
      "Cloudy must in a narrow-neck vessel may leave heavier sediment, so racking may be useful after primary fermentation.",
    );
  }

  return forecast;
};

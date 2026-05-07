import type { FruitMustPreparation } from "./types";

export type ImpactLevel = "none" | "low" | "medium" | "high";

export type DirectionalImpact =
  | "none"
  | "slight decrease"
  | "decrease"
  | "slight increase"
  | "increase";

export type PreparedMustForecast = {
  sugarImpact: DirectionalImpact;
  acidityImpact: DirectionalImpact;
  tanninImpact: DirectionalImpact;
  juiceYield: ImpactLevel;
  clarity: ImpactLevel;
  oxidationRisk: ImpactLevel;
  spoilageRisk: ImpactLevel;
  wildFermentationFit: ImpactLevel;
  notes: string[];
};

const createBaseForecast = (): PreparedMustForecast => ({
  sugarImpact: "none",
  acidityImpact: "none",
  tanninImpact: "none",
  juiceYield: "medium",
  clarity: "medium",
  oxidationRisk: "low",
  spoilageRisk: "low",
  wildFermentationFit: "medium",
  notes: [],
});

export const calculatePreparationEffects = (
  preparation: FruitMustPreparation,
): PreparedMustForecast => {
  const forecast = createBaseForecast();

  if (preparation.sortingWashing === "yes") {
    forecast.spoilageRisk = "low";
    forecast.notes.push(
      "Sorting and washing helps remove damaged fruit and surface debris before milling.",
    );
  }

  if (preparation.sortingWashing === "no") {
    forecast.spoilageRisk = "medium";
    forecast.wildFermentationFit = "high";
    forecast.notes.push(
      "Skipping washing may preserve more wild microbes, but damaged or dirty fruit can raise spoilage risk.",
    );
  }

  if (preparation.sweating === "short") {
    forecast.sugarImpact = "slight increase";
    forecast.notes.push(
      "Short sweating can help apples finish ripening and may slightly improve aroma.",
    );
  }

  if (preparation.sweating === "medium") {
    forecast.sugarImpact = "slight increase";
    forecast.acidityImpact = "slight decrease";
    forecast.notes.push(
      "Medium sweating may soften acidity and develop a riper apple character.",
    );
  }

  if (preparation.sweating === "long") {
    forecast.sugarImpact = "increase";
    forecast.acidityImpact = "slight decrease";
    forecast.spoilageRisk = "medium";
    forecast.notes.push(
      "Long sweating can develop aroma and sweetness, but fruit condition should be monitored carefully.",
    );
  }

  if (preparation.millingMethod === "coarse-grind") {
    forecast.juiceYield = "low";
    forecast.clarity = "high";
    forecast.oxidationRisk = "low";
    forecast.notes.push(
      "Coarse grinding may produce cleaner pulp with less oxidation, but juice extraction can be lower.",
    );
  }

  if (preparation.millingMethod === "fine-grind") {
    forecast.juiceYield = "high";
    forecast.clarity = "low";
    forecast.oxidationRisk = "medium";
    forecast.notes.push(
      "Fine grinding may improve extraction but can create more pulp, cloudier juice, and more oxidation exposure.",
    );
  }

  if (preparation.maceration === "short") {
    forecast.tanninImpact = "slight increase";
    forecast.juiceYield = "high";
    forecast.notes.push(
      "Short maceration may add a little more tannin and aroma while improving juice release.",
    );
  }

  if (preparation.maceration === "overnight") {
    forecast.tanninImpact = "increase";
    forecast.juiceYield = "high";
    forecast.oxidationRisk = "medium";
    forecast.spoilageRisk = "medium";
    forecast.notes.push(
      "Overnight maceration may extract more tannin and aroma, but it requires clean fruit and careful handling.",
    );
  }

  if (preparation.prePressSulfite === "none") {
    forecast.wildFermentationFit = "high";
    forecast.oxidationRisk = "medium";
    forecast.notes.push(
      "Avoiding sulfite keeps wild fermentation more viable, but oxidation and microbial control depend more on handling.",
    );
  }

  if (preparation.prePressSulfite === "low") {
    forecast.spoilageRisk = "low";
    forecast.notes.push(
      "A low sulfite addition can reduce microbial risk while preserving some fruit character.",
    );
  }

  if (preparation.prePressSulfite === "standard") {
    forecast.spoilageRisk = "low";
    forecast.oxidationRisk = "low";
    forecast.wildFermentationFit = "low";
    forecast.notes.push(
      "Standard sulfite use helps control microbes and oxidation, but makes wild fermentation less suitable.",
    );
  }

  if (preparation.pressingMethod === "basket-press") {
    forecast.notes.push(
      "Basket pressing is a practical small-batch method with moderate extraction and a hobbyist-friendly workflow.",
    );
  }

  if (preparation.pressingMethod === "rack-and-cloth") {
    forecast.juiceYield = "high";
    forecast.notes.push(
      "Rack-and-cloth pressing can improve extraction and is well-suited to layered pomace pressing.",
    );
  }

  if (preparation.pressingMethod === "bladder-press") {
    forecast.oxidationRisk = "low";
    forecast.notes.push(
      "Bladder pressing is relatively gentle and can reduce harsh extraction and oxidation exposure.",
    );
  }

  if (preparation.pressingMethod === "hydraulic-pack") {
    forecast.juiceYield = "high";
    forecast.clarity = "low";
    forecast.notes.push(
      "Hydraulic pack pressing can increase extraction, but the juice may carry more solids depending on milling and handling.",
    );
  }

  if (preparation.juiceSettling === "none") {
    forecast.clarity = "low";
    forecast.notes.push(
      "Skipping settling keeps more solids in the must, which can make fermentation more rustic and less clear.",
    );
  }

  if (preparation.juiceSettling === "cold-settle") {
    forecast.clarity = "high";
    forecast.notes.push(
      "Cold settling can improve clarity and reduce heavy solids before fermentation.",
    );
  }

  if (preparation.juiceSettling === "room-temp-settle") {
    forecast.clarity = "high";
    forecast.spoilageRisk = "medium";
    forecast.notes.push(
      "Room-temperature settling can clarify juice, but it should be managed carefully to avoid spoilage.",
    );
  }

  if (preparation.mustAdjustments.includes("Sugar")) {
    forecast.sugarImpact = "increase";
    forecast.notes.push(
      "Sugar adjustment can raise potential alcohol or support a stronger finished cider.",
    );
  }

  if (preparation.mustAdjustments.includes("Acid")) {
    forecast.acidityImpact = "increase";
    forecast.notes.push(
      "Acid adjustment can make a soft blend taste brighter and more defined.",
    );
  }

  if (preparation.mustAdjustments.includes("Tannin")) {
    forecast.tanninImpact = "increase";
    forecast.notes.push(
      "Tannin adjustment can add grip and structure to a soft or culinary-heavy blend.",
    );
  }

  if (preparation.mustAdjustments.includes("Nutrients")) {
    forecast.notes.push(
      "Nutrient addition can support a steadier fermentation, especially for stressed or higher-sugar musts.",
    );
  }

  return forecast;
};

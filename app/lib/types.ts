export type BlendProfile = {
  totalWeight: number;
  estimatedBrix: number;
  estimatedPh: number;
  estimatedTannin: number;
  estimatedAbv: number;
  flavorDistribution: Record<string, number>;
  categoryDistribution: Record<string, number>;
};

export type BlendInsight = {
  id: string;
  severity: "info" | "warning" | "risk";
  title: string;
  message: string;
  tags: string[];
};

export type BlendRule = {
  id: string;
  when: (profile: BlendProfile) => boolean;
  insight: BlendInsight;
};

export type FruitMustPreparation = {
  sortingWashing: "yes" | "no";
  sweating: "none" | "short" | "medium" | "long";
  millingMethod: "coarse-grind" | "standard-crush" | "fine-grind";
  maceration: "none" | "short" | "overnight";
  prePressSulfite: "none" | "low" | "standard";
  pressingMethod:
    | "basket-press"
    | "rack-and-cloth"
    | "bladder-press"
    | "hydraulic-pack";
  juiceSettling: "none" | "cold-settle" | "room-temp-settle";
  mustAdjustments: string[];
};

export type FermentationPlan = {
  fermentationStyle: "wild" | "pitched";
  yeastCategory: "none" | "cider" | "wine" | "champagne" | "ale";
  fermentationTemperature: "cool" | "room-temp";
  nutrientPlan: "none" | "simple" | "staggered";
  targetFinish: "dry" | "off-dry" | "semi-sweet";
  vessel: "bucket" | "carboy" | "demijohn";
  primaryDuration: "short" | "standard" | "slow";
};
export type AgingPlan = Record<string, never>;
export type FinishingPlan = Record<string, never>;
export type CarbonationPlan = Record<string, never>;

export type ProcessStore = {
  fruitMustPreparation: FruitMustPreparation;
  fermentationPlan: FermentationPlan;
  agingPlan: AgingPlan;
  finishingPlan: FinishingPlan;
  carbonationPlan: CarbonationPlan;
};

import type { BlendProfile, BlendRule } from "./types";

const flavorShare = (profile: BlendProfile, flavor: string) =>
  profile.flavorDistribution[flavor] ?? 0;

const categoryShare = (profile: BlendProfile, category: string) =>
  profile.categoryDistribution[category] ?? 0;

export const blendRules: BlendRule[] = [
  {
    id: "low-brix-light-cider",
    when: (profile) => profile.estimatedBrix > 0 && profile.estimatedBrix < 11,
    insight: {
      id: "low-brix-light-cider",
      severity: "info",
      title: "Light Alcohol Potential",
      message:
        "This blend is relatively low in sugar, so it is likely to produce a lighter cider with lower alcohol potential.",
      tags: ["brix", "abv", "body"],
    },
  },
  {
    id: "moderate-brix-standard-cider",
    when: (profile) =>
      profile.estimatedBrix >= 11 && profile.estimatedBrix < 14,
    insight: {
      id: "moderate-brix-standard-cider",
      severity: "info",
      title: "Standard Cider Strength",
      message:
        "This blend sits in a typical cider sugar range and should produce a moderate-strength cider if fermented dry.",
      tags: ["brix", "abv"],
    },
  },
  {
    id: "high-brix-strong-cider",
    when: (profile) =>
      profile.estimatedBrix >= 14 && profile.estimatedBrix < 17,
    insight: {
      id: "high-brix-strong-cider",
      severity: "info",
      title: "High Alcohol Potential",
      message:
        "This blend has elevated sugar and may produce a stronger cider with fuller body.",
      tags: ["brix", "abv", "body"],
    },
  },
  {
    id: "very-high-brix-yeast-stress",
    when: (profile) => profile.estimatedBrix >= 17,
    insight: {
      id: "very-high-brix-yeast-stress",
      severity: "warning",
      title: "Yeast Stress Risk",
      message:
        "Very high sugar can stress yeast and increase the risk of a sluggish or stuck fermentation. Consider yeast choice and nutrient planning.",
      tags: ["brix", "abv", "yeast", "nutrients"],
    },
  },
  {
    id: "low-abv-potential",
    when: (profile) => profile.estimatedAbv > 0 && profile.estimatedAbv < 5.5,
    insight: {
      id: "low-abv-potential",
      severity: "info",
      title: "Lower ABV Direction",
      message:
        "The potential alcohol estimate is modest, which can fit an easy-drinking cider but may feel lighter in body.",
      tags: ["abv", "body"],
    },
  },
  {
    id: "high-abv-potential",
    when: (profile) => profile.estimatedAbv >= 8,
    insight: {
      id: "high-abv-potential",
      severity: "warning",
      title: "Strong Cider Direction",
      message:
        "The potential alcohol estimate is high for cider. Fermentation management and balance will matter more.",
      tags: ["abv", "fermentation", "balance"],
    },
  },
  {
    id: "very-low-ph-sharp",
    when: (profile) => profile.estimatedPh > 0 && profile.estimatedPh < 3.2,
    insight: {
      id: "very-low-ph-sharp",
      severity: "warning",
      title: "Very Sharp Acidity",
      message:
        "The estimated pH is very low, suggesting a bright but potentially aggressive acid profile.",
      tags: ["ph", "acid", "sharpness"],
    },
  },
  {
    id: "balanced-ph-range",
    when: (profile) => profile.estimatedPh >= 3.2 && profile.estimatedPh <= 3.6,
    insight: {
      id: "balanced-ph-range",
      severity: "info",
      title: "Balanced Acidity Range",
      message:
        "The estimated pH is in a balanced cider range, offering acidity without obvious instability from pH alone.",
      tags: ["ph", "acid", "balance"],
    },
  },
  {
    id: "soft-ph-range",
    when: (profile) => profile.estimatedPh > 3.6 && profile.estimatedPh <= 3.8,
    insight: {
      id: "soft-ph-range",
      severity: "warning",
      title: "Soft Acidity",
      message:
        "The estimated pH is on the softer side, which may create a rounder cider but can reduce perceived freshness.",
      tags: ["ph", "acid", "freshness"],
    },
  },
  {
    id: "high-ph-stability-risk",
    when: (profile) => profile.estimatedPh > 3.8,
    insight: {
      id: "high-ph-stability-risk",
      severity: "risk",
      title: "Spoilage Risk",
      message:
        "The estimated pH is high, so sanitation, fermentation control, and stabilization become more important.",
      tags: ["ph", "stability", "risk"],
    },
  },
  {
    id: "very-low-tannin-thin",
    when: (profile) =>
      profile.estimatedTannin >= 0 && profile.estimatedTannin < 0.05,
    insight: {
      id: "very-low-tannin-thin",
      severity: "warning",
      title: "Low Structure",
      message:
        "This blend is very low in tannin and may produce a clean but thin cider unless supported by acid, oak, or tannic fruit.",
      tags: ["tannin", "structure", "body"],
    },
  },
  {
    id: "moderate-tannin",
    when: (profile) =>
      profile.estimatedTannin >= 0.05 && profile.estimatedTannin < 0.15,
    insight: {
      id: "moderate-tannin",
      severity: "info",
      title: "Moderate Tannin",
      message:
        "This blend has moderate tannin, which should add some structure without dominating the cider.",
      tags: ["tannin", "structure"],
    },
  },
  {
    id: "structured-tannin",
    when: (profile) =>
      profile.estimatedTannin >= 0.15 && profile.estimatedTannin <= 0.3,
    insight: {
      id: "structured-tannin",
      severity: "info",
      title: "Structured Tannin",
      message:
        "This blend has enough tannin to create grip, dryness, and a more traditional cider structure.",
      tags: ["tannin", "structure", "traditional"],
    },
  },
  {
    id: "very-high-tannin-astringency",
    when: (profile) => profile.estimatedTannin > 0.3,
    insight: {
      id: "very-high-tannin-astringency",
      severity: "warning",
      title: "Astringency Risk",
      message:
        "This blend is highly tannic and may become bitter or drying. Aging or blending down may be useful.",
      tags: ["tannin", "astringency", "aging"],
    },
  },
  {
    id: "sweet-heavy-soft-profile",
    when: (profile) => flavorShare(profile, "Sweet") >= 50,
    insight: {
      id: "sweet-heavy-soft-profile",
      severity: "info",
      title: "Sweet-Apple Dominant",
      message:
        "Sweet apples dominate this blend, pointing toward a round, approachable, apple-forward cider base.",
      tags: ["flavor", "sweet", "body"],
    },
  },
  {
    id: "sharp-heavy-acid-driven",
    when: (profile) => flavorShare(profile, "Sharp") >= 40,
    insight: {
      id: "sharp-heavy-acid-driven",
      severity: "info",
      title: "Acid-Driven Blend",
      message:
        "Sharp apples are a major share of the blend, suggesting a crisp, tart, bright cider direction.",
      tags: ["flavor", "sharp", "acid"],
    },
  },
  {
    id: "bittersweet-heavy-traditional",
    when: (profile) => flavorShare(profile, "Bittersweet") >= 40,
    insight: {
      id: "bittersweet-heavy-traditional",
      severity: "info",
      title: "Traditional Tannic Profile",
      message:
        "Bittersweet apples make up a large share of this blend, pointing toward a round, tannic, traditional cider character.",
      tags: ["flavor", "bittersweet", "traditional"],
    },
  },
  {
    id: "bittersharp-heavy-bold",
    when: (profile) => flavorShare(profile, "Bittersharp") >= 35,
    insight: {
      id: "bittersharp-heavy-bold",
      severity: "info",
      title: "Bold Bittersharp Profile",
      message:
        "Bittersharp apples are prominent, suggesting a cider with both acid intensity and tannic structure.",
      tags: ["flavor", "bittersharp", "acid", "tannin"],
    },
  },
  {
    id: "culinary-heavy-low-structure-risk",
    when: (profile) => categoryShare(profile, "CULINARY") >= 65,
    insight: {
      id: "culinary-heavy-low-structure-risk",
      severity: "warning",
      title: "Culinary-Apple Heavy",
      message:
        "This blend relies heavily on culinary apples. It may be aromatic and accessible, but could lack tannic structure.",
      tags: ["category", "culinary", "structure"],
    },
  },
  {
    id: "heritage-heavy-cider-character",
    when: (profile) => categoryShare(profile, "HERITAGE_CIDER") >= 50,
    insight: {
      id: "heritage-heavy-cider-character",
      severity: "info",
      title: "Heritage Cider Character",
      message:
        "Heritage cider apples are a major part of this blend, supporting stronger cider identity and structure.",
      tags: ["category", "heritage", "traditional"],
    },
  },
  {
    id: "crabapple-accent",
    when: (profile) =>
      categoryShare(profile, "CRABAPPLE") >= 5 &&
      categoryShare(profile, "CRABAPPLE") < 20,
    insight: {
      id: "crabapple-accent",
      severity: "info",
      title: "Crabapple Accent",
      message:
        "Crabapples appear as an accent, which can add brightness, tannin, and aromatic lift without overwhelming the blend.",
      tags: ["category", "crabapple", "acid", "tannin"],
    },
  },
  {
    id: "crabapple-dominant-intensity",
    when: (profile) => categoryShare(profile, "CRABAPPLE") >= 20,
    insight: {
      id: "crabapple-dominant-intensity",
      severity: "warning",
      title: "Intense Crabapple Share",
      message:
        "Crabapples are a large share of the batch and may create a very sharp, tannic, or intense cider.",
      tags: ["category", "crabapple", "intensity"],
    },
  },
  {
    id: "high-acid-high-tannin-aging",
    when: (profile) =>
      profile.estimatedPh > 0 &&
      profile.estimatedPh < 3.3 &&
      profile.estimatedTannin >= 0.2,
    insight: {
      id: "high-acid-high-tannin-aging",
      severity: "info",
      title: "Aging Recommended",
      message:
        "This blend is both sharp and tannic. Aging may help soften edges and integrate the structure.",
      tags: ["acid", "tannin", "aging"],
    },
  },
  {
    id: "low-acid-low-tannin-flabby",
    when: (profile) =>
      profile.estimatedPh > 3.6 && profile.estimatedTannin < 0.08,
    insight: {
      id: "low-acid-low-tannin-flabby",
      severity: "risk",
      title: "Flatness Risk",
      message:
        "Low acidity and low tannin can make cider taste soft, flat, or undefined. Consider sharper or more tannic apples.",
      tags: ["acid", "tannin", "balance", "risk"],
    },
  },
  {
    id: "balanced-all-purpose-profile",
    when: (profile) =>
      profile.estimatedBrix >= 11 &&
      profile.estimatedBrix <= 15 &&
      profile.estimatedPh >= 3.2 &&
      profile.estimatedPh <= 3.6 &&
      profile.estimatedTannin >= 0.05 &&
      profile.estimatedTannin <= 0.2,
    insight: {
      id: "balanced-all-purpose-profile",
      severity: "info",
      title: "Balanced Base",
      message:
        "Sugar, acidity, and tannin are all in moderate ranges, making this a flexible all-purpose cider base.",
      tags: ["balance", "brix", "ph", "tannin"],
    },
  },
  {
    id: "traditional-english-direction",
    when: (profile) =>
      flavorShare(profile, "Bittersweet") +
        flavorShare(profile, "Bittersharp") >=
        55 && profile.estimatedTannin >= 0.15,
    insight: {
      id: "traditional-english-direction",
      severity: "info",
      title: "Traditional English-Style Direction",
      message:
        "The blend leans toward tannic cider apples, suggesting a structured English-style cider direction.",
      tags: ["style", "english", "traditional", "tannin"],
    },
  },
  {
    id: "bright-new-world-direction",
    when: (profile) =>
      flavorShare(profile, "Sharp") + categoryShare(profile, "CULINARY") >=
        60 && profile.estimatedTannin < 0.15,
    insight: {
      id: "bright-new-world-direction",
      severity: "info",
      title: "Bright New-World Direction",
      message:
        "The blend leans toward bright acidity and accessible fruit, suggesting a crisp modern cider style.",
      tags: ["style", "new-world", "sharp", "culinary"],
    },
  },
  {
    id: "french-style-candidate",
    when: (profile) =>
      flavorShare(profile, "Bittersweet") >= 35 &&
      profile.estimatedPh >= 3.4 &&
      profile.estimatedTannin >= 0.12,
    insight: {
      id: "french-style-candidate",
      severity: "info",
      title: "French-Style Candidate",
      message:
        "Bittersweet weight with softer acidity and moderate tannin may support a rounder French-style cider direction.",
      tags: ["style", "french", "bittersweet"],
    },
  },
  {
    id: "cool-fermentation-suggested",
    when: (profile) =>
      categoryShare(profile, "CULINARY") >= 40 ||
      flavorShare(profile, "Sweet") >= 35,
    insight: {
      id: "cool-fermentation-suggested",
      severity: "info",
      title: "Cool Fermentation Suggested",
      message:
        "Aromatic or sweet-apple blends can benefit from cooler fermentation to preserve delicate apple character.",
      tags: ["technique", "fermentation", "cool"],
    },
  },
  {
    id: "mlf-softening-candidate",
    when: (profile) =>
      profile.estimatedPh > 0 &&
      profile.estimatedPh < 3.35 &&
      flavorShare(profile, "Sharp") >= 30,
    insight: {
      id: "mlf-softening-candidate",
      severity: "info",
      title: "MLF Could Soften Acidity",
      message:
        "This blend is acid-forward. Malolactic fermentation could soften sharpness if a rounder cider is desired.",
      tags: ["technique", "mlf", "acid"],
    },
  },
  {
    id: "avoid-mlf-low-acid",
    when: (profile) => profile.estimatedPh > 3.65,
    insight: {
      id: "avoid-mlf-low-acid",
      severity: "warning",
      title: "MLF May Reduce Freshness",
      message:
        "The acidity already appears soft. Malolactic fermentation may make the cider feel flatter unless that is intentional.",
      tags: ["technique", "mlf", "acid"],
    },
  },
  {
    id: "maceration-useful-low-tannin",
    when: (profile) =>
      profile.estimatedTannin < 0.1 &&
      (flavorShare(profile, "Bittersweet") > 0 ||
        flavorShare(profile, "Bittersharp") > 0),
    insight: {
      id: "maceration-useful-low-tannin",
      severity: "info",
      title: "Maceration Could Add Structure",
      message:
        "The blend is not very tannic, but tannic apples are present. Pomace maceration could increase extraction and structure.",
      tags: ["technique", "maceration", "tannin"],
    },
  },
  {
    id: "short-maceration-high-tannin",
    when: (profile) => profile.estimatedTannin > 0.25,
    insight: {
      id: "short-maceration-high-tannin",
      severity: "warning",
      title: "Limit Tannin Extraction",
      message:
        "This blend is already tannic. Long maceration may increase bitterness or astringency.",
      tags: ["technique", "maceration", "tannin"],
    },
  },
  {
    id: "nutrient-planning-high-brix",
    when: (profile) => profile.estimatedBrix >= 16,
    insight: {
      id: "nutrient-planning-high-brix",
      severity: "warning",
      title: "Nutrient Planning Recommended",
      message:
        "Higher sugar increases fermentation demand. Staggered nutrient addition may help prevent sluggish fermentation.",
      tags: ["technique", "nutrients", "fermentation"],
    },
  },
  {
    id: "wild-fermentation-caution-high-ph",
    when: (profile) => profile.estimatedPh > 3.6,
    insight: {
      id: "wild-fermentation-caution-high-ph",
      severity: "warning",
      title: "Wild Fermentation Caution",
      message:
        "Softer acidity can raise spoilage risk. Wild fermentation is possible, but sanitation and monitoring become more important.",
      tags: ["technique", "wild-fermentation", "ph", "risk"],
    },
  },
  {
    id: "keeving-candidate-bittersweet",
    when: (profile) =>
      flavorShare(profile, "Bittersweet") >= 35 &&
      profile.estimatedBrix >= 12 &&
      profile.estimatedPh >= 3.4,
    insight: {
      id: "keeving-candidate-bittersweet",
      severity: "info",
      title: "Keeving Candidate",
      message:
        "This blend has traits often associated with keeved cider potential: bittersweet character, moderate sugar, and softer acidity.",
      tags: ["technique", "keeving", "french"],
    },
  },
  {
    id: "backsweetening-structure-check",
    when: (profile) =>
      profile.estimatedTannin < 0.08 && profile.estimatedPh > 3.5,
    insight: {
      id: "backsweetening-structure-check",
      severity: "warning",
      title: "Backsweetening May Need Balance",
      message:
        "A soft, low-tannin cider can become cloying when backsweetened. Acid or tannin support may be needed.",
      tags: ["technique", "backsweetening", "balance"],
    },
  },
  {
    id: "bottle-conditioning-friendly",
    when: (profile) =>
      profile.estimatedPh <= 3.6 &&
      profile.estimatedBrix >= 11 &&
      profile.estimatedBrix <= 16,
    insight: {
      id: "bottle-conditioning-friendly",
      severity: "info",
      title: "Bottle Conditioning Friendly",
      message:
        "This blend appears suitable for a bottle-conditioned sparkling cider if fermentation and priming are controlled.",
      tags: ["technique", "carbonation", "bottle-conditioning"],
    },
  },
  {
    id: "pet-nat-risk-high-residual-sugar",
    when: (profile) => profile.estimatedBrix >= 15,
    insight: {
      id: "pet-nat-risk-high-residual-sugar",
      severity: "warning",
      title: "Pet Nat Requires Precision",
      message:
        "Higher sugar potential makes pet nat timing more sensitive. Bottling too early can create overpressure.",
      tags: ["technique", "carbonation", "pet-nat", "risk"],
    },
  },
  {
    id: "oak-or-tannin-addition-candidate",
    when: (profile) =>
      profile.estimatedTannin < 0.08 &&
      categoryShare(profile, "CULINARY") >= 50,
    insight: {
      id: "oak-or-tannin-addition-candidate",
      severity: "info",
      title: "Structure Addition Candidate",
      message:
        "A culinary-heavy, low-tannin blend may benefit from oak, tannic apple additions, or careful maceration.",
      tags: ["technique", "oak", "tannin", "structure"],
    },
  },
  {
    id: "thin-and-sharp-risk",
    when: (profile) =>
      profile.estimatedBrix < 11 &&
      profile.estimatedPh > 0 &&
      profile.estimatedPh < 3.25 &&
      profile.estimatedTannin < 0.08,
    insight: {
      id: "thin-and-sharp-risk",
      severity: "warning",
      title: "Thin and Sharp Risk",
      message:
        "Low sugar, high acidity, and low tannin may produce a cider that feels tart but thin.",
      tags: ["balance", "body", "acid", "risk"],
    },
  },
  {
    id: "big-structured-cider",
    when: (profile) =>
      profile.estimatedBrix >= 14 &&
      profile.estimatedTannin >= 0.18 &&
      profile.estimatedPh >= 3.2 &&
      profile.estimatedPh <= 3.6,
    insight: {
      id: "big-structured-cider",
      severity: "info",
      title: "Big Structured Cider",
      message:
        "This blend has sugar, acidity, and tannin in ranges that can support a bold, structured cider.",
      tags: ["style", "structure", "balance"],
    },
  },
  {
    id: "approachable-session-cider",
    when: (profile) =>
      profile.estimatedBrix >= 10 &&
      profile.estimatedBrix < 13 &&
      profile.estimatedTannin < 0.12 &&
      flavorShare(profile, "Sweet") + flavorShare(profile, "Sharp") >= 50,
    insight: {
      id: "approachable-session-cider",
      severity: "info",
      title: "Approachable Session Cider",
      message:
        "This blend points toward an approachable cider with fresh fruit character and moderate strength.",
      tags: ["style", "session", "culinary"],
    },
  },
  {
    id: "needs-more-data-empty-profile",
    when: (profile) => profile.totalWeight <= 0,
    insight: {
      id: "needs-more-data-empty-profile",
      severity: "warning",
      title: "No Batch Weight",
      message:
        "Add apple weights before interpreting the blend. Most cider direction rules depend on weighted composition.",
      tags: ["data", "weight"],
    },
  },
];

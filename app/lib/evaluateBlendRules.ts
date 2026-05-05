import { blendRules } from "./rules";
import type { BlendProfile } from "./types";

export const evaluateBlendRules = (profile: BlendProfile) =>
  blendRules
    .filter((rule) => rule.when(profile))
    .map((rule) => rule.insight);

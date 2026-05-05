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

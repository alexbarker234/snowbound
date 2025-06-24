export interface ClickerDetails {
  name: string;
  description: string;
  basePerSecond: number;
  baseCost: number;
}

export interface ResearchDetails {
  name: string;
  description: string;
  max: number;
  // will lerp between
  firstCost: number;
  lastCost: number;

  percentPerLevel: number; // visual only

  // what the effect does
  autoClickerBonus?: {
    index: number;
    percent: number;
  };
  clickBonusPercent?: number;

  spinPerClick?: number;
  spinBonusMaxIncrease?: number;
  spinBonusSlowdownDecrease?: number;
}

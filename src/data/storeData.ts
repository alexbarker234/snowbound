import type { ClickerDetails, ResearchDetails } from "@/types/storeTypes";

export const clickers: ClickerDetails[] = [
  {
    name: "Cloud",
    description: "",
    basePerSecond: 0.2,
    baseCost: 50
  },
  {
    name: "Snow Machine",
    description: "",
    basePerSecond: 1,
    baseCost: 300
  },
  {
    name: "Ice Sprite",
    description: "",
    basePerSecond: 10,
    baseCost: 2500
  },
  {
    name: "Yeti",
    description: "",
    basePerSecond: 50,
    baseCost: 15000
  }
];

export const research: ResearchDetails[] = [
  {
    name: "Stormfront",
    description: `Increase production of <span class="highlight">Cloud</span>s by 1%`,
    firstCost: 100,
    lastCost: 200,
    max: 20,
    autoClickerBonus: {
      index: 0,
      percent: 0.01
    },
    percentPerLevel: 0.01
  },
  {
    name: "Cold Hands",
    description: `Increase frost per click by 50%`,
    firstCost: 100,
    lastCost: 300,
    max: 10,
    clickBonusPercent: 0.5,
    percentPerLevel: 0.5
  },
  {
    name: "Superlubricity",
    description: `Decrease spin slowdown by 1%`,
    firstCost: 1000,
    lastCost: 3000,
    max: 10,
    spinBonusSlowdownDecrease: 0.01,
    percentPerLevel: 0.01
  }
];

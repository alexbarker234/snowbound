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
]

export const research: ResearchDetails[] =[
    {
        name: "Stormfront",
        description: `Increase <span class="highlight">Cloud</span>'s production by 1%`,
        firstCost: 100,
        lastCost: 200,
        max: 20,
        autoClickerBonus: {
            index: 0,
            percent: 0.01
        }
    },
    {
        name: "Cold Hands",
        description: `Increase frost per click by 50%`,
        firstCost: 100,
        lastCost: 200,
        max: 10,
        clickBonusPercent: 0.5
    }
]

export interface ClickerDetails {
    name: string,
    description: string,
    basePerSecond: number,
    baseCost: number,
}

export interface ResearchDetails {
    name: string;
    description: string;
    max: number;
    // will lerp between
    firstCost: number;
    lastCost: number;

    // what the effect does
    autoClickerBonus?: {
        index: number;
        percent: number;
    };
    clickBonusPercent?: number;
}
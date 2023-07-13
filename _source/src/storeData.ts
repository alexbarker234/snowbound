const clickers: ClickerDetails[] = [
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

const research: ResearchDetails[] =[
    {
        name: "Stormfront",
        description: `Increase <span class="highlight">Cloud</span>'s production by 1%`,
        firstCost: 100,
        lastCost: 200,
        max: 20
    }
]

export default clickers

interface ClickerDetails {
    name: string,
    description: string,
    basePerSecond: number,
    baseCost: number,
}

interface ResearchDetails {
    name: string,
    description: string,
    max: number,
    // will lerp between
    firstCost: number,
    lastCost: number,
}
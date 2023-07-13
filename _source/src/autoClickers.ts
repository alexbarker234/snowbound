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
export default clickers

interface ClickerDetails {
    name: string,
    description: string,
    basePerSecond: number,
    baseCost: number,
}
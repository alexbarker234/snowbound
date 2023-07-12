const clickers: ClickerDetails[] = [
    {
        name: "Snow Cloud",
        description: "",
        basePerSecond: 0.5,
        baseCost: 15
    },
    {
        name: "Snow Machine",
        description: "",
        basePerSecond: 3,
        baseCost: 50
    }
]
export default clickers

interface ClickerDetails {
    name: string,
    description: string,
    basePerSecond: number,
    baseCost: number,
}
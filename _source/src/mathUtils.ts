export function lerp (start: number, end: number, amt: number) {
    return (1-amt)*start+amt*end
}
export function randBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function round(number: number, decimalPlaces: number) {
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
}
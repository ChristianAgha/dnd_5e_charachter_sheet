export const dice = (sides) => Math.floor(Math.random() * sides) + 1;

export const roll4DropLowest = () => {
    const rolls = [dice(6), dice(6), dice(6), dice(6)];
    const lowestRoll = Math.min(...rolls);
    const result = (rolls.reduce((acc, i) => acc + i)) - lowestRoll;
    return result;
}
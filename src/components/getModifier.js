export const getModifier = (ability) => {
    const modifier = Math.floor((ability - 10) / 2);
    return modifier > 0 ? String('+' + modifier) : String(modifier);
}
export const daysdifference = (firstDate: any, secondDate: any) => {
    var millisBetween = firstDate - secondDate;
    var days = millisBetween / (1000 * 3600 * 24);
    return Math.round(days);
}
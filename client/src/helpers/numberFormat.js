/*
    Use "." as separator for a number's parts
    @param number - the number to be formatted
    @return the formatted number
*/
export const formatNumber = number => {

    // Get the number of digits in the number
    const no_digits = number.toString().length;

    // Calculate how many separators are needed for the number
    const no_separators = Math.ceil(no_digits / 3 - 1);

    // Construct a new string representing the formatted number
    let result = '';
    if (no_separators === 0) {
        result = number;
    }

    for (let i = 0; i < no_separators; i++) {
        result = result + '.' + (number / Math.pow(1000, i+1) % 1000);
    }

    // Remove first character (it would be ".")
    if (no_separators > 0) result = result.substring(1);

    return result;

}
/**
 *
 * @param {*} number
 * @param {*} radix
 * @return {string} the result
 */

function convertNumberToString(number, radix) {
    let integer = Math.floor(number);
    let fraction = number - integer;
    let string = !integer ? '0' : ''; // handle the 0 case

    while (integer > 0) {
        string = `${integer % radix}${string}`;
        integer = Math.floor(integer / radix);
    }
    if (fraction) {
        string += '.';
        while (fraction && !/\.\d{20}$/.test(string)) {
            fraction *= radix;
            string += `${Math.floor(fraction)}`;
            fraction -= Math.floor(fraction);
        }
    }
    return string;
}

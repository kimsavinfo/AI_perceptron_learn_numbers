/**
 * Always return a positive modulo
 * @param n
 * @returns {number}
 */
Number.prototype.mod = function(n)
{
    return ((this%n)+n)%n;
};

/**
 * Modulo with the greatest quotient and a positive remainder
 * @param numberDivided
 * @param numberDivisor
 * @returns {{quotient: number, remainder: number}}
 * @constructor
 */
function Maths_moduloGetQuotientAndRemainder(numberDivided, numberDivisor)
{
    var result = {
        quotient : 0,
        remainder : 0
    };

    if(numberDivisor != 0)
    {
        result.quotient = (numberDivided / numberDivisor >> 0);
        result.remainder = numberDivided.mod(numberDivisor);
    }

    return result;
}

/**
 * Return a int in the interval [min ; max[
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}
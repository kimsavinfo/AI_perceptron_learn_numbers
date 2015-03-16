/**
 * Object : Neuron
 * N inputs
 * N weights
 * 1 output
 * biais = threshold
 *
 * Use a sigmoïde to calculate output value
 *
 * keyword : Evaluate which calculate the output value
 *
 * @param nbInputs
 * @constructor
 */
function Neuron(nbInputs)
{
    this.weights = []; // Float values
    this.nbInputs = nbInputs;
    this.output = NaN;

    // nbIputs + 1 for the biais/threshold
    // 2.0 = [ 1.0 - (-1.0) ]
    // Math.random returns float in the interval [0;1[
    for(var iInput = 0; iInput < (this.nbInputs + 1); iInput++)
    {
        this.weights[iInput] = Math.random() * 2.0 - 1.0;
    }

    /**
     * Calculate the output value from the Data Point's inputs
     * @param dataPoint
     * @returns {*}
     */
    this.evaluatePoint = function(dataPoint)
    {
        var inputsArray = dataPoint.inputs;
        return this.evaluateInputsArray(inputsArray);
    };

    /**
     * Calculate the output value from the inputs Array
     * @param inputsArray
     * @returns {Number|*}
     */
    this.evaluateInputsArray = function(inputsArray)
    {
        if(isNaN(this.output))
        {
            var xValue = 0.0;

            for(var iInput = 0; iInput < this.nbInputs; iInput++)
            {
                xValue += inputsArray[iInput] * this.weights[iInput];
            }
            // Add the biais
            xValue += this.weights[this.nbInputs];

            // Sigmoïde function
            this.output =  1.0 / (1.0 + Math.exp(-1.0 * xValue));
        }

        return this.output;
    };

    this.clearOutput = function()
    {
        this.output = NaN;
    };

    this.adjustWeight = function(index, value)
    {
        this.weights[index] = value;
    };
}
/**
 * Object : DataPoint
 * Combination the user can set : input wanted and output expected
 * Used for supervised learning
 * @param inputArray
 * @param outputArray
 * @constructor
 */
function DataPoint(inputArray, outputArray)
{
    this.inputs = []; // float values
    this.outputs = []; // float values

    // Init()
    for(var iInput = 0; iInput < inputArray.length; iInput++)
    {
        this.inputs[iInput] = inputArray[iInput];
    }

    for(var iOutput = 0; iOutput < outputArray.length; iOutput++)
    {
        this.outputs[iOutput] = outputArray[iOutput];
    }
}
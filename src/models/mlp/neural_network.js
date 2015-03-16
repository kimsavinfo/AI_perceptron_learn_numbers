/**
 * Object : NeuralNetwork
 *
 * Groups hidden and output Neurons
 * Adjust weight thanks to backward propagation
 *
 * @param nbInputs
 * @param nbHidden
 * @param nbOutputs
 * @constructor
 */
function NeuralNetwork(nbInputs, nbHidden, nbOutputs)
{
    this.hiddenNeurons = []; // Neurons array
    this.outputNeurons = []; // Neurons array
    this.nbInputs = nbInputs;
    this.nbHidden = nbHidden;
    this.nbOutputs = nbOutputs;

    // Init()
    var neuron;
    for(var iHidden = 0; iHidden < this.nbHidden; iHidden++)
    {
        neuron = new Neuron(this.nbInputs);
        this.hiddenNeurons[iHidden] = neuron;
    }
    for(var iOutput = 0; iOutput < this.nbOutputs; iOutput++)
    {
        neuron = new Neuron(this.nbHidden);
        this.outputNeurons[iOutput] = neuron;
    }

    /**
     * Clear all neurons' output
     */
    this.clearOutputs = function()
    {
        for(var iHidden = 0; iHidden < this.nbHidden; iHidden++)
        {
            this.hiddenNeurons[iHidden].clearOutput();
        }
        for(var iOutput = 0; iOutput < this.nbOutputs; iOutput++)
        {
            this.outputNeurons[iOutput].clearOutput();
        }
    };

    /**
     * Return all the outputs for the Data Point's inputs
     * @param dataPoint
     * @returns {Array}
     */
    this.evaluatePoint = function(dataPoint)
    {
        this.clearOutputs();

        var hiddenOutputs = []; // float array
        for(var iHidden = 0; iHidden < this.nbHidden; iHidden++)
        {
            hiddenOutputs[iHidden] = this.hiddenNeurons[iHidden].evaluatePoint(dataPoint);
        }

        var outputs = []; // float array
        for(var iOutput = 0; iOutput < this.nbOutputs; iOutput++)
        {
            outputs[iOutput] = this.outputNeurons[iOutput].evaluateInputsArray(hiddenOutputs);
        }

        return outputs;
    };

    /**
     * Return all the outputs for an inputs array
     * @param inputsArray
     * @returns {Array}
     */
    this.evaluateInputsArray = function(inputsArray)
    {
        this.clearOutputs();

        var hiddenOutputs = []; // float array
        for(var iHidden = 0; iHidden < this.nbHidden; iHidden++)
        {
            hiddenOutputs[iHidden] = this.hiddenNeurons[iHidden].evaluateInputsArray(inputsArray);
        }

        var outputs = []; // float array
        for(var iOutput = 0; iOutput < this.nbOutputs; iOutput++)
        {
            outputs[iOutput] = this.outputNeurons[iOutput].evaluateInputsArray(hiddenOutputs);
        }

        return outputs;
    };

    /**
     * Calculate deltas then new weight
     * Set new weights for all neurons impacted by the Data Point
     * Using a Backward propagation to set outputs neurons then hidden one
     * @param dataPoint
     * @param learningRate
     */
    this.adjustWeight = function(dataPoint, learningRate)
    {
        var iHidden;
        var iOutput;

        // Deltas for outputs neurons
        var outputDeltas = []; // float array
        for(iOutput = 0; iOutput < this.nbOutputs; iOutput++)
        {
            var output = this.outputNeurons[iOutput].output;

            var expectedOutput = dataPoint.outputs[iOutput];
            outputDeltas[iOutput] = output * (1- output) * (expectedOutput - output);
        }

        // Deltas for hidden neurons
        var hiddenDeltas = [];
        for(iHidden = 0; iHidden < this.nbHidden; iHidden++)
        {
            var hiddenOutput = this.hiddenNeurons[iHidden].output;
            var sum = 0.0;
            for(iOutput = 0; iOutput < this.nbOutputs; iOutput++)
            {
                sum += outputDeltas[iOutput] * this.outputNeurons[iOutput].weights[iHidden];
            }
            hiddenDeltas[iHidden] = hiddenOutput * (1 - hiddenOutput) * sum;
        }

        // ================ Backward propagation ================

        var value = 0;
        // Adjust outputs neurons weighs
        for(iOutput = 0; iOutput < this.nbOutputs; iOutput++)
        {
            for(iHidden = 0; iHidden < this.nbHidden; iHidden++)
            {
                value = this.outputNeurons[iOutput].weights[iHidden]
                    + learningRate * outputDeltas[iOutput] * this.hiddenNeurons[iHidden].output;

                this.outputNeurons[iOutput].adjustWeight(iHidden, value);
            }
            // Adjust outputs neurons biais
            value = this.outputNeurons[iOutput].weights[this.nbHidden] + learningRate * outputDeltas[iOutput];
            this.outputNeurons[iOutput].adjustWeight(this.nbHidden, value);
        }

        // Adjust hidden neurons weighs
        for(iHidden = 0; iHidden < this.nbHidden; iHidden++)
        {
            for(var iInput = 0; iInput < this.nbInputs; iInput++)
            {
                value = this.hiddenNeurons[iHidden].weights[iInput]
                    + learningRate * hiddenDeltas[iHidden] * dataPoint.inputs[iInput];
                this.hiddenNeurons[iHidden].adjustWeight(iInput, value);
            }
            // Adjust hidden neurons biais
            value = this.hiddenNeurons[iHidden].weights[this.nbInputs] + learningRate * hiddenDeltas[iHidden];
            this.hiddenNeurons[iHidden].adjustWeight(this.nbInputs, value);
        }
    };
}

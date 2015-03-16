/**
 * Object : NeuralSystem
 *
 * Groups data and the neural network linked
 *
 * @param nbInputs
 * @param nbHidden
 * @param nbOutputs
 * @param listInputsArray
 * @param listOuputArray
 * @param trainingRatio
 * @constructor
 */
function NeuralSystem(nbInputs, nbHidden, nbOutputs, listInputsArray, listOuputArray, trainingRatio)
{
    this.data = new DataCollection(listInputsArray, listOuputArray, trainingRatio);
    this.network = new NeuralNetwork(nbInputs, nbHidden, nbOutputs);
    // Configuration
    this.learningRate = 0.3;
    this.maxError = 0.001;
    this.maxIterations = 10001;
    // Logs : give precious information
    this.Log_trainingRatio = trainingRatio;
    this.Log_iIteration = NaN;
    this.Log_totalError = NaN;
    this.Log_totalGeneralisationError = NaN;
    this.Log_mean = NaN;
    this.nbInputs = nbInputs;
    this.nbHidden = nbHidden;
    this.nbOutputs = nbOutputs;

    this.learnWithTrainingPoints = function()
    {
        var iIteration = 0;
        var totalError = Number.POSITIVE_INFINITY;
        var oldError = Number.POSITIVE_INFINITY;
        var totalGeneralisationError = Number.POSITIVE_INFINITY;
        var oldGeneralisationError = Number.POSITIVE_INFINITY;
        var betterGeneralisation = true;

        var iPoint;
        var outputs;
        var iOutput;
        var error;
        var nbPoints;

        while(iIteration < this.maxIterations && totalError > this.maxError && betterGeneralisation)
        {
            oldError = totalError;
            totalError = 0;
            oldGeneralisationError = totalGeneralisationError;
            totalGeneralisationError = 0;

            // Evaluation
            nbPoints = this.data.trainingPoints.length;
            for(iPoint = 0; iPoint < nbPoints; iPoint++)
            {
                outputs = this.network.evaluatePoint(this.data.trainingPoints[iPoint]);

                for(iOutput = 0; iOutput < outputs.length; iOutput++)
                {
                    error = this.data.trainingPoints[iPoint].outputs[iOutput] - outputs[iOutput];
                    totalError += (error * error);
                }

                // Calcul des nouveaux poids
                this.network.adjustWeight(this.data.trainingPoints[iPoint], this.learningRate);
            }

            // Generalisation
            nbPoints = this.data.generalisationPoints.length;
            for(iPoint = 0; iPoint < nbPoints; iPoint++)
            {
                outputs = this.network.evaluatePoint(this.data.generalisationPoints[iPoint]);

                for(iOutput = 0; iOutput < outputs.length; iOutput++)
                {
                    error = this.data.generalisationPoints[iPoint].outputs[iOutput] - outputs[iOutput];
                    totalGeneralisationError += (error * error);
                }
            }

            // Found the optimum so stop here
            if(totalGeneralisationError > oldGeneralisationError)
            {
                betterGeneralisation = false;
            }

            // Change learning rate if necessary
            if(totalError >= oldError)
            {
                this.learningRate = parseFloat( this.learningRate / 2.0);
            }

            iIteration++;
        }

        this.Log_iIteration = iIteration;
        this.Log_totalError = totalError;
        this.Log_totalGeneralisationError = totalGeneralisationError;
        this.Log_mean = (Math.sqrt(totalError / this.data.trainingPoints.length));
    };

    this.getRecognisedNumber = function(inputsArray)
    {
        var outputRate = this.getOutputRate(inputsArray);
        return Math.round(outputRate * 10);
    };

    this.getOutputRate = function(inputsArray)
    {
        var rate = 0;

        var outputs = this.network.evaluateInputsArray(inputsArray);
        for(var iOuput = 0; iOuput < outputs.length; iOuput++)
        {
            rate += outputs[iOuput];
        }

        return rate;
    };

    this.getLog = function()
    {
        var log = "Inputs - Hidden - Outputs : " +this.nbInputs+" - "+this.nbHidden+" - "+this.nbOutputs
            + " <br/> Learning rate : "+ this.learningRate
            + " <br/> Training Ratio : " + this.Log_trainingRatio
            + " <br/> Number of iteration needed to learn : " + this.Log_iIteration
            + " <br/> Total error : " + this.Log_totalError
            + " <br/> Generalisation error : " + this.Log_totalGeneralisationError
            + " <br/> Max error : " + this.maxError
            + " <br/> Max iterations : " + this.maxIterations
            + " <br/> Mean : "+ this.Log_mean ;

        log += "<br/> 0 : "+ this.getOutputRate([1,1,1,1,0,1,1,0,1,1,0,1,1,1,1]);
        log += "<br/> 1 : "+ this.getOutputRate([0,0,1,0,0,1,0,0,1,0,0,1,0,0,1]);
        log += "<br/> 2 : "+ this.getOutputRate([1,1,1,0,0,1,1,1,1,1,0,0,1,1,1]);
        log += "<br/> 3 : "+ this.getOutputRate([1,1,1,0,0,1,1,1,1,0,0,1,1,1,1]);
        log += "<br/> 4 : "+ this.getOutputRate([1,0,0,1,0,0,1,1,1,0,0,1,0,0,1]);
        log += "<br/> 5 : "+ this.getOutputRate([1,1,1,1,0,0,1,1,1,0,0,1,1,1,1]);
        log += "<br/> 6 : "+ this.getOutputRate([1,0,0,1,0,0,1,1,1,1,0,1,1,1,1]);
        log += "<br/> 7 : "+ this.getOutputRate([1,1,1,0,0,1,0,0,1,0,0,1,0,0,1]);
        log += "<br/> 8 : "+ this.getOutputRate([1,1,1,1,0,1,1,1,1,1,0,1,1,1,1]);
        log += "<br/> 9 : "+ this.getOutputRate([1,1,1,1,0,1,1,1,1,0,0,1,0,0,1]);

        return log;
    };
}
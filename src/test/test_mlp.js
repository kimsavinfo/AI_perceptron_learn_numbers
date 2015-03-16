QUnit.test( "NeuralSystem check numbers learned : ]0;9]", function( assert ) {
    var listInputsArray = [];
    listInputsArray.push(
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,0,1,1,1,1,0,0,0],
        [1,1,1,1,0,1,1,1,1,0,0,0,0,0,0],

        [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [0,0,1,0,0,1,0,0,1,0,0,1,0,0,0],
        [0,0,1,0,0,1,0,0,1,0,0,0,0,0,0],
        [0,0,1,0,0,1,0,0,0,0,0,0,0,0,0],

        [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],

        [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],

        [1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],
        [1,0,0,1,0,1,1,1,1,0,0,1,0,0,1],
        [1,0,1,1,0,1,1,1,1,0,0,1,0,0,1],

        [1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],

        [1,1,1,1,0,0,1,1,1,1,0,1,1,1,1],
        [1,1,0,1,0,0,1,1,1,1,0,1,1,1,1],
        [1,0,0,1,0,0,1,1,1,1,0,1,1,1,1],
        [0,0,0,1,0,0,1,1,1,1,0,1,1,1,1],

        [1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,1,1,0,0,1,0,1,1,0,0,1,0,0,1],

        [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],

        [1,1,1,1,0,1,1,1,1,0,0,1,0,0,1],
        [1,1,1,1,0,1,1,1,1,0,0,1,0,1,1],
        [1,1,1,1,0,1,1,1,1,0,0,1,1,1,1]
    );
    var listOutputArray = [];
    listOutputArray.push(
        [0.0],
        [0.0],
        [0.0],

        [0.1],
        [0.1],
        [0.1],
        [0.1],

        [0.2],

        [0.3],

        [0.4],
        [0.4],
        [0.4],

        [0.5],

        [0.6],
        [0.6],
        [0.6],
        [0.6],

        [0.7],
        [0.7],

        [0.8],

        [0.9],
        [0.9],
        [0.9]
    );
    var trainingRatio = 1.0;


    var neuralSystem  = new NeuralSystem(15, 10, 1, listInputsArray, listOutputArray, trainingRatio);
    neuralSystem.learnWithTrainingPoints();

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,1,1,0,1,1,0,1,1,1,1]), 0, "0 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([0,0,1,0,0,1,0,0,1,0,0,1,0,0,1]), 1, "1 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([0,0,1,0,0,1,0,0,1,0,0,1,0,0,0]), 1, "1 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([0,0,1,0,0,1,0,0,1,0,0,0,0,0,0]), 1, "1 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([0,0,1,0,0,1,0,0,0,0,0,0,0,0,0]), 1, "1 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,0,0,1,1,1,1,1,0,0,1,1,1]), 2, "2 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,0,0,1,1,1,1,0,0,1,1,1,1]), 3, "3 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,0,0,1,0,0,1,1,1,0,0,1,0,0,1]), 4, "4 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,0,0,1,0,1,1,1,1,0,0,1,0,0,1]), 4, "4 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,0,1,1,0,1,1,1,1,0,0,1,0,0,1]), 4, "4 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,0,1,1,1,0,0,1,1,1,1]), 5, "5 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,0,1,1,1,1,0,1,1,1,1]), 6, "6 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,1,0,1,0,0,1,1,1,1,0,1,1,1,1]), 6, "6 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,0,0,1,0,0,1,1,1,1,0,1,1,1,1]), 6, "6 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([0,0,0,1,0,0,1,1,1,1,0,1,1,1,1]), 6, "6 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,0,0,1,0,0,1,0,0,1,0,0,1]), 7, "7 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,0,0,1,0,1,1,0,0,1,0,0,1]), 7, "7 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,1,1,1,1,1,0,1,1,1,1]), 8, "8 recognised OK");

    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,1,1,1,1,0,0,1,0,0,1]), 9, "9 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,1,1,1,1,0,0,1,0,1,1]), 9, "9 recognised OK");
    assert.equal(neuralSystem.getRecognisedNumber([1,1,1,1,0,1,1,1,1,0,0,1,1,1,1]), 9, "9 recognised OK");


    var div = document.getElementById("logMessage");
    div.innerHTML = div.innerHTML + neuralSystem.getLog();
});


QUnit.test( "DataPoint", function( assert ) {
    var inputArray = [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1];
    var outputArray = [0.0];

    var dataPoint = new DataPoint(inputArray, outputArray);

    assert.equal(dataPoint.inputs[0], 1, "inputs OK");
    assert.equal(dataPoint.inputs[4], 0, "inputs OK");
    assert.equal(dataPoint.inputs[14], 1, "inputs OK");
    assert.equal(dataPoint.outputs[0], 0.0, "output OK");
});

QUnit.test( "DataCollection", function( assert ) {
    var listInputsArray = [];
    listInputsArray.push(
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
        [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
        [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
        [1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],
        [1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
        [1,0,0,1,0,0,1,1,1,1,0,1,1,1,1],
        [1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,0,0,1,0,0,1]
    );
    var listOutputArray = [];
    listOutputArray.push(
        [0.0],
        [0.1],
        [0.2],
        [0.3],
        [0.4],
        [0.5],
        [0.6],
        [0.7],
        [0.8],
        [0.9]
    );
    var trainingRatio = 0.8;

    var dataCollection = new DataCollection(listInputsArray, listOutputArray, trainingRatio);

    assert.equal(dataCollection.trainingPoints.length, 8, "trainingPoints length OK");
    assert.equal(dataCollection.generalisationPoints.length, 2, "generalisationPoints length OK");
});

QUnit.test( "Neuron init", function( assert ) {
    var nbInputs = 3;
    var neuron = new Neuron(nbInputs);

    // Check biais/threshold too
    for(var i = 0; i <= nbInputs; i ++)
    {
        assert.ok(neuron.weights[i] >= -1 ,  "neuron weight min OK");
        assert.ok(neuron.weights[i] <= 1 ,  "neuron weight max OK");
    }
});

QUnit.test( "Neuron adjustWeight", function( assert ) {
    var nbInputs = 3;
    var neuron = new Neuron(nbInputs);

    var newValue = 0.12432;
    neuron.adjustWeight(1, newValue);

    assert.equal(neuron.weights[1], newValue, "adjustWeight OK");
});


QUnit.test( "Neuron evaluateInputsArray", function( assert ) {
    var nbInputs = 3;
    var inputArray = [1,0,1];

    var neuron = new Neuron(nbInputs);
    var result = neuron.evaluateInputsArray(inputArray);

    assert.ok(!isNaN(result), "evaluateInputsArray OK");
});

QUnit.test( "Neuron evaluatePoint", function( assert ) {
    var inputArray = [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1];
    var outputArray = [0.3];
    var dataPoint = new DataPoint(inputArray, outputArray);

    var neuron = new Neuron(inputArray.length);
    var result = neuron.evaluatePoint(dataPoint);
    assert.ok(!isNaN(result), "evaluatePoint OK");

    neuron.clearOutput();
    assert.ok(isNaN(neuron.output), "clearOutput OK");

    result = neuron.evaluatePoint(dataPoint);
    assert.ok(!isNaN(result), "clearOutput + evaluatePoint OK");
});

QUnit.test( "NeuralNetwork init", function( assert ) {
    var nbInputs = 15;
    var nbHidden = 10;
    var nbOutputs = 1;

    var neuralNetwork = new NeuralNetwork(nbInputs, nbHidden, nbOutputs);

    assert.equal(neuralNetwork.hiddenNeurons.length, nbHidden, "nbHidden OK");
    assert.equal(neuralNetwork.outputNeurons.length, nbOutputs, "nbOuputs OK");
});

QUnit.test( "NeuralNetwork evaluatePoint + adjustWeight", function( assert ) {
    var nbInputs = 15;
    var nbHidden = 10;
    var nbOutputs = 1;
    var inputArray = [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1];
    var outputArray = [0.3];
    var dataPoint = new DataPoint(inputArray, outputArray);
    var learningRate = 0.5;

    var neuralNetwork = new NeuralNetwork(nbInputs, nbHidden, nbOutputs);
    neuralNetwork.evaluatePoint(dataPoint);

    neuralNetwork.adjustWeight(dataPoint, learningRate);
    for(var iHidden = 0; iHidden < neuralNetwork.hiddenNeurons.length ; iHidden++)
    {
        assert.ok(!isNaN(neuralNetwork.hiddenNeurons[iHidden].output), "hiddenNeurons adjustWeight "+iHidden+" OK");
    }
    for(var iOutput = 0; iOutput < neuralNetwork.outputNeurons.length ; iOutput++)
    {
        assert.ok(!isNaN(neuralNetwork.outputNeurons[iOutput].output), "outputNeurons adjustWeight "+iHidden+" OK");
    }

    assert.equal(neuralNetwork.hiddenNeurons.length, nbHidden, "hiddenNeurons length OK");
    assert.equal(neuralNetwork.outputNeurons.length, nbOutputs, "outputNeurons length OK");
});

QUnit.test( "NeuralSystem", function( assert ) {
    var listInputsArray = [];
    listInputsArray.push(
        [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1],
        [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1],
        [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1],
        [1,0,0,1,0,0,1,1,1,0,0,1,0,0,1],
        [1,1,1,1,0,0,1,1,1,0,0,1,1,1,1],
        [1,0,0,1,0,0,1,1,1,1,0,1,1,1,1],
        [1,1,1,0,0,1,0,0,1,0,0,1,0,0,1],
        [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
        [1,1,1,1,0,1,1,1,1,0,0,1,0,0,1]
    );
    var listOutputArray = [];
    listOutputArray.push(
        [0.0],
        [0.1],
        [0.2],
        [0.3],
        [0.4],
        [0.5],
        [0.6],
        [0.7],
        [0.8],
        [0.9]
    );
    var trainingRatio = 1.0;


    var neuralSystem  = new NeuralSystem(15, 10, 1, listInputsArray, listOutputArray, trainingRatio);
    neuralSystem.learnWithTrainingPoints();

    var neuralNetwork = neuralSystem.network;
    for(var iHidden = 0; iHidden < neuralNetwork.hiddenNeurons.length ; iHidden++)
    {
        assert.ok(!isNaN(neuralNetwork.hiddenNeurons[iHidden].output), "hiddenNeurons adjustWeight "+iHidden+" OK");
    }
    for(var iOutput = 0; iOutput < neuralNetwork.outputNeurons.length ; iOutput++)
    {
        assert.ok(!isNaN(neuralNetwork.outputNeurons[iOutput].output), "outputNeurons adjustWeight "+iHidden+" OK");
    }
    assert.equal(neuralNetwork.hiddenNeurons.length, 10, "hiddenNeurons length OK");
    assert.equal(neuralNetwork.outputNeurons.length, 1, "outputNeurons length OK");
});
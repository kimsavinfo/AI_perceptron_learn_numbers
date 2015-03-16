/**
 * Object : Collection of DataPoints
 * @param listInputsArray
 * @param listOuputArray
 * @param trainingRatio
 * @constructor
 */
function DataCollection(listInputsArray, listOuputArray, trainingRatio)
{
    this.trainingPoints = []; // DataPoint array
    this.generalisationPoints = []; // generalisation set

    // Init()
    var iPoint;
    var point;

    // Generalisation points : used for learning usual cases
    var nbDataPoints = listInputsArray.length;
    for(iPoint = 0; iPoint < nbDataPoints; iPoint++)
    {
        point = new DataPoint(listInputsArray[iPoint], listOuputArray[iPoint]);
        this.generalisationPoints[iPoint] = point;
    }

    // Training Set : used to check if the learning process is correct
    var index = 0;
    var nbTrainingPoints = parseInt(trainingRatio * nbDataPoints);
    for(iPoint = 0; iPoint < nbTrainingPoints; iPoint++)
    {
        index = getRandomInt(this.generalisationPoints.length, 0);
        this.trainingPoints[iPoint] = this.generalisationPoints[index];
        this.generalisationPoints.splice(index,1);
    }
}